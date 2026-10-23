from app.services.weather import weather_service
from fastapi import APIRouter, File, HTTPException, UploadFile
from app.services.market import market_service
from app.services.inference import predict_image

router = APIRouter()

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB

ALLOWED_CONTENT_TYPES = {
    "image/jpeg",
    "image/png",
    "image/webp",
}


@router.get("/health")
def health():
    return {
        "status": "ok",
        "service": "AgriGrade AI API",
    }


@router.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Validate the declared content type.
    if file.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(
            status_code=415,
            detail="Unsupported image format. Upload JPG, PNG, or WEBP.",
        )

    # Read at most 10 MB plus one byte to detect oversized uploads.
    image_bytes = await file.read(MAX_FILE_SIZE + 1)

    if not image_bytes:
        raise HTTPException(
            status_code=400,
            detail="Uploaded image is empty.",
        )

    if len(image_bytes) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail="Image is too large. Maximum allowed size is 10 MB.",
        )

    try:
        return predict_image(image_bytes)

    except ValueError as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc),
        ) from exc

    finally:
        await file.close()
@router.get("/weather")
async def get_weather(
    city: str = "New Delhi",
    country_code: str = "IN",
):
    try:
        return await weather_service.get_current_weather(
            city=city,
            country_code=country_code,
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc),
        ) from exc
        

@router.get("/market-prices")
async def get_market_prices(
    crop: str,
    state: str = "",
    limit: int = 20,
):
    try:
        return await market_service.get_market_prices(
            crop=crop,
            state=state,
            limit=limit,
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc),
        ) from exc
