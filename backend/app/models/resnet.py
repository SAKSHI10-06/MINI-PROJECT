
import torch
from torchvision import models
from torch import nn


def build_resnet18(state_dict, num_classes=None):
    """
    Build ResNet18 using the classifier structure in the checkpoint.
    """

    # Detect the output layer in the saved checkpoint.
    if num_classes is None:
        if "fc.1.weight" in state_dict:
            num_classes = state_dict["fc.1.weight"].shape[0]
        elif "fc.weight" in state_dict:
            num_classes = state_dict["fc.weight"].shape[0]
        else:
            raise ValueError(
                "Cannot determine class count. "
                "Classifier weights were not found."
            )

    model = models.resnet18(weights=None)

    # Match the checkpoint's classifier structure.
    if "fc.1.weight" in state_dict:
        model.fc = nn.Sequential(
            nn.Dropout(p=0.5),
            nn.Linear(model.fc.in_features, num_classes),
        )
    else:
        model.fc = nn.Linear(
            model.fc.in_features,
            num_classes,
        )

    model.load_state_dict(state_dict, strict=True)
    model.eval()

    return model
