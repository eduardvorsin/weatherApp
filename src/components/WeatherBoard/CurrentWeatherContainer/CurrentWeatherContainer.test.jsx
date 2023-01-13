import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import renderWithRedux from '../../../test-utils/renderWithRedux';
import errorState from '../../../__mocks__/errorState';
import loadingState from '../../../__mocks__/loadingState';
import mockLocation from '../../../__mocks__/location';
import resolvedState from '../../../__mocks__/resolvedState';
import server, { setupServerWithErrors } from '../../../__mocks__/server';
import CurrentWeatherContainer from './CurrentWeatherContainer';

const temperatureRegexp = /(-)?\d+(.\d)?°/;
const weatherStatusRegexp = /ясно|пасмурно|туман|дождь|снег|гроза/;

describe('CurrentWeatherContainer component tests', () => {
  it('renders correctly', () => {
    renderWithRedux(<CurrentWeatherContainer
      className="test-class"
      location={{}}
      testId="current-weather"
    />);

    expect(screen.getByTestId('current-weather')).toBeInTheDocument();
  });

  it('renders with error when loadingStatus equals "error"', () => {
    renderWithRedux(
      <CurrentWeatherContainer
        className="test-class"
        location={{}}
      />,
      errorState,
    );

    expect(screen.getByText(/Не удалось загрузить данные о текущей погоде/i)).toBeInTheDocument();
    expect(screen.queryByText(weatherStatusRegexp)).not.toBeInTheDocument();
    expect(screen.queryByText(temperatureRegexp)).not.toBeInTheDocument();
  });

  it('renders with loading spinner when loadingStatus equals "loading"', () => {
    renderWithRedux(
      <CurrentWeatherContainer
        className="test-class"
        location={{}}
      />,
      loadingState,
    );

    expect(screen.getByTitle('loading spinner')).toBeInTheDocument();
  });

  it('renders with data when loadingStatus equals "resolved"', () => {
    renderWithRedux(
      <CurrentWeatherContainer
        className="test-class"
        location={{}}
      />,
      resolvedState,
    );

    expect(screen.getByText(weatherStatusRegexp)).toBeInTheDocument();
    expect(screen.getByText(temperatureRegexp)).toBeInTheDocument();
  });

  it('the classname is correctly assigned to the element', () => {
    renderWithRedux(
      <CurrentWeatherContainer
        className="test-class"
        location={{}}
        testId="current-weather"
      />,
    );

    expect(screen.getByTestId('current-weather')).toHaveClass('test-class');
  });

  it('snapshot without anything', () => {
    renderWithRedux(
      <CurrentWeatherContainer
        className="test-class"
        location={{}}
        testId="current-weather"
      />,
    );
    expect(screen.getByTestId('current-weather')).toMatchSnapshot();
  });

  it('snapshot with mock error', () => {
    renderWithRedux(
      <CurrentWeatherContainer
        className="test-class"
        location={{}}
        testId="current-weather"
      />,
      errorState,
    );

    expect(screen.getByTestId('current-weather')).toMatchSnapshot();
  });

  it('snapshot with mock data', () => {
    renderWithRedux(
      <CurrentWeatherContainer
        className="test-class"
        location={{}}
        testId="current-weather"
      />,
      resolvedState,
    );

    expect(screen.getByTestId('current-weather')).toMatchSnapshot();
  });

  it('snapshot with a spinner', () => {
    renderWithRedux(
      <CurrentWeatherContainer
        className="test-class"
        location={{}}
        testId="current-weather"
      />,
      loadingState,
    );

    expect(screen.getByTestId('current-weather')).toMatchSnapshot();
  });
});

describe('CurrentWeatherContainer component itegration tests', () => {
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
      <CurrentWeatherContainer
        location={mockLocation}
      />,
    );

    expect(screen.getByTitle('loading spinner')).toBeInTheDocument();
    expect(screen.queryByText(weatherStatusRegexp)).not.toBeInTheDocument();
    expect(screen.queryByText(temperatureRegexp)).not.toBeInTheDocument();

    await waitForElementToBeRemoved(screen.getAllByTitle('loading spinner'));

    expect(screen.queryByTitle('loading spinner')).not.toBeInTheDocument();
    expect(screen.queryByText(weatherStatusRegexp)).not.toBeInTheDocument();
    expect(screen.queryByText(temperatureRegexp)).not.toBeInTheDocument();
    expect(screen.queryByText(/не удалось загрузить данные о текущей погоде/i)).toBeInTheDocument();
  });

  it('the loading status changes to the resolved status', async () => {
    renderWithRedux(
      <CurrentWeatherContainer
        location={mockLocation}
      />,
    );

    expect(screen.getByTitle('loading spinner')).toBeInTheDocument();
    expect(screen.queryByText(weatherStatusRegexp)).not.toBeInTheDocument();
    expect(screen.queryByText(temperatureRegexp)).not.toBeInTheDocument();

    await waitForElementToBeRemoved(screen.getAllByTitle('loading spinner'));

    expect(screen.queryByTitle('loading spinner')).not.toBeInTheDocument();
    expect(screen.queryByText(weatherStatusRegexp)).toBeInTheDocument();
    expect(screen.queryByText(temperatureRegexp)).toBeInTheDocument();
    expect(screen.queryByText(/не удалось загрузить данные о текущей погоде/i)).not.toBeInTheDocument();
  });
});
