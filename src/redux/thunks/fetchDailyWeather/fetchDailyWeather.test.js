import mockLocation from '../../../__mocks__/location';
import fetchDailyWeather from './fetchDailyWeather';

global.fetch = jest.fn();


describe('fetchDailyWeather tests', () => {
  it('should fetchDailyWeather with resolved response', async () => {
    const pendingType = fetchDailyWeather.pending.type;
    const fulfilledType = fetchDailyWeather.fulfilled.type;

    const mockData = {
      time: ['2022-12-26', '2022-12-27', '2022-12-28'],
      temperature_2m_max: [-9.4, -8, -7.3],
      temperature_2m_min: [-17.1, -15.5, -16.4],
      weathercode: [3, 2, 71],
    };

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        daily: mockData,
      }),
    });

    const dispatch = jest.fn();
    const thunk = fetchDailyWeather(mockLocation);

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    const [start, end] = calls;

    expect(start[0].type).toBe(pendingType);
    expect(end[0].type).toBe(fulfilledType);

    expect(end[0].payload).toEqual(mockData);
  });

  it('should fetchDailyWeather with rejected response', async () => {
    const pendingType = fetchDailyWeather.pending.type;
    const rejectedType = fetchDailyWeather.rejected.type;

    fetch.mockResolvedValue({
      ok: false,
      status: 404,
      json: () => Promise.resolve({
        reason: 'mock reason',
      }),
    });

    const dispatch = jest.fn();
    const thunk = fetchDailyWeather(mockLocation);

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    const [start, end] = calls;

    expect(start[0].type).toBe(pendingType);
    expect(end[0].type).toBe(rejectedType);
    expect(end[0].payload).toBe('HTTP 404 error: mock reason');
    expect(end[0].meta.rejectedWithValue).toBeTruthy();
  });
});
