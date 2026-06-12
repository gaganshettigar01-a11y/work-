const axios = require('axios');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 600 }); // 10 minutes cache

const BASE_URL = process.env.OPENWEATHER_BASE_URL || 'https://api.openweathermap.org';
const API_KEY = process.env.OPENWEATHER_API_KEY;

class WeatherService {
  /**
   * Get current weather data for a city
   */
  async getCurrentWeather(city, units = 'metric') {
    const cacheKey = `current_${city}_${units}`;
    
    // Check cache
    const cached = cache.get(cacheKey);
    if (cached) return cached;

    try {
      const response = await axios.get(`${BASE_URL}/data/2.5/weather`, {
        params: {
          q: city,
          units: units,
          appid: API_KEY
        }
      });

      const data = {
        city: response.data.name,
        country: response.data.sys.country,
        temperature: response.data.main.temp,
        feelsLike: response.data.main.feels_like,
        humidity: response.data.main.humidity,
        pressure: response.data.main.pressure,
        visibility: response.data.visibility,
        cloudiness: response.data.clouds.all,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
        main: response.data.weather[0].main,
        windSpeed: response.data.wind.speed,
        windDegree: response.data.wind.deg,
        sunrise: new Date(response.data.sys.sunrise * 1000),
        sunset: new Date(response.data.sys.sunset * 1000),
        timezone: response.data.timezone,
        coordinates: {
          lat: response.data.coord.lat,
          lon: response.data.coord.lon
        }
      };

      cache.set(cacheKey, data);
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch current weather: ${error.message}`);
    }
  }

  /**
   * Get 5-day forecast data
   */
  async getForecast(city, units = 'metric') {
    const cacheKey = `forecast_${city}_${units}`;
    
    const cached = cache.get(cacheKey);
    if (cached) return cached;

    try {
      const response = await axios.get(`${BASE_URL}/data/2.5/forecast`, {
        params: {
          q: city,
          units: units,
          appid: API_KEY
        }
      });

      const forecast = response.data.list.map(item => ({
        time: new Date(item.dt * 1000),
        temperature: item.main.temp,
        feelsLike: item.main.feels_like,
        humidity: item.main.humidity,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        windSpeed: item.wind.speed,
        pressure: item.main.pressure,
        cloudiness: item.clouds.all,
        rainChance: item.pop || 0
      }));

      const data = {
        city: response.data.city.name,
        country: response.data.city.country,
        coordinates: {
          lat: response.data.city.coord.lat,
          lon: response.data.city.coord.lon
        },
        forecast: forecast
      };

      cache.set(cacheKey, data);
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch forecast: ${error.message}`);
    }
  }

  /**
   * Get air quality data
   */
  async getAirQuality(lat, lon) {
    const cacheKey = `airquality_${lat}_${lon}`;
    
    const cached = cache.get(cacheKey);
    if (cached) return cached;

    try {
      const response = await axios.get(`${BASE_URL}/data/2.5/air_pollution`, {
        params: {
          lat: lat,
          lon: lon,
          appid: API_KEY
        }
      });

      const airData = response.data.list[0];
      const data = {
        aqi: airData.main.aqi,
        components: {
          CO: airData.components.co,
          NO2: airData.components.no2,
          O3: airData.components.o3,
          SO2: airData.components.so2,
          PM2_5: airData.components.pm2_5,
          PM10: airData.components.pm10
        },
        timestamp: new Date(airData.dt * 1000)
      };

      cache.set(cacheKey, data);
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch air quality: ${error.message}`);
    }
  }

  /**
   * Get weather by coordinates
   */
  async getWeatherByCoordinates(lat, lon, units = 'metric') {
    const cacheKey = `current_${lat}_${lon}_${units}`;
    
    const cached = cache.get(cacheKey);
    if (cached) return cached;

    try {
      const response = await axios.get(`${BASE_URL}/data/2.5/weather`, {
        params: {
          lat: lat,
          lon: lon,
          units: units,
          appid: API_KEY
        }
      });

      const data = {
        city: response.data.name,
        country: response.data.sys.country,
        temperature: response.data.main.temp,
        feelsLike: response.data.main.feels_like,
        humidity: response.data.main.humidity,
        pressure: response.data.main.pressure,
        visibility: response.data.visibility,
        cloudiness: response.data.clouds.all,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
        main: response.data.weather[0].main,
        windSpeed: response.data.wind.speed,
        windDegree: response.data.wind.deg,
        sunrise: new Date(response.data.sys.sunrise * 1000),
        sunset: new Date(response.data.sys.sunset * 1000),
        coordinates: {
          lat: response.data.coord.lat,
          lon: response.data.coord.lon
        }
      };

      cache.set(cacheKey, data);
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch weather by coordinates: ${error.message}`);
    }
  }

  /**
   * Clear cache
   */
  clearCache() {
    cache.flushAll();
  }
}

module.exports = new WeatherService();
