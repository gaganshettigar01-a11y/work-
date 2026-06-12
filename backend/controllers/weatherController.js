const weatherService = require('../services/weatherService');

class WeatherController {
  /**
   * Get current weather for a city
   */
  async getCurrentWeather(req, res, next) {
    try {
      const { city, units = 'metric' } = req.query;

      if (!city) {
        return res.status(400).json({ error: 'City parameter is required' });
      }

      const weather = await weatherService.getCurrentWeather(city, units);
      res.json(weather);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get 7-day forecast
   */
  async getForecast(req, res, next) {
    try {
      const { city, units = 'metric' } = req.query;

      if (!city) {
        return res.status(400).json({ error: 'City parameter is required' });
      }

      const forecast = await weatherService.getForecast(city, units);
      res.json(forecast);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get air quality data
   */
  async getAirQuality(req, res, next) {
    try {
      const { lat, lon } = req.query;

      if (!lat || !lon) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
      }

      const airQuality = await weatherService.getAirQuality(lat, lon);
      res.json(airQuality);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get weather by coordinates
   */
  async getWeatherByCoordinates(req, res, next) {
    try {
      const { lat, lon, units = 'metric' } = req.query;

      if (!lat || !lon) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
      }

      const weather = await weatherService.getWeatherByCoordinates(lat, lon, units);
      res.json(weather);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get combined weather and air quality data
   */
  async getComprehensiveWeather(req, res, next) {
    try {
      const { city, units = 'metric' } = req.query;

      if (!city) {
        return res.status(400).json({ error: 'City parameter is required' });
      }

      const [currentWeather, forecast] = await Promise.all([
        weatherService.getCurrentWeather(city, units),
        weatherService.getForecast(city, units)
      ]);

      const airQuality = await weatherService.getAirQuality(
        currentWeather.coordinates.lat,
        currentWeather.coordinates.lon
      );

      res.json({
        current: currentWeather,
        forecast: forecast.forecast,
        airQuality: airQuality,
        retrievedAt: new Date().toISOString()
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new WeatherController();
