import { combineReducers, configureStore } from '@reduxjs/toolkit';
import weatherReducer from './slices/weatherSlice';
import geocodingReducer from './slices/geocodingSlice';

const rootReducer = combineReducers({
  weather: weatherReducer,
  geocoding: geocodingReducer,
});

export const createReduxStore = (initialState = {}) => configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});

export default createReduxStore();
