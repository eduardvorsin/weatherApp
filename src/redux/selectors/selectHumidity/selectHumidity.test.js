import fetchingStatuses from '../../fetchingStatuses';
import selectHumidity from './selectHumidity';

describe('selectHumidity select tests', () => {
  it('returns humidity object from store', async () => {
    const expectedData = {
      data: {
        time: ['2022-12-27T00:00', '2022-12-27T01:00', '2022-12-27T02:00'],
        apparent_temperature: [-20.7, -21.5, -22.3],
        relativehumidity_2m: [80, 78, 89],
      },
      loadingStatus: fetchingStatuses.resolved,
      error: null,
    };

    const store = {
      weather: {
        humidity: expectedData,
      },
    };

    expect(selectHumidity(store)).toEqual(expectedData);
  });

  it('returns empty object from store', async () => {
    const store = {};

    expect(selectHumidity(selectHumidity(store))).toBeUndefined();
  });
});
