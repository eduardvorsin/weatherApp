import fetchingStatuses from '../redux/fetchingStatuses';

const errorData = {
  data: {},
  loadingStatus: fetchingStatuses.error,
  error: 'mock error',
};

const errorState = {
  weather: {
    hourlyWeather: errorData,
    currentWeather: errorData,
    dailyWeather: errorData,
    humidity: errorData,
    wind: errorData,
  },
  geocoding: errorData,
};

export default errorState;
