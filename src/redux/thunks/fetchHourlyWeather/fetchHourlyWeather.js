import { createAsyncThunk } from '@reduxjs/toolkit';
import WeatherAPI from '../../../API/WeatherAPI/WeatherAPI';

export default createAsyncThunk(
  'weather/fetchHourlyWeather',
  async (location, { rejectWithValue }) => {
    try {
      const weather = await WeatherAPI.getHourlyWeather(location);
      if (weather instanceof Error) {
        throw new Error(weather.message);
      }

      return weather;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
