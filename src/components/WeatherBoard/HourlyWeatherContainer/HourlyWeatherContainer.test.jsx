import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import renderWithRedux from '../../../test-utils/renderWithRedux';
import errorState from '../../../__mocks__/errorState';
import loadingState from '../../../__mocks__/loadingState';
import mockLocation from '../../../__mocks__/location';
import resolvedState from '../../../__mocks__/resolvedState';
import server, { setupServerWithErrors } from '../../../__mocks__/server';
import HourlyWeatherContainer from './HourlyWeatherContainer';

const timeRegexp = /^\d{1,2}:\d{1,2}$/;
const temperatureRegexp = /(-)?\d+(.\d)?°/;
const weatherStatusRegexp = /ясно|пасмурно|туман|дождь|снег|гроза/;

describe('HourlyWeatherContainer component tests', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date('2022-12-27T09:00:00'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('renders correctly', () => {
    renderWithRedux(<HourlyWeatherContainer
      className="test-class"
      location={{}}
      testId="hourly-weather"
    />);

    expect(screen.getByTestId('hourly-weather')).toBeInTheDocument();
  });

  it('renders with error when loadingStatus equals "error"', () => {
    renderWithRedux(
      <HourlyWeatherContainer
        className="test-class"
        location={{}}
      />,
      errorState,
    );

    expect(screen.queryAllByText(timeRegexp)).toHaveLength(0);
    expect(screen.queryAllByText(temperatureRegexp)).toHaveLength(0);
    expect(screen.queryAllByText(weatherStatusRegexp)).toHaveLength(0);
    expect(screen.getByText(/не удалось загрузить данные о погоде на ближайщие 24 часа/i)).toBeInTheDocument();
  });

  it('renders with loading spinner when loadingStatus equals "loading"', () => {
    renderWithRedux(
      <HourlyWeatherContainer
        className="test-class"
        location={{}}
      />,
      loadingState,
    );

    expect(screen.getByTitle('loading spinner')).toBeInTheDocument();
  });

  it('renders with data when loadingStatus equals "resolved"', () => {
    renderWithRedux(
      <HourlyWeatherContainer
        className="test-class"
        location={{}}
      />,
      resolvedState,
    );

    expect(screen.queryAllByText(timeRegexp)).toHaveLength(24);
    expect(screen.queryAllByText(temperatureRegexp)).toHaveLength(24);
    expect(screen.queryAllByText(weatherStatusRegexp)).toHaveLength(24);
  });

  it('the classname is correctly assigned to the element', () => {
    renderWithRedux(
      <HourlyWeatherContainer
        className="test-class"
        location={{}}
        testId="hourly-weather"
      />,
    );

    expect(screen.getByTestId('hourly-weather')).toHaveClass('test-class');
  });

  it('snapshot without anything', () => {
    renderWithRedux(
      <HourlyWeatherContainer
        className="test-class"
        location={{}}
        testId="hourly-weather"
      />,
    );
    expect(screen.getByTestId('hourly-weather')).toMatchSnapshot();
  });

  it('snapshot with mock error', () => {
    renderWithRedux(
      <HourlyWeatherContainer
        className="test-class"
        location={{}}
        testId="hourly-weather"
      />,
      errorState,
    );

    expect(screen.getByTestId('hourly-weather')).toMatchSnapshot();
  });

  it('snapshot with mock data', () => {
    renderWithRedux(
      <HourlyWeatherContainer
        className="test-class"
        location={{}}
        testId="hourly-weather"
      />,
      resolvedState,
    );

    expect(screen.getByTestId('hourly-weather')).toMatchSnapshot();
  });

  it('snapshot with a spinner', () => {
    renderWithRedux(
      <HourlyWeatherContainer
        className="test-class"
        location={{}}
        testId="hourly-weather"
      />,
      loadingState,
    );

    expect(screen.getByTestId('hourly-weather')).toMatchSnapshot();
  });
});

describe('HourlyWeatherContainer component itegration tests', () => {
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

    server.listen({ onUnhandledRequest: 'error' });
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => {
    jest.useRealTimers();

    server.close();
  });

  it('the loading status changes to the error status', async () => {
    setupServerWithErrors();

    renderWithRedux(
      <HourlyWeatherContainer
        location={mockLocation}
      />,
    );

    expect(screen.getByTitle('loading spinner')).toBeInTheDocument();
    expect(screen.queryAllByText(timeRegexp)).toHaveLength(0);
    expect(screen.queryAllByText(temperatureRegexp)).toHaveLength(0);
    expect(screen.queryAllByText(weatherStatusRegexp)).toHaveLength(0);

    await waitForElementToBeRemoved(screen.getAllByTitle('loading spinner'));

    expect(screen.queryAllByText(timeRegexp)).toHaveLength(0);
    expect(screen.queryAllByText(temperatureRegexp)).toHaveLength(0);
    expect(screen.queryAllByText(weatherStatusRegexp)).toHaveLength(0);
    expect(screen.getByText(/не удалось загрузить данные о погоде на ближайщие 24 часа/i)).toBeInTheDocument();
  });

  it('the loading status changes to the resolved status', async () => {
    renderWithRedux(
      <HourlyWeatherContainer
        location={mockLocation}
      />,
    );

    expect(screen.getByTitle('loading spinner')).toBeInTheDocument();
    expect(screen.queryAllByText(timeRegexp)).toHaveLength(0);
    expect(screen.queryAllByText(temperatureRegexp)).toHaveLength(0);
    expect(screen.queryAllByText(weatherStatusRegexp)).toHaveLength(0);

    await waitForElementToBeRemoved(screen.getAllByTitle('loading spinner'));

    expect(screen.queryAllByText(timeRegexp)).toHaveLength(24);
    expect(screen.queryAllByText(temperatureRegexp)).toHaveLength(24);
    expect(screen.queryAllByText(weatherStatusRegexp)).toHaveLength(24);
    expect(screen.queryByText(/не удалось загрузить данные о погоде на ближайщие 24 часа/i)).not.toBeInTheDocument();
  });
});
