import mockLocation from '../../../__mocks__/location';
import fetchHourlyWeather from './fetchHourlyWeather';

global.fetch = jest.fn();

describe('fetchHourlyWeather tests', () => {
  it('should fetchHourlyWeather with resolved response', async () => {
    const pendingType = fetchHourlyWeather.pending.type;
    const fulfilledType = fetchHourlyWeather.fulfilled.type;

    const mockData = {
      temperature_2m: [-5.7, -5.5, -5.6],
      time: ['2022-12-31T00:00', '2022-12-31T01:00', '2022-12-31T02:00'],
      weathercode: [3, 3, 71],
    };

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        hourly: mockData,
      }),
    });

    const dispatch = jest.fn();
    const thunk = fetchHourlyWeather(mockLocation);

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    const [start, end] = calls;

    expect(start[0].type).toBe(pendingType);
    expect(end[0].type).toBe(fulfilledType);

    expect(end[0].payload).toEqual(mockData);
  });

  it('should fetchHourlyWeather with rejected response', async () => {
    const pendingType = fetchHourlyWeather.pending.type;
    const rejectedType = fetchHourlyWeather.rejected.type;

    fetch.mockResolvedValue({
      ok: false,
      status: 404,
      json: () => Promise.resolve({
        reason: 'mock reason',
      }),
    });

    const dispatch = jest.fn();
    const thunk = fetchHourlyWeather(mockLocation);

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    const [start, end] = calls;

    expect(start[0].type).toBe(pendingType);
    expect(end[0].type).toBe(rejectedType);
    expect(end[0].payload).toBe('HTTP 404 error: mock reason');
    expect(end[0].meta.rejectedWithValue).toBeTruthy();
  });
});
