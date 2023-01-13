import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRedux from '../../test-utils/renderWithRedux';
import WeatherBoard from './WeatherBoard';
import server, { setupServerWithErrors } from '../../__mocks__/server';
import mockLocation from '../../__mocks__/location';
import errorState from '../../__mocks__/errorState';
import resolvedState from '../../__mocks__/resolvedState';

const pageTitles = [
  'Текущая погода',
  'Ваш город',
  'Погода на ближайщие 24 часа',
  'Погода на неделю',
  'Информация об относительной влажности и ветре',
];

const errorMessages = [
  'Не удалось загрузить данные о текущей погоде',
  'Не удалось загрузить данные о вашем городе',
  'Не удалось загрузить данные о погоде на ближайщие 24 часа',
  'Не удалось загрузить данные о погоде на текущую неделю',
  'Не удалось загрузить данные об относительной влажности',
  'Не удалось загрузить данные о ветре',
];

describe('WeatherBoard component tests', () => {
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

  it('renders loading spinners when state is empty', async () => {
    renderWithRedux(
      <WeatherBoard
        location={mockLocation}
      />,
    );

    await act(() => {
      pageTitles.forEach((title) => {
        expect(screen.getByText(title)).toBeInTheDocument();
      });

      expect(screen.getAllByTitle('loading spinner')).toHaveLength(6);
    });
  });

  it('renders error messages when state have errors', async () => {
    renderWithRedux(
      <WeatherBoard
        location={{}}
      />,
      errorState,
    );

    errorMessages.forEach((error) => {
      expect(screen.getByText(error)).toBeInTheDocument();
    });
  });

  it('renders components with weather data when state is resolved', async () => {
    renderWithRedux(
      <WeatherBoard
        location={{}}
      />,
      resolvedState,
    );

    expect(screen.queryAllByTitle('loading spinner')).toHaveLength(0);
    expect(screen.queryByText(/ветер/i)).toBeInTheDocument();
    expect(screen.queryByText(/относительная влажность/i)).toBeInTheDocument();
    expect(screen.queryByText(/ощущаемая температура/i)).toBeInTheDocument();
    expect(screen.queryByText(/скорость/i)).toBeInTheDocument();
  });

  it('snapshot when the state is empty', async () => {
    renderWithRedux(
      <WeatherBoard
        testId="weather-board"
        location={mockLocation}
      />,
    );

    await act(() => {
      expect(screen.getByTestId('weather-board')).toMatchSnapshot();
    });
  });

  it('snapshot with error messages', async () => {
    renderWithRedux(
      <WeatherBoard
        testId="weather-board"
        location={{}}
      />,
      errorState,
    );

    expect(screen.getByTestId('weather-board')).toMatchSnapshot();
  });

  it('snapshot with resolved data', async () => {
    renderWithRedux(
      <WeatherBoard
        testId="weather-board"
        location={{}}
      />,
      resolvedState,
    );

    expect(screen.getByTestId('weather-board')).toMatchSnapshot();
  });
});

describe('WeatherBoard component itegration tests', () => {
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

  it('the state of the application state goes from loading to error', async () => {
    setupServerWithErrors();

    renderWithRedux(
      <WeatherBoard
        location={mockLocation}
      />,
    );

    pageTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });

    expect(screen.getAllByTitle('loading spinner')).toHaveLength(6);
    expect(screen.queryByText(/ветер/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/относительная влажность/i)).not.toBeInTheDocument();

    await waitForElementToBeRemoved(screen.getAllByTitle('loading spinner'));

    expect(screen.queryAllByTitle('loading spinner')).toHaveLength(0);
    expect(screen.queryByText(/ветер/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/относительная влажность/i)).not.toBeInTheDocument();
  });

  it('the state of the application state changes from loading to resolved', async () => {
    renderWithRedux(
      <WeatherBoard
        location={mockLocation}
      />,
    );

    pageTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });

    expect(screen.getAllByTitle('loading spinner')).toHaveLength(6);
    expect(screen.queryByText(/ветер/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/относительная влажность/i)).not.toBeInTheDocument();

    await waitForElementToBeRemoved(screen.getAllByTitle('loading spinner'));

    expect(screen.queryAllByTitle('loading spinner')).toHaveLength(0);
    expect(screen.queryByText(/ветер/i)).toBeInTheDocument();
    expect(screen.queryByText(/относительная влажность/i)).toBeInTheDocument();
    expect(screen.queryByText(/ощущаемая температура/i)).toBeInTheDocument();
    expect(screen.queryByText(/скорость/i)).toBeInTheDocument();
  });
});
