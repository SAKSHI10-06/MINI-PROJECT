import json
from copy import deepcopy
from io import BytesIO

import torch
import torch.nn as nn
from PIL import Image, ImageOps, UnidentifiedImageError
from torchvision import transforms
from torch.nn import functional as F

from app.core.config import settings
from app.models.resnet import build_resnet18
from app.services.severity import assess_severity
from app.services.advisory import get_advisory


class InferenceService:
    def __init__(self):
        self.device = torch.device(
            "cuda" if torch.cuda.is_available() else "cpu"
        )

        model_path = settings.resolved_model_path
        mapping_path = settings.resolved_mapping_path
        severity_path = settings.resolved_severity_model_path

        # Verify that all required artifacts exist.
        for path in (model_path, mapping_path, severity_path):
            if not path.is_file():
                raise FileNotFoundError(
                    f"Required model file not found: {path}"
                )

        # Load the trained disease classification model.
        checkpoint = torch.load(
            model_path,
            map_location="cpu",
            weights_only=True,
        )

        if not isinstance(checkpoint, dict):
            raise ValueError("Unsupported disease checkpoint format.")

        if "model_state_dict" in checkpoint:
            state_dict = checkpoint["model_state_dict"]
        elif "state_dict" in checkpoint:
            state_dict = checkpoint["state_dict"]
        else:
            state_dict = checkpoint

        if state_dict and all(
            key.startswith("module.") for key in state_dict
        ):
            state_dict = {
                key.removeprefix("module."): value
                for key, value in state_dict.items()
            }

        self.model = build_resnet18(state_dict)
        self.model.to(self.device)
        self.model.eval()

        # Preserve the original classifier before extracting features.
        self.classifier = deepcopy(self.model.fc)
        self.classifier.to(self.device)
        self.classifier.eval()

        # ResNet18 now returns its 512 extracted features.
        self.feature_extractor = self.model
        self.feature_extractor.fc = nn.Identity()
        self.feature_extractor.eval()

        # Load the disease class mapping.
        with open(mapping_path, encoding="utf-8") as file:
            mapping = json.load(file)

        self.classes = {
            int(index): name
            for index, name in mapping.items()
        }

        if (
            len(self.classes) != 38
            or set(self.classes) != set(range(38))
        ):
            raise ValueError(
                "Class mapping must contain indices 0 through 37."
            )

        # Verify that the disease classifier has 38 outputs.
        classifier_layer = (
            self.classifier[-1]
            if isinstance(self.classifier, nn.Sequential)
            else self.classifier
        )

        if classifier_layer.out_features != len(self.classes):
            raise ValueError(
                "Disease model output count does not match class mapping."
            )

        # Recreate the exact severity head used during training.
        self.severity_head = nn.Sequential(
            nn.Linear(512, 128),
            nn.ReLU(),
            nn.Dropout(0.1),
            nn.Linear(128, 1),
            nn.Sigmoid(),
        )

        severity_state = torch.load(
            severity_path,
            map_location="cpu",
            weights_only=True,
        )

        if (
            isinstance(severity_state, dict)
            and "state_dict" in severity_state
        ):
            severity_state = severity_state["state_dict"]
        elif (
            isinstance(severity_state, dict)
            and "model_state_dict" in severity_state
        ):
            severity_state = severity_state["model_state_dict"]

        if severity_state and all(
            key.startswith("module.") for key in severity_state
        ):
            severity_state = {
                key.removeprefix("module."): value
                for key, value in severity_state.items()
            }

        self.severity_head.load_state_dict(severity_state)
        self.severity_head.to(self.device)
        self.severity_head.eval()

        # Image preprocessing.
        # This must match eval_tf from the training notebook.
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(
                mean=[0.485, 0.456, 0.406],
                std=[0.229, 0.224, 0.225],
            ),
        ])

        print("Disease classification model loaded.")
        print("Severity estimation model loaded.")
        print(f"Running on: {self.device}")

    @torch.inference_mode()
    def predict(self, image_bytes: bytes) -> dict:
        if not image_bytes:
            raise ValueError("Uploaded image is empty.")

        # Validate and decode the uploaded image.
        try:
            with Image.open(BytesIO(image_bytes)) as source:
                source.verify()

            with Image.open(BytesIO(image_bytes)) as source:
                image = ImageOps.exif_transpose(
                    source
                ).convert("RGB")

        except (
            UnidentifiedImageError,
            OSError,
            ValueError,
        ) as exc:
            raise ValueError(
                "Invalid or unreadable image. Upload a valid image."
            ) from exc

        # Convert the image into a model input tensor.
        tensor = (
            self.transform(image)
            .unsqueeze(0)
            .to(self.device)
        )

        # Extract the same 512 features used to train the severity head.
        features = self.feature_extractor(tensor)

        if features.shape != (1, 512):
            raise RuntimeError(
                f"Expected features of shape (1, 512), "
                f"received {tuple(features.shape)}."
            )

        # Predict the disease.
        logits = self.classifier(features)
        probabilities = F.softmax(logits, dim=1)[0]

        index = int(torch.argmax(probabilities).item())
        confidence = float(probabilities[index].item())
        class_name = self.classes[index]

        # Predict the affected area as a percentage.
        predicted_fraction = float(
            self.severity_head(features).item()
        )
        affected_area = predicted_fraction * 100.0

        # Match the notebook's healthy-leaf handling.
        is_healthy = "healthy" in class_name.lower()

        if is_healthy:
            affected_area = 0.0

        # Determine disease severity from the predicted percentage.
        severity = assess_severity(
            class_name=class_name,
            confidence=confidence,
            affected_leaf_area_percent=affected_area,
            measurement_method="trained_resnet18_severity_head",
        )

        advisory = get_advisory(class_name)

        return {
            "success": True,
            "class_index": index,
            "class_name": class_name,
            "confidence": round(confidence, 6),
            "severity": severity,
            "advisory": advisory,
            "device": str(self.device),
        }


# Load the models once when the backend starts.
inference_service = InferenceService()


def predict_image(image_bytes: bytes) -> dict:
    if not image_bytes:
        raise ValueError("Uploaded image is empty.")

    return inference_service.predict(image_bytes)
