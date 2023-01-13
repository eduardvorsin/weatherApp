import { createWeatherURL, isObject } from '../../utils/utils';

export default class WeatherAPI {
  static async fetchWeather(url) {
    if (typeof url !== 'string' && !(url instanceof URL)) {
      throw new Error('the url parameter must be either a string or an instance of the class URL');
    }

    try {
      const response = await fetch(url);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`HTTP ${response.status} error: ${error.reason}`);
      }

      return await response.json();
    } catch (error) {
      return error;
    }
  }

  static async getCurrentWeather(location) {
    if (!isObject(location)) {
      throw new Error('the location parameter must be an object');
    }

    if (!location.latitude || !location.longitude) {
      throw new Error('the passed object must have the longitude & latitude properties');
    }

    const { latitude, longitude } = location;

    const currentURL = createWeatherURL({
      latitude,
      longitude,
      current_weather: true,
    });

    try {
      const weather = await WeatherAPI.fetchWeather(currentURL);

      if (weather instanceof Error) {
        throw new Error(weather.message);
      }

      return {
        weatherCode: weather.current_weather.weathercode,
        temperature: weather.current_weather.temperature,
      };
    }
    catch (error) {
      return error;
    }
  }

  static async getHourlyWeather(location) {
    if (!isObject(location)) {
      throw new Error('the location parameter must be an object');
    }

    if (!location.latitude || !location.longitude) {
      throw new Error('the passed object must have the longitude & latitude properties');
    }

    const { latitude, longitude } = location;

    const currentURL = createWeatherURL({
      latitude,
      longitude,
      current_weather: false,
      hourly: ['temperature_2m', 'weathercode'],
    });

    try {
      const weather = await WeatherAPI.fetchWeather(currentURL);
      if (weather instanceof Error) {
        throw new Error(weather.message);
      }

      return weather.hourly;
    } catch (error) {
      return error;
    }
  }

  static async getDailyWeather(location) {
    if (!isObject(location)) {
      throw new Error('the location parameter must be an object');
    }

    if (!location.latitude || !location.longitude) {
      throw new Error('the passed object must have the longitude & latitude properties');
    }

    const { latitude, longitude } = location;

    const currentURL = createWeatherURL({
      latitude,
      longitude,
      current_weather: false,
      daily: ['temperature_2m_max', 'temperature_2m_min', 'weathercode'],
    });

    try {
      const weather = await WeatherAPI.fetchWeather(currentURL);
      if (weather instanceof Error) {
        throw new Error(weather.message);
      }

      return weather.daily;
    } catch (error) {
      return error;
    }
  }

  static async getWindData(location) {
    if (!isObject(location)) {
      throw new Error('the location parameter must be an object');
    }

    if (!location.latitude || !location.longitude) {
      throw new Error('the passed object must have the longitude & latitude properties');
    }

    const { latitude, longitude } = location;
    const currentURL = createWeatherURL({
      latitude,
      longitude,
      current_weather: true,
    });

    try {
      const weather = await WeatherAPI.fetchWeather(currentURL);
      if (weather instanceof Error) {
        throw new Error(weather.message);
      }

      return {
        speed: weather.current_weather.windspeed,
        directionAngle: weather.current_weather.winddirection,
      };
    } catch (error) {
      return error;
    }
  }

  static async getHumidityData(location) {
    if (!isObject(location)) {
      throw new Error('the location parameter must be an object');
    }

    if (!location.latitude || !location.longitude) {
      throw new Error('the passed object must have the longitude & latitude properties');
    }

    const { latitude, longitude } = location;

    const currentURL = createWeatherURL({
      latitude,
      longitude,
      current_weather: false,
      hourly: ['apparent_temperature', 'relativehumidity_2m'],
    });

    try {
      const weather = await WeatherAPI.fetchWeather(currentURL);
      if (weather instanceof Error) {
        throw new Error(weather.message);
      }

      return weather.hourly;
    } catch (error) {
      return error;
    }
  }
}
