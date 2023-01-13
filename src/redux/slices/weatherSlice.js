import { createSlice } from '@reduxjs/toolkit';
import fetchingStatuses from '../fetchingStatuses';
import fetchCurrentWeather from '../thunks/fetchCurrentWeather/fetchCurrentWeather';
import fetchDailyWeather from '../thunks/fetchDailyWeather/fetchDailyWeather';
import fetchHourlyWeather from '../thunks/fetchHourlyWeather/fetchHourlyWeather';
import fetchHumidity from '../thunks/fetchHumidity/fetchHumidity';
import fetchWind from '../thunks/fetchWind/fetchWind';

const initialState = {
  hourlyWeather: {
    data: {},
    loadingStatus: null,
    error: null,
  },
  currentWeather: {
    data: {},
    loadingStatus: null,
    error: null,
  },
  dailyWeather: {
    data: {},
    loadingStatus: null,
    error: null,
  },
  humidity: {
    data: {},
    loadingStatus: null,
    error: null,
  },
  wind: {
    data: {},
    loadingStatus: null,
    error: null,
  },
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* eslint no-param-reassign: ["error", { "props": false }] */
    builder
      .addCase(fetchHourlyWeather.pending, (state) => {
        state.hourlyWeather.loadingStatus = fetchingStatuses.loading;
        state.hourlyWeather.error = null;
      })
      .addCase(fetchHourlyWeather.fulfilled, (state, action) => {
        state.hourlyWeather.loadingStatus = fetchingStatuses.resolved;
        state.hourlyWeather.data = action.payload;
      })
      .addCase(fetchHourlyWeather.rejected, (state, action) => {
        state.hourlyWeather.loadingStatus = fetchingStatuses.error;
        state.hourlyWeather.error = action.payload;
      })
      .addCase(fetchCurrentWeather.pending, (state) => {
        state.currentWeather.loadingStatus = fetchingStatuses.loading;
        state.currentWeather.error = null;
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.currentWeather.loadingStatus = fetchingStatuses.resolved;
        state.currentWeather.data = action.payload;
      })
      .addCase(fetchCurrentWeather.rejected, (state, action) => {
        state.currentWeather.loadingStatus = fetchingStatuses.error;
        state.currentWeather.error = action.payload;
      })
      .addCase(fetchDailyWeather.pending, (state) => {
        state.dailyWeather.loadingStatus = fetchingStatuses.loading;
        state.dailyWeather.error = null;
      })
      .addCase(fetchDailyWeather.fulfilled, (state, action) => {
        state.dailyWeather.loadingStatus = fetchingStatuses.resolved;
        state.dailyWeather.data = action.payload;
      })
      .addCase(fetchDailyWeather.rejected, (state, action) => {
        state.dailyWeather.loadingStatus = fetchingStatuses.error;
        state.dailyWeather.error = action.payload;
      })
      .addCase(fetchHumidity.pending, (state) => {
        state.humidity.loadingStatus = fetchingStatuses.loading;
        state.humidity.error = null;
      })
      .addCase(fetchHumidity.fulfilled, (state, action) => {
        state.humidity.loadingStatus = fetchingStatuses.resolved;
        state.humidity.data = action.payload;
      })
      .addCase(fetchHumidity.rejected, (state, action) => {
        state.humidity.loadingStatus = fetchingStatuses.error;
        state.humidity.error = action.payload;
      })
      .addCase(fetchWind.pending, (state) => {
        state.wind.loadingStatus = fetchingStatuses.loading;
        state.wind.error = null;
      })
      .addCase(fetchWind.fulfilled, (state, action) => {
        state.wind.loadingStatus = fetchingStatuses.resolved;
        state.wind.data = action.payload;
      })
      .addCase(fetchWind.rejected, (state, action) => {
        state.wind.loadingStatus = fetchingStatuses.error;
        state.wind.error = action.payload;
      });
  },
});

export default weatherSlice.reducer;
