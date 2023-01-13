import mockLocation from '../../__mocks__/location';
import ReverseGeocodingAPI from './ReverseGeocodingAPI';

global.fetch = jest.fn();

const mockError = new Error('mock error');

describe('getGeocodingData tests', () => {
  it('the passed value is not an object', () => {
    expect(async () => {
      await ReverseGeocodingAPI.getGeocodingData([]);
    }).rejects.toThrow('the location parameter must be an object');
  });

  it('the passed object is empty', () => {
    expect(async () => {
      await ReverseGeocodingAPI.getGeocodingData({});
    }).rejects.toThrow('the passed object must have the longitude & latitude properties');
  });

  it('one of the properties is missing in the passed object', () => {
    expect(async () => {
      await ReverseGeocodingAPI.getGeocodingData({
        latitude: mockLocation.latitude,
      });
    }).rejects.toThrow('the passed object must have the longitude & latitude properties');
  });

  it('a mock fetch request returns the ok property equal to false and returns an error object', async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 404,
      json: () => Promise.resolve({
        error: {
          code: 400,
          message: mockError.message,
        },
      }),
    });

    const result = await ReverseGeocodingAPI.getGeocodingData(mockLocation);

    expect(result.message).toBe('HTTP 404 error: mock error');
  });

  it('a mock fetch request returns an address object', async () => {
    const expectedData = {
      address: {
        city: 'Вестминстер',
        state_district: 'Большой Лондон',
        state: 'Англия',
        country: 'Великобритания',
        country_code: 'gb',
        'ISO3166-2-lvl4': 'GB-ENG',
        'ISO3166-2-lvl8': 'GB-WSM',
      },
    };

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(expectedData),
    });

    const result = await ReverseGeocodingAPI.getGeocodingData(mockLocation);

    expect(result).toEqual(expectedData.address);
  });
});
