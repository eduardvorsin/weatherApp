import { createSlice } from '@reduxjs/toolkit';
import fetchingStatuses from '../fetchingStatuses';
import fetchGeocoding from '../thunks/fetchGeocoding/fetchGeocoding';

const initialState = {
  data: {},
  loadingStatus: null,
  error: null,
};

const geocodingSlice = createSlice({
  name: 'geocoding',
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    /* eslint no-param-reassign: ["error", { "props": false }] */
    builder
      .addCase(fetchGeocoding.pending, (state) => {
        state.loadingStatus = fetchingStatuses.loading;
        state.error = null;
      })
      .addCase(fetchGeocoding.fulfilled, (state, action) => {
        state.loadingStatus = fetchingStatuses.resolved;
        state.data = action.payload;
      })
      .addCase(fetchGeocoding.rejected, (state, action) => {
        state.loadingStatus = fetchingStatuses.error;
        state.error = action.payload;
      });
  },
});

export default geocodingSlice.reducer;
