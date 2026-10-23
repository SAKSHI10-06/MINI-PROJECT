from typing import Any


SEVERITY_LEVELS = {
    "low": {
        "label": "Mild",
        "description": (
            "The estimated affected leaf area is below 20%."
        ),
    },
    "moderate": {
        "label": "Moderate",
        "description": (
            "The estimated affected leaf area is at least 20% "
            "but below 50%."
        ),
    },
    "high": {
        "label": "Severe",
        "description": (
            "The estimated affected leaf area is 50% or higher."
        ),
    },
}


def assess_severity(
    class_name: str,
    confidence: float | None = None,
    affected_leaf_area_percent: float | None = None,
    measurement_method: str | None = None,
) -> dict[str, Any]:

    if not class_name or "___" not in class_name:
        raise ValueError("Invalid disease class name.")

    crop, disease = class_name.split("___", maxsplit=1)
    crop = crop.strip()
    disease = disease.strip()

    if not crop or not disease:
        raise ValueError("Invalid crop or disease name.")

    if confidence is not None and not 0 <= confidence <= 1:
        raise ValueError("Confidence must be between 0 and 1.")

    if affected_leaf_area_percent is not None:
        if not 0 <= affected_leaf_area_percent <= 100:
            raise ValueError(
                "Affected leaf area must be between 0 and 100."
            )

    is_healthy = "healthy" in disease.lower()

    if affected_leaf_area_percent is None:
        return {
            "crop": crop,
            "disease": disease,
            "severity_level": "Not assessed",
            "description": (
                "Affected leaf area has not been estimated."
            ),
            "assessment_type": "measurement_unavailable",
            "basis": (
                "Disease classification confidence does not measure "
                "affected leaf area."
            ),
            "confidence": confidence,
            "measured_affected_leaf_area_percent": None,
            "measurement_method": None,
        }

    # Healthy leaves are assigned zero affected area.
    if is_healthy:
        return {
            "crop": crop,
            "disease": disease,
            "severity_level": "Healthy",
            "description": "The classifier predicted a healthy leaf.",
            "assessment_type": "model_estimate",
            "basis": "Affected area set to 0% for the healthy class.",
            "confidence": confidence,
            "measured_affected_leaf_area_percent": 0.0,
            "measurement_method": measurement_method,
        }

    # Match the thresholds used in the Colab notebook.
    if affected_leaf_area_percent < 20:
        level = "low"
    elif affected_leaf_area_percent < 50:
        level = "moderate"
    else:
        level = "high"

    return {
        "crop": crop,
        "disease": disease,
        "severity_level": SEVERITY_LEVELS[level]["label"],
        "description": SEVERITY_LEVELS[level]["description"],
        "assessment_type": "model_estimate",
        "basis": (
            f"Estimated affected leaf area: "
            f"{affected_leaf_area_percent:.1f}%. "
            "This is a model estimate, not a validated field measurement."
        ),
        "confidence": confidence,
        "measured_affected_leaf_area_percent": round(
            affected_leaf_area_percent, 2
        ),
        "measurement_method": measurement_method or "unspecified",
    }
