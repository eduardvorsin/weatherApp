import { createAsyncThunk } from '@reduxjs/toolkit';
import ReverseGeocodingAPI from '../../../API/ReverseGeocodingAPI/ReverseGeocodingAPI';

export default createAsyncThunk(
  'geocoding',
  async (location, { rejectWithValue }) => {
    try {
      const geocodingData = await ReverseGeocodingAPI.getGeocodingData(location);
      if (geocodingData instanceof Error) {
        throw new Error(geocodingData.message);
      }

      return geocodingData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
