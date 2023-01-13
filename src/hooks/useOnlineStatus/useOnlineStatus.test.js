import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import useOnlineStatus from './useOnlineStatus';

const onLineSpy = jest.spyOn(global.navigator, 'onLine', 'get');
onLineSpy.mockReturnValue(true);

describe('useOnlineStatus hook tests', () => {
  it('returns online when the corresponding event is simulated', async () => {
    const { result } = renderHook(() => useOnlineStatus());

    await act(() => {
      const onlineEvent = new Event('online');

      onLineSpy.mockReturnValue(false);
      window.dispatchEvent(onlineEvent);
    });

    expect(result.current).toBe('online');
  });

  it('returns offline when the corresponding event is simulated', async () => {
    const { result } = renderHook(() => useOnlineStatus());

    await act(() => {
      const offlineEvent = new Event('offline');

      onLineSpy.mockReturnValue(false);
      window.dispatchEvent(offlineEvent);
    });

    expect(result.current).toBe('offline');
  });
});
