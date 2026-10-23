
import os
import httpx
from dotenv import load_dotenv

load_dotenv()

key = os.getenv("MARKET_API_KEY")

if not key:
    print("MARKET_API_KEY is missing from .env")
else:
    url = (
        "https://api.data.gov.in/resource/"
        "9ef84268-d588-465a-a308-a864a43d0070"
    )

    try:
        response = httpx.get(
            url,
            params={
                "api-key": key,
                "format": "json",
                "limit": 1,
            },
            timeout=30,
        )

        print("Status:", response.status_code)
        print("Response:", response.text[:500])

    except httpx.RequestError as exc:
        print("Connection error:", type(exc).__name__)
