import mockLocation from '../../../__mocks__/location';
import fetchCurrentWeather from './fetchCurrentWeather';

global.fetch = jest.fn();

describe('fetchCurrentWeather tests', () => {
  it('should fetchCurrentWeather with resolved response', async () => {
    const pendingType = fetchCurrentWeather.pending.type;
    const fulfilledType = fetchCurrentWeather.fulfilled.type;

    const mockData = {
      weatherCode: 1,
      temperature: -6.7,
    };
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        current_weather: {
          weathercode: mockData.weatherCode,
          temperature: mockData.temperature,
        },
      }),
    });

    const dispatch = jest.fn();
    const thunk = fetchCurrentWeather(mockLocation);

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    const [start, end] = calls;

    expect(start[0].type).toBe(pendingType);
    expect(end[0].type).toBe(fulfilledType);

    expect(end[0].payload).toEqual(mockData);
  });

  it('should fetchCurrentWeather with rejected response', async () => {
    const pendingType = fetchCurrentWeather.pending.type;
    const rejectedType = fetchCurrentWeather.rejected.type;

    fetch.mockResolvedValue({
      ok: false,
      status: 404,
      json: () => Promise.resolve({
        reason: 'mock reason',
      }),
    });

    const dispatch = jest.fn();
    const thunk = fetchCurrentWeather(mockLocation);

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    const [start, end] = calls;

    expect(start[0].type).toBe(pendingType);
    expect(end[0].type).toBe(rejectedType);
    expect(end[0].payload).toBe('HTTP 404 error: mock reason');
    expect(end[0].meta.rejectedWithValue).toBeTruthy();
  });
});
