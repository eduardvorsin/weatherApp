import mockLocation from '../../../__mocks__/location';
import fetchGeocoding from './fetchGeocoding';

global.fetch = jest.fn();

describe('fetchGeocoding tests', () => {
  it('should fetchGeocoding with resolved response', async () => {
    const pendingType = fetchGeocoding.pending.type;
    const fulfilledType = fetchGeocoding.fulfilled.type;

    const mockData = {
      city: 'Вестминстер',
      state_district: 'Большой Лондон',
      state: 'Англия',
      country: 'Великобритания',
      country_code: 'gb',
      'ISO3166-2-lvl4': 'GB-ENG',
      'ISO3166-2-lvl8': 'GB-WSM',
    };
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        address: mockData,
      }),
    });

    const dispatch = jest.fn();
    const thunk = fetchGeocoding(mockLocation);

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    const [start, end] = calls;

    expect(start[0].type).toBe(pendingType);
    expect(end[0].type).toBe(fulfilledType);

    expect(end[0].payload).toEqual(mockData);
  });

  it('should fetchGeocoding with rejected response', async () => {
    const pendingType = fetchGeocoding.pending.type;
    const rejectedType = fetchGeocoding.rejected.type;

    fetch.mockResolvedValue({
      ok: false,
      status: 404,
      json: () => Promise.resolve({
        error: {
          code: 400,
          message: 'mock error',
        },
      }),
    });

    const dispatch = jest.fn();
    const thunk = fetchGeocoding(mockLocation);

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    const [start, end] = calls;

    expect(start[0].type).toBe(pendingType);
    expect(end[0].type).toBe(rejectedType);
    expect(end[0].payload).toBe('HTTP 404 error: mock error');
    expect(end[0].meta.rejectedWithValue).toBeTruthy();
  });
});
