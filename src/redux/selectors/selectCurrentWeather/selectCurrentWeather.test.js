import fetchingStatuses from '../../fetchingStatuses';
import selectCurrentWeather from './selectCurrentWeather';

describe('selectCurrentWeather select tests', () => {
  it('returns current weather object from store', async () => {
    const expectedData = {
      data: {
        weatherCode: 1,
        temperature: 15,
      },
      loadingStatus: fetchingStatuses.resolved,
      error: null,
    };

    const store = {
      weather: {
        currentWeather: expectedData,
      },
    };

    expect(selectCurrentWeather(store)).toEqual(expectedData);
  });

  it('returns empty object from store', async () => {
    const store = {};

    expect(selectCurrentWeather(selectCurrentWeather(store))).toBeUndefined();
  });
});
