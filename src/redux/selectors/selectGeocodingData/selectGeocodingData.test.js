import fetchingStatuses from '../../fetchingStatuses';
import selectGeocodingData from './selectGeocodingData';

describe('selectGeocodingData select tests', () => {
  it('returns geocoding object from state', async () => {
    const expectedData = {
      data: {
        city: 'Вестминстер',
        state_district: 'Большой Лондон',
        state: 'Англия',
        country: 'Великобритания',
        country_code: 'gb',
        'ISO3166-2-lvl4': 'GB-ENG',
        'ISO3166-2-lvl8': 'GB-WSM',
      },
      loadingStatus: fetchingStatuses.resolved,
      error: null,
    };

    const state = {
      geocoding: expectedData,
    };

    expect(selectGeocodingData(state)).toEqual(expectedData);
  });

  it('returns empty object from state', async () => {
    const state = {};

    expect(selectGeocodingData(selectGeocodingData(state))).toBeUndefined();
  });
});
