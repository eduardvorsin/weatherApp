import mockLocation from '../../../__mocks__/location';
import fetchHumidity from './fetchHumidity';

global.fetch = jest.fn();

describe('fetchHumidity tests', () => {
  it('should fetchHumidity with resolved response', async () => {
    const pendingType = fetchHumidity.pending.type;
    const fulfilledType = fetchHumidity.fulfilled.type;

    const mockData = {
      time: ['2022-12-26', '2022-12-27', '2022-12-28'],
      apparent_temperature: [-20.7, -21.5, -22.3],
      relativehumidity_2m: [80, 78, 89],
    };

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        hourly: mockData,
      }),
    });

    const dispatch = jest.fn();
    const thunk = fetchHumidity(mockLocation);

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    const [start, end] = calls;

    expect(start[0].type).toBe(pendingType);
    expect(end[0].type).toBe(fulfilledType);

    expect(end[0].payload).toEqual(mockData);
  });

  it('should fetchHumidity with rejected response', async () => {
    const pendingType = fetchHumidity.pending.type;
    const rejectedType = fetchHumidity.rejected.type;

    fetch.mockResolvedValue({
      ok: false,
      status: 404,
      json: () => Promise.resolve({
        reason: 'mock reason',
      }),
    });

    const dispatch = jest.fn();
    const thunk = fetchHumidity(mockLocation);

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    const [start, end] = calls;

    expect(start[0].type).toBe(pendingType);
    expect(end[0].type).toBe(rejectedType);
    expect(end[0].payload).toBe('HTTP 404 error: mock reason');
    expect(end[0].meta.rejectedWithValue).toBeTruthy();
  });
});
