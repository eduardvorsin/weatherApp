import { screen } from '@testing-library/react';
import renderWithRedux from '../test-utils/renderWithRedux';
import mockLocation from '../__mocks__/location';
import resolvedState from '../__mocks__/resolvedState';
import App from './App';

global.navigator.geolocation = {
  getCurrentPosition: jest.fn(),
};

describe('App Component tests', () => {
  beforeAll(() => {
    jest.useFakeTimers({
      doNotFake: [
        'hrtime',
        'nextTick',
        'performance',
        'queueMicrotask',
        'requestAnimationFrame',
        'cancelAnimationFrame',
        'requestIdleCallback',
        'cancelIdleCallback',
        'setImmediate',
        'clearImmediate',
        'setInterval',
        'clearInterval',
        'setTimeout',
        'clearTimeout',
      ],
    });
    jest.setSystemTime(new Date('2022-12-27T09:00:00'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('renders correctly', async () => {
    const currentLocation = { coords: mockLocation };

    navigator.geolocation.getCurrentPosition.mockImplementation(
      (success) => success(currentLocation),
    );

    renderWithRedux(
      <App />,
      resolvedState,
    );

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders an error when access to the location is denied', async () => {
    const mockError = {
      message: 'mock error text',
    };
    navigator.geolocation.getCurrentPosition.mockImplementation(
      (_, fail) => fail(mockError),
    );

    renderWithRedux(
      <App />,
      resolvedState,
    );

    expect(screen.getByText(/нет доступа к вашему местоположению/i)).toBeInTheDocument();
  });

  it('default snapshot of component', () => {
    renderWithRedux(
      <App
        testId="app"
      />,
      resolvedState,
    );

    expect(screen.getByTestId('app')).toMatchSnapshot();
  });

  it('snapshot when access to the location is denied', () => {
    const mockError = {
      message: 'mock error text',
    };
    navigator.geolocation.getCurrentPosition.mockImplementation(
      (_, fail) => fail(mockError),
    );

    renderWithRedux(
      <App
        testId="app"
      />,
      resolvedState,
    );

    expect(screen.getByTestId('app')).toMatchSnapshot();
  });
});
