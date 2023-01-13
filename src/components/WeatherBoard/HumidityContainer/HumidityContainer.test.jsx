import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import renderWithRedux from '../../../test-utils/renderWithRedux';
import errorState from '../../../__mocks__/errorState';
import loadingState from '../../../__mocks__/loadingState';
import mockLocation from '../../../__mocks__/location';
import resolvedState from '../../../__mocks__/resolvedState';
import server, { setupServerWithErrors } from '../../../__mocks__/server';
import HumidityContainer from './HumidityContainer';

describe('HumidityContainer component tests', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date('2022-12-27T09:00:00'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('renders correctly', () => {
    renderWithRedux(<HumidityContainer
      className="test-class"
      location={{}}
      testId="humidity"
    />);

    expect(screen.getByTestId('humidity')).toBeInTheDocument();
  });

  it('renders with error when loadingStatus equals "error"', () => {
    renderWithRedux(
      <HumidityContainer
        className="test-class"
        location={{}}
      />,
      errorState,
    );

    expect(screen.getByText(/Не удалось загрузить данные об относительной влажности/i)).toBeInTheDocument();
  });

  it('renders with loading spinner when loadingStatus equals "loading"', () => {
    renderWithRedux(
      <HumidityContainer
        className="test-class"
        location={{}}
      />,
      loadingState,
    );

    expect(screen.getByTitle('loading spinner')).toBeInTheDocument();
  });

  it('renders with data when loadingStatus equals "resolved"', () => {
    renderWithRedux(
      <HumidityContainer
        className="test-class"
        location={{}}
      />,
      resolvedState,
    );

    const relativeHumidity = new RegExp(
      resolvedState.weather.humidity.data.relativehumidity_2m[3],
    );

    const apparentTemperature = new RegExp(
      resolvedState.weather.humidity.data.apparent_temperature[3],
    );

    expect(screen.getByText(relativeHumidity)).toBeInTheDocument();
    expect(screen.getByText(apparentTemperature)).toBeInTheDocument();
  });

  it('the classname is correctly assigned to the element', () => {
    renderWithRedux(
      <HumidityContainer
        className="test-class"
        location={{}}
        testId="humidity"
      />,
    );

    expect(screen.getByTestId('humidity')).toHaveClass('test-class');
  });

  it('snapshot without anything', () => {
    renderWithRedux(
      <HumidityContainer
        className="test-class"
        location={{}}
        testId="humidity"
      />,
    );
    expect(screen.getByTestId('humidity')).toMatchSnapshot();
  });

  it('snapshot with mock error', () => {
    renderWithRedux(
      <HumidityContainer
        className="test-class"
        location={{}}
        testId="humidity"
      />,
      errorState,
    );

    expect(screen.getByTestId('humidity')).toMatchSnapshot();
  });

  it('snapshot with mock data', () => {
    renderWithRedux(
      <HumidityContainer
        className="test-class"
        location={{}}
        testId="humidity"
      />,
      resolvedState,
    );

    expect(screen.getByTestId('humidity')).toMatchSnapshot();
  });

  it('snapshot with a spinner', () => {
    renderWithRedux(
      <HumidityContainer
        className="test-class"
        location={{}}
        testId="humidity"
      />,
      loadingState,
    );

    expect(screen.getByTestId('humidity')).toMatchSnapshot();
  });
});

describe('HumidityContainer component itegration tests', () => {
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
      <HumidityContainer
        location={mockLocation}
      />,
    );

    expect(screen.getByTitle('loading spinner')).toBeInTheDocument();
    expect(screen.queryByText(/относительная влажность/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/ощущаемая температура:/i)).not.toBeInTheDocument();

    await waitForElementToBeRemoved(screen.getAllByTitle('loading spinner'));

    expect(screen.queryByTitle('loading spinner')).not.toBeInTheDocument();
    expect(screen.queryByText(/относительная влажность/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/ощущаемая температура/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/не удалось загрузить данные об относительной влажности/i)).toBeInTheDocument();
  });

  it('the loading status changes to the resolved status', async () => {
    renderWithRedux(
      <HumidityContainer
        location={mockLocation}
      />,
    );

    expect(screen.getByTitle('loading spinner')).toBeInTheDocument();
    expect(screen.queryByText(/относительная влажность/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/ощущаемая температура/i)).not.toBeInTheDocument();

    await waitForElementToBeRemoved(screen.getAllByTitle('loading spinner'));

    expect(screen.queryByTitle('loading spinner')).not.toBeInTheDocument();
    expect(screen.queryByText(/относительная влажность/i)).toBeInTheDocument();
    expect(screen.queryByText(/ощущаемая температура/i)).toBeInTheDocument();
    expect(screen.queryByText(/не удалось загрузить данные об относительной влажности/i)).not.toBeInTheDocument();
  });
});
