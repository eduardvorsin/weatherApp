import fetchingStatuses from '../redux/fetchingStatuses';

const loadingData = {
  data: {},
  loadingStatus: fetchingStatuses.loading,
  error: null,
};

const loadingState = {
  weather: {
    hourlyWeather: loadingData,
    currentWeather: loadingData,
    dailyWeather: loadingData,
    humidity: loadingData,
    wind: loadingData,
  },
  geocoding: loadingData,
};

export default loadingState;
