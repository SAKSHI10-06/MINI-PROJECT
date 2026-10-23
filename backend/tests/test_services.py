
from app.services.severity import assess_severity
from app.services.advisory import get_advisory


def test_healthy_prediction_has_low_preliminary_concern():
    result = assess_severity("Tomato___healthy", 0.99)

    assert result["severity_level"] == "Low"
    assert result["measured_affected_leaf_area_percent"] is None


def test_disease_prediction_is_not_claimed_as_measured_severity():
    result = assess_severity(
        "Corn_(maize)___Northern_Leaf_Blight",
        0.95,
    )

    assert result["severity_level"] == "Moderate"
    assert result["assessment_type"] == "preliminary_rule_based_estimate"
    assert result["measured_affected_leaf_area_percent"] is None

def test_healthy_class_returns_monitoring_advice():
    result = get_advisory("Tomato___healthy")

    assert result["status"] == "healthy_class_predicted"
    assert len(result["recommendations"]) > 0


def test_unknown_disease_returns_general_advice():
    result = get_advisory("Corn_(maize)___Unknown_Disease")

    assert result["status"] == "disease_class_predicted"
    assert len(result["recommendations"]) > 0
