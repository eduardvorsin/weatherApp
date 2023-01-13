import weatherReducer from '../slices/weatherSlice';
import fetchDailyWeather from '../thunks/fetchDailyWeather/fetchDailyWeather';
import fetchHourlyWeather from '../thunks/fetchHourlyWeather/fetchHourlyWeather';
import fetchCurrentWeather from '../thunks/fetchCurrentWeather/fetchCurrentWeather';
import fetchHumidity from '../thunks/fetchHumidity/fetchHumidity';
import fetchWind from '../thunks/fetchWind/fetchWind';
import fetchingStatuses from '../fetchingStatuses';

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

describe('weatherReducer tests', () => {
  it('passing an unknow action should return initial state', () => {
    const action = { type: undefined };
    const expectedState = initialState;
    const result = weatherReducer(undefined, action);

    expect(result).toEqual(expectedState);
  });
});

describe('fetchHourlyWeather action tests', () => {
  it('passing an action with the pending status', () => {
    const pendingType = fetchHourlyWeather.pending.type;
    const action = { type: pendingType };

    const result = weatherReducer(initialState, action);
    const { error, loadingStatus } = result.hourlyWeather;

    expect(loadingStatus).toBe(fetchingStatuses.loading);
    expect(error).toBeNull();
  });

  it('passing an action with the fulfilled status', () => {
    const expectedData = {
      temperature_2m: [-5.7, -5.5, -5.6],
      time: ['2022-12-31T00:00', '2022-12-31T01:00', '2022-12-31T02:00'],
      weathercode: [3, 3, 71],
    };
    const action = {
      type: fetchHourlyWeather.fulfilled.type,
      payload: expectedData,
    };
    const expectedState = {
      ...initialState,
      hourlyWeather: {
        data: expectedData,
        loadingStatus: fetchingStatuses.resolved,
        error: null,
      },
    };

    const result = weatherReducer(initialState, action);

    expect(result).toEqual(expectedState);
  });

  it('passing an action with the rejected status', () => {
    const rejectedType = fetchHourlyWeather.rejected.type;
    const expectedError = 'mock error text';
    const action = {
      type: rejectedType,
      payload: expectedError,
    };

    const result = weatherReducer(initialState, action);
    const { error, loadingStatus } = result.hourlyWeather;

    expect(loadingStatus).toBe(fetchingStatuses.error);
    expect(error).toBe(expectedError);
  });
});

describe('fetchCurrentWeather action tests', () => {
  it('passing an action with the pending status', () => {
    const pendingType = fetchCurrentWeather.pending.type;
    const action = { type: pendingType };

    const result = weatherReducer(initialState, action);
    const { error, loadingStatus } = result.currentWeather;

    expect(loadingStatus).toBe(fetchingStatuses.loading);
    expect(error).toBeNull();
  });

  it('passing an action with the fulfilled status', () => {
    const expectedData = {
      weatherCode: 1,
      temperature: -13,
    };
    const action = {
      type: fetchCurrentWeather.fulfilled.type,
      payload: expectedData,
    };
    const expectedState = {
      ...initialState,
      currentWeather: {
        data: expectedData,
        loadingStatus: fetchingStatuses.resolved,
        error: null,
      },
    };

    const result = weatherReducer(initialState, action);

    expect(result).toEqual(expectedState);
  });

  it('passing an action with the rejected status', () => {
    const rejectedType = fetchCurrentWeather.rejected.type;
    const expectedError = 'mock error text';
    const action = {
      type: rejectedType,
      payload: expectedError,
    };

    const result = weatherReducer(initialState, action);
    const { error, loadingStatus } = result.currentWeather;

    expect(loadingStatus).toBe(fetchingStatuses.error);
    expect(error).toBe(expectedError);
  });
});

