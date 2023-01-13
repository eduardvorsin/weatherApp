import fetchingStatuses from '../../fetchingStatuses';
import selectDailyWeather from './selectDailyWeather';

describe('selectDailyWeather select tests', () => {
  it('returns daily weather object from state', async () => {
    const expectedData = {
      data: {
        time: ['2022-12-26', '2022-12-27', '2022-12-28'],
        temperature_2m_max: [-9.4, -8, -7.3],
        temperature_2m_min: [-17.1, -15.5, -16.4],
        weathercode: [3, 2, 71],
      },
      loadingStatus: fetchingStatuses.resolved,
      error: null,
    };

    const state = {
      weather: {
        dailyWeather: expectedData,
      },
    };

    expect(selectDailyWeather(state)).toEqual(expectedData);
  });

  it('returns empty object from state', async () => {
    const state = {};

    expect(selectDailyWeather(selectDailyWeather(state))).toBeUndefined();
  });
});
