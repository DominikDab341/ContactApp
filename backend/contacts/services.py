import requests
from django.core.cache import cache

class WeatherService:
    @staticmethod
    def get_weather(city):
        
        # cache_key = f"weather_{city.lower().strip().replace(' ', '_')}"
        cache_key = f"weather_{city}"
        cached_data = cache.get(cache_key)
        if cached_data: return cached_data

        try:
            geo_url = f"https://nominatim.openstreetmap.org/search?q={city}&format=json&limit=1"
            headers = {'User-Agent': 'ContactApp/1.0'}
            
            geo_res = requests.get(geo_url, headers=headers, timeout=5)
            geo_data = geo_res.json()
            if not geo_data: return None

            lat, lon = geo_data[0]['lat'], geo_data[0]['lon']

            weather_url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true"
            weather_res = requests.get(weather_url, timeout=5)
            w_data = weather_res.json()

            result = {
                "temp": w_data['current_weather']['temperature'],
                "wind": w_data['current_weather']['windspeed']
            }
            
            cache.set(cache_key, result, 900)
            return result
        except Exception as e:
            return None