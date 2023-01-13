import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import renderWithRedux from '../../../test-utils/renderWithRedux';
import errorState from '../../../__mocks__/errorState';
import loadingState from '../../../__mocks__/loadingState';
import mockLocation from '../../../__mocks__/location';
import resolvedState from '../../../__mocks__/resolvedState';
import server, { setupServerWithErrors } from '../../../__mocks__/server';
import DailyWeatherContainer from './DailyWeatherContainer';

const textRegexp = /(понедельник|вторник|среда|четверг|пятница|суббота|воскресенье).+/;

const temperatureRegexp = /(-)?\d+(.\d)?°/;

describe('DailyWeatherContainer component tests', () => {
  it('renders correctly', () => {
    renderWithRedux(<DailyWeatherContainer
      className="test-class"
      location={{}}
      testId="daily-weather"
    />);

    expect(screen.getByTestId('daily-weather')).toBeInTheDocument();
  });

  it('renders with error when loadingStatus equals "error"', () => {
    renderWithRedux(
      <DailyWeatherContainer
        className="test-class"
        location={{}}
      />,
      errorState,
    );

    expect(screen.queryAllByText(textRegexp)).toHaveLength(0);
    expect(screen.queryAllByText(temperatureRegexp)).toHaveLength(0);
    expect(
      screen.getByText(/не удалось загрузить данные о погоде на текущую неделю/i),
    ).toBeInTheDocument();
  });

  it('renders with loading spinner when loadingStatus equals "loading"', () => {
    renderWithRedux(
      <DailyWeatherContainer
        className="test-class"
        location={{}}
      />,
      loadingState,
    );

    expect(screen.getByTitle('loading spinner')).toBeInTheDocument();
  });

  it('renders with data when loadingStatus equals "resolved"', () => {
    renderWithRedux(
      <DailyWeatherContainer
        className="test-class"
        location={{}}
      />,
      resolvedState,
    );

    expect(screen.getAllByText(textRegexp)).toHaveLength(6);
    expect(screen.getAllByText(temperatureRegexp)).toHaveLength(12);
  });

  it('the classname is correctly assigned to the element', () => {
    renderWithRedux(
      <DailyWeatherContainer
        className="test-class"
        location={{}}
        testId="daily-weather"
      />,
    );

    expect(screen.getByTestId('daily-weather')).toHaveClass('test-class');
  });

  it('snapshot without anything', () => {
    renderWithRedux(
      <DailyWeatherContainer
        className="test-class"
        location={{}}
        testId="daily-weather"
      />,
    );
    expect(screen.getByTestId('daily-weather')).toMatchSnapshot();
  });

  it('snapshot with mock error', () => {
    renderWithRedux(
      <DailyWeatherContainer
        className="test-class"
        location={{}}
        testId="daily-weather"
      />,
      errorState,
    );

    expect(screen.getByTestId('daily-weather')).toMatchSnapshot();
  });

  it('snapshot with mock data', () => {
    renderWithRedux(
      <DailyWeatherContainer
        className="test-class"
        location={{}}
        testId="daily-weather"
      />,
      resolvedState,
    );

    expect(screen.getByTestId('daily-weather')).toMatchSnapshot();
  });

  it('snapshot with a spinner', () => {
    renderWithRedux(
      <DailyWeatherContainer
        className="test-class"
        location={{}}
        testId="daily-weather"
      />,
      loadingState,
    );

    expect(screen.getByTestId('daily-weather')).toMatchSnapshot();
  });
});

describe('DailyWeatherContainer component itegration tests', () => {
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
      <DailyWeatherContainer
        location={mockLocation}
      />,
    );

    expect(screen.getByTitle('loading spinner')).toBeInTheDocument();
    expect(screen.queryAllByText(textRegexp)).toHaveLength(0);
    expect(screen.queryAllByText(temperatureRegexp)).toHaveLength(0);

    await waitForElementToBeRemoved(screen.getAllByTitle('loading spinner'));

    expect(screen.queryByTitle('loading spinner')).not.toBeInTheDocument();
    expect(screen.queryAllByText(textRegexp)).toHaveLength(0);
    expect(screen.queryAllByText(temperatureRegexp)).toHaveLength(0);
    expect(screen.queryByText(/не удалось загрузить данные о погоде на текущую неделю/i)).toBeInTheDocument();
  });

  it('the loading status changes to the resolved status', async () => {
    renderWithRedux(
      <DailyWeatherContainer
        location={mockLocation}
      />,
    );

    expect(screen.getByTitle('loading spinner')).toBeInTheDocument();
    expect(screen.queryAllByText(textRegexp)).toHaveLength(0);
    expect(screen.queryAllByText(temperatureRegexp)).toHaveLength(0);

    await waitForElementToBeRemoved(screen.getAllByTitle('loading spinner'));

    expect(screen.queryByTitle('loading spinner')).not.toBeInTheDocument();
    expect(screen.queryAllByText(textRegexp)).toHaveLength(6);
    expect(screen.queryAllByText(temperatureRegexp)).toHaveLength(12);
    expect(
      screen.queryByText(/не удалось загрузить данные о погоде на текущую неделю/i),
    ).not.toBeInTheDocument();
  });
});
