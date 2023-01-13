import mockLocation from '../../../__mocks__/location';
import fetchWind from './fetchWind';

global.fetch = jest.fn();

describe('fetchWind tests', () => {
  it('should fetchWind with resolved response', async () => {
    const pendingType = fetchWind.pending.type;
    const fulfilledType = fetchWind.fulfilled.type;

    const mockData = {
      directionAngle: 128,
      speed: 1.64,
    };

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        current_weather: {
          winddirection: mockData.directionAngle,
          windspeed: mockData.speed,
        },
      }),
    });

    const dispatch = jest.fn();
    const thunk = fetchWind(mockLocation);

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    const [start, end] = calls;

    expect(start[0].type).toBe(pendingType);
    expect(end[0].type).toBe(fulfilledType);

    expect(end[0].payload).toEqual(mockData);
  });

  it('should fetchWind with rejected response', async () => {
    const pendingType = fetchWind.pending.type;
    const rejectedType = fetchWind.rejected.type;

    fetch.mockResolvedValue({
      ok: false,
      status: 404,
      json: () => Promise.resolve({
        reason: 'mock reason',
      }),
    });

    const dispatch = jest.fn();
    const thunk = fetchWind(mockLocation);

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    const [start, end] = calls;

    expect(start[0].type).toBe(pendingType);
    expect(end[0].type).toBe(rejectedType);
    expect(end[0].payload).toBe('HTTP 404 error: mock reason');
    expect(end[0].meta.rejectedWithValue).toBeTruthy();
  });
});
