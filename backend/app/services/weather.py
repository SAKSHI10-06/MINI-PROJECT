
from typing import Any

import httpx

from app.core.config import settings


CURRENT_WEATHER_URL = (
    "https://api.openweathermap.org/data/2.5/weather"
)


class WeatherService:
    def __init__(self) -> None:
        self.api_key = settings.openweathermap_api_key

    async def get_current_weather(
        self,
        city: str,
        country_code: str = "IN",
    ) -> dict[str, Any]:
        """Fetch current weather for a city."""

        city = city.strip()
        country_code = country_code.strip().upper()

        if not city:
            raise ValueError("City name is required.")

        if not self.api_key:
            return {
                "success": False,
                "available": False,
                "message": "Weather API key is not configured.",
                "city": city,
            }

        params = {
            "q": f"{city},{country_code}",
            "appid": self.api_key,
            "units": "metric",
        }

        try:
            async with httpx.AsyncClient(
                timeout=10.0
            ) as client:
                response = await client.get(
                    CURRENT_WEATHER_URL,
                    params=params,
                )

            if response.status_code == 404:
                return {
                    "success": False,
                    "available": False,
                    "message": "City not found.",
                    "city": city,
                }

            if response.status_code in (401, 403):
                return {
                    "success": False,
                    "available": False,
                    "message": (
                        "Weather API key is invalid, inactive, "
                        "or not authorized."
                    ),
                    "city": city,
                }

            response.raise_for_status()
            data = response.json()

            weather_items = data.get("weather") or []
            main = data.get("main") or {}
            wind = data.get("wind") or {}

            if not main or not weather_items:
                return {
                    "success": False,
                    "available": False,
                    "message": (
                        "Weather provider returned incomplete data."
                    ),
                    "city": city,
                }

            weather = weather_items[0]

            return {
                "success": True,
                "available": True,
                "city": data.get("name", city),
                "country": data.get("sys", {}).get("country"),
                "temperature_c": main.get("temp"),
                "feels_like_c": main.get("feels_like"),
                "humidity_percent": main.get("humidity"),
                "pressure_hpa": main.get("pressure"),
                "wind_speed_mps": wind.get("speed"),
                "weather_condition": weather.get("main"),
                "weather_description": weather.get("description"),
                "source": "OpenWeather",
            }

        except httpx.TimeoutException:
            return {
                "success": False,
                "available": False,
                "message": "Weather request timed out.",
                "city": city,
            }

        except httpx.HTTPStatusError:
            return {
                "success": False,
                "available": False,
                "message": "Weather provider returned an error.",
                "city": city,
            }

        except httpx.RequestError:
            return {
                "success": False,
                "available": False,
                "message": (
                    "Unable to connect to the weather provider."
                ),
                "city": city,
            }


weather_service = WeatherService()
