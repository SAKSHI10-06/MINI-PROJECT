
from pydantic import BaseModel, Field


class PredictionResponse(BaseModel):
    class_index: int = Field(ge=0, le=37)
    class_name: str
    confidence: float = Field(ge=0.0, le=1.0)
