import fetchingStatuses from '../redux/fetchingStatuses';

const resolvedState = {
  weather: {
    hourlyWeather: {
      data: {
        time: [
          '2022-12-27T03:00',
          '2022-12-27T04:00',
          '2022-12-27T05:00',
          '2022-12-27T06:00',
          '2022-12-27T07:00',
          '2022-12-27T08:00',
          '2022-12-27T09:00',
          '2022-12-27T10:00',
          '2022-12-27T11:00',
          '2022-12-27T12:00',
          '2022-12-27T13:00',
          '2022-12-27T14:00',
          '2022-12-27T15:00',
          '2022-12-27T16:00',
          '2022-12-27T17:00',
          '2022-12-27T18:00',
          '2022-12-27T19:00',
          '2022-12-27T20:00',
          '2022-12-27T21:00',
          '2022-12-27T22:00',
          '2022-12-27T23:00',
          '2022-12-28T00:00',
          '2022-12-28T01:00',
          '2022-12-28T02:00',
          '2022-12-28T03:00',
          '2022-12-28T04:00',
          '2022-12-28T05:00',
          '2022-12-28T06:00',
          '2022-12-28T07:00',
          '2022-12-28T08:00',
        ],
        temperature_2m: [
          -4.5, -4.4, -4.3, -4.5, -5.1, -5.6, -5.8, -6, -6.5, -6.8, -7, -6.4,
          -5.3, -4.3, -3.6, -3.4, -3.7, -4.4, -4.9, -5.3, -5.6, -5.8, -5.7, -5.5,
          -5.0, -4.5, -3.9, -3.1, -3.4, -4.9,
        ],
        weathercode: [1, 2, 3, 71, 71, 3, 3, 2, 2, 2, 1, 3, 71, 86, 1, 1, 3, 2, 2,
          71, 71, 3, 2, 1, 71, 2, 3, 1, 2, 71],
      },
      loadingStatus: fetchingStatuses.resolved,
      error: null,
    },
    currentWeather: {
      data: {
        weatherCode: 1,
        temperature: -6.7,
      },
      loadingStatus: fetchingStatuses.resolved,
      error: null,
    },
    dailyWeather: {
      data: {
        time: ['2022-12-26', '2022-12-27', '2022-12-29', '2022-12-30', '2022-12-31', '2023-01-01', '2023-01-02'],
        temperature_2m_max: [-9.4, -8, -7.3, -5, -6.7, -7.6, -9.8],
        temperature_2m_min: [-17.1, -15.5, -16.4, -17.5, -15.7, -16.3, -13.6],
        weathercode: [3, 2, 71, 2, 2, 3, 71],
      },
      loadingStatus: fetchingStatuses.resolved,
      error: null,
    },
    humidity: {
      data: {
        time: [
          '2022-12-27T00:00',
          '2022-12-27T01:00',
          '2022-12-27T02:00',
          '2022-12-27T03:00',
          '2022-12-27T04:00',
          '2022-12-27T05:00',
          '2022-12-27T06:00',
          '2022-12-27T07:00',
          '2022-12-27T08:00',
          '2022-12-27T09:00',
        ],
        apparent_temperature: [-17.4, -18, -18.6, -19.1, -19.5, -19, -17, -16, -15, 14],
        relativehumidity_2m: [81, 82, 83, 84, 85, 86, 71, 72, 73, 74],
      },
      loadingStatus: fetchingStatuses.resolved,
      error: null,
    },
    wind: {
      data: {
        directionAngle: 128,
        speed: 1.64,
      },
      loadingStatus: fetchingStatuses.resolved,
      error: null,
    },
  },
  geocoding: {
    data: {
      city: '??????????????????????',
      state_district: '?????????????? ????????????',
      state: '????????????',
      country: '????????????????????????????',
      country_code: 'gb',
      'ISO3166-2-lvl4': 'GB-ENG',
      'ISO3166-2-lvl8': 'GB-WSM',
    },
    loadingStatus: fetchingStatuses.resolved,
    error: null,
  },
};

export default resolvedState;
