import { createAsyncThunk } from '@reduxjs/toolkit';
import WeatherAPI from '../../../API/WeatherAPI/WeatherAPI';

export default createAsyncThunk(
  'weather/fetchHumidity',
  async (location, { rejectWithValue }) => {
    try {
      const weather = await WeatherAPI.getHumidityData(location);
      if (weather instanceof Error) {
        throw new Error(weather.message);
      }

      return weather;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
