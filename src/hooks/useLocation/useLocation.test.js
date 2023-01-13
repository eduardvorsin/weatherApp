import { renderHook } from '@testing-library/react';
import mockLocation from '../../__mocks__/location';
import useLocation from './useLocation';

global.navigator.geolocation = {
  getCurrentPosition: jest.fn(),
};

describe('useLocation hook tests', () => {
  it('returns location when permission access', async () => {
    const currentLocation = {
      coords: { ...mockLocation },
    };

    navigator.geolocation.getCurrentPosition.mockImplementation(
      (success) => success(currentLocation),
    );

    const { result } = renderHook(() => useLocation());

    expect(result.current[0]).toEqual(currentLocation.coords);
  });

  it('returns location object when permission not access', async () => {
    const mockError = {
      message: 'mock error text',
    };

    navigator.geolocation.getCurrentPosition.mockImplementation(
      (_, fail) => fail(mockError),
    );

    const { result } = renderHook(() => useLocation());

    expect(result.current[1]).toMatch(mockError.message);
  });
});
