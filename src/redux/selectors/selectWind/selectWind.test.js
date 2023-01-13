import fetchingStatuses from '../../fetchingStatuses';
import selectWind from './selectWind';

describe('selectWind select tests', () => {
  it('returns wind object from store', async () => {
    const expectedData = {
      data: {
        directionAngle: 128,
        speed: 1.64,
      },
      loadingStatus: fetchingStatuses.resolved,
      error: null,
    };

    const store = {
      weather: {
        wind: expectedData,
      },
    };

    expect(selectWind(store)).toEqual(expectedData);
  });

  it('returns empty object from store', async () => {
    const store = {};

    expect(selectWind(selectWind(store))).toBeUndefined();
  });
});
