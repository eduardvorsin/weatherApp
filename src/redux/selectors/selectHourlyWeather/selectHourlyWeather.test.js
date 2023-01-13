import fetchingStatuses from '../../fetchingStatuses';
import selectHourlyWeather from './selectHourlyWeather';

describe('selectHourlyWeather select tests', () => {
  it('returns hourly weather object from state', async () => {
    const expectedData = {
      data: {
        time: ['2022-12-26', '2022-12-27', '2022-12-28'],
        temperature_2m: [-14.2, -13.7, -11.5],
        weathercode: [3, 2, 71],
      },
      loadingStatus: fetchingStatuses.resolved,
      error: null,
    };

    const state = {
      weather: {
        hourlyWeather: expectedData,
      },
    };

    expect(selectHourlyWeather(state)).toEqual(expectedData);
  });

  it('returns empty object from state', async () => {
    const state = {};

    expect(selectHourlyWeather(selectHourlyWeather(state))).toBeUndefined();
  });
});