describe('fetchDailyWeather action tests', () => {
  it('passing an action with the pending status', () => {
    const pendingType = fetchDailyWeather.pending.type;
    const action = { type: pendingType };

    const result = weatherReducer(initialState, action);
    const { error, loadingStatus } = result.dailyWeather;

    expect(loadingStatus).toBe(fetchingStatuses.loading);
    expect(error).toBeNull();
  });

  it('passing an action with the fulfilled status', () => {
    const expectedData = {
      time: ['2022-12-26', '2022-12-27', '2022-12-28'],
      temperature_2m_max: [-9.4, -8, -7.3],
      temperature_2m_min: [-17.1, -15.5, -16.4],
      weathercode: [3, 2, 71],
    };
    const action = {
      type: fetchDailyWeather.fulfilled.type,
      payload: expectedData,
    };
    const expectedState = {
      ...initialState,
      dailyWeather: {
        data: expectedData,
        loadingStatus: fetchingStatuses.resolved,
        error: null,
      },
    };

    const result = weatherReducer(initialState, action);

    expect(result).toEqual(expectedState);
  });

  it('passing an action with the rejected status', () => {
    const rejectedType = fetchDailyWeather.rejected.type;
    const expectedError = 'mock error text';
    const action = {
      type: rejectedType,
      payload: expectedError,
    };

    const result = weatherReducer(initialState, action);
    const { error, loadingStatus } = result.dailyWeather;

    expect(loadingStatus).toBe(fetchingStatuses.error);
    expect(error).toBe(expectedError);
  });
});

describe('fetchHumidity action tests', () => {
  it('passing an action with the pending status', () => {
    const pendingType = fetchHumidity.pending.type;
    const action = { type: pendingType };

    const result = weatherReducer(initialState, action);
    const { error, loadingStatus } = result.humidity;

    expect(loadingStatus).toBe(fetchingStatuses.loading);
    expect(error).toBeNull();
  });

  it('passing an action with the fulfilled status', () => {
    const expectedData = {
      time: ['2022-12-26', '2022-12-27', '2022-12-28'],
      apparent_temperature: [-20.7, -21.5, -22.3],
      relativehumidity_2m: [80, 78, 89],
    };
    const action = {
      type: fetchHumidity.fulfilled.type,
      payload: expectedData,
    };
    const expectedState = {
      ...initialState,
      humidity: {
        data: expectedData,
        loadingStatus: fetchingStatuses.resolved,
        error: null,
      },
    };

    const result = weatherReducer(initialState, action);

    expect(result).toEqual(expectedState);
  });

  it('passing an action with the rejected status', () => {
    const rejectedType = fetchHumidity.rejected.type;
    const expectedError = 'mock error text';
    const action = {
      type: rejectedType,
      payload: expectedError,
    };

    const result = weatherReducer(initialState, action);
    const { error, loadingStatus } = result.humidity;

    expect(loadingStatus).toBe(fetchingStatuses.error);
    expect(error).toBe(expectedError);
  });
});

describe('fetchWind action tests', () => {
  it('passing an action with the pending status', () => {
    const pendingType = fetchWind.pending.type;
    const action = { type: pendingType };

    const result = weatherReducer(initialState, action);
    const { error, loadingStatus } = result.wind;

    expect(loadingStatus).toBe(fetchingStatuses.loading);
    expect(error).toBeNull();
  });

  it('passing an action with the fulfilled status', () => {
    const expectedData = {
      directionAngle: 128,
      speed: 1.64,
    };
    const action = {
      type: fetchWind.fulfilled.type,
      payload: expectedData,
    };
    const expectedState = {
      ...initialState,
      wind: {
        data: expectedData,
        loadingStatus: fetchingStatuses.resolved,
        error: null,
      },
    };

    const result = weatherReducer(initialState, action);

    expect(result).toEqual(expectedState);
  });

  it('passing an action with the rejected status', () => {
    const rejectedType = fetchWind.rejected.type;
    const expectedError = 'mock error text';
    const action = {
      type: rejectedType,
      payload: expectedError,
    };

    const result = weatherReducer(initialState, action);
    const { error, loadingStatus } = result.wind;

    expect(loadingStatus).toBe(fetchingStatuses.error);
    expect(error).toBe(expectedError);
  });
});
