import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import renderWithRedux from '../../../test-utils/renderWithRedux';
import errorState from '../../../__mocks__/errorState';
import loadingState from '../../../__mocks__/loadingState';
import mockLocation from '../../../__mocks__/location';
import resolvedState from '../../../__mocks__/resolvedState';
import server, { setupServerWithErrors } from '../../../__mocks__/server';
import LocationInfoContainer from './LocationInfoContainer';

describe('LocationInfoContainer component tests', () => {
  it('renders correctly', () => {
    renderWithRedux(<LocationInfoContainer
      className="test-class"
      location={{}}
      testId="location-info"
    />);

    expect(screen.getByTestId('location-info')).toBeInTheDocument();
  });

  it('renders with error when loadingStatus equals "error"', () => {
    renderWithRedux(
      <LocationInfoContainer
        className="test-class"
        location={{}}
      />,
      errorState,
    );

    expect(screen.getByText(/Не удалось загрузить данные о вашем городе/i)).toBeInTheDocument();
  });

  it('renders with loading spinner when loadingStatus equals "loading"', () => {
    renderWithRedux(
      <LocationInfoContainer
        className="test-class"
        location={{}}
      />,
      loadingState,
    );

    expect(screen.getByTitle('loading spinner')).toBeInTheDocument();
  });

  it('renders with data when loadingStatus equals "resolved"', () => {
    renderWithRedux(
      <LocationInfoContainer
        className="test-class"
        location={{}}
      />,
      resolvedState,
    );

    const city = new RegExp(
      resolvedState.geocoding.data.city,
    );

    expect(screen.getByText(city)).toBeInTheDocument();
  });

  it('the classname is correctly assigned to the element', () => {
    renderWithRedux(
      <LocationInfoContainer
        className="test-class"
        location={{}}
        testId="location-info"
      />,
    );

    expect(screen.getByTestId('location-info')).toHaveClass('test-class');
  });

  it('snapshot without anything', () => {
    renderWithRedux(
      <LocationInfoContainer
        className="test-class"
        location={{}}
        testId="location-info"
      />,
    );
    expect(screen.getByTestId('location-info')).toMatchSnapshot();
  });

  it('snapshot with mock error', () => {
    renderWithRedux(
      <LocationInfoContainer
        className="test-class"
        location={{}}
        testId="location-info"
      />,
      errorState,
    );

    expect(screen.getByTestId('location-info')).toMatchSnapshot();
  });

  it('snapshot with mock data', () => {
    renderWithRedux(
      <LocationInfoContainer
        className="test-class"
        location={{}}
        testId="location-info"
      />,
      resolvedState,
    );

    expect(screen.getByTestId('location-info')).toMatchSnapshot();
  });

  it('snapshot with a spinner', () => {
    renderWithRedux(
      <LocationInfoContainer
        className="test-class"
        location={{}}
        testId="location-info"
      />,
      loadingState,
    );

    expect(screen.getByTestId('location-info')).toMatchSnapshot();
  });
});

describe('LocationInfoContainer component itegration tests', () => {
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
      <LocationInfoContainer
        location={mockLocation}
      />,
    );

    expect(screen.getByTitle('loading spinner')).toBeInTheDocument();
    expect(screen.queryByText(resolvedState.geocoding.data.city)).not.toBeInTheDocument();

    await waitForElementToBeRemoved(screen.getAllByTitle('loading spinner'));

    expect(screen.queryByText(resolvedState.geocoding.data.city)).not.toBeInTheDocument();
    expect(screen.getByText(/не удалось загрузить данные о вашем городе/i)).toBeInTheDocument();
  });

  it('the loading status changes to the resolved status', async () => {
    renderWithRedux(
      <LocationInfoContainer
        location={mockLocation}
      />,
    );

    expect(screen.queryByText(resolvedState.geocoding.data.city)).not.toBeInTheDocument();

    await waitForElementToBeRemoved(screen.getAllByTitle('loading spinner'));

    expect(screen.queryByText(resolvedState.geocoding.data.city)).toBeInTheDocument();
    expect(screen.queryByText(/не удалось загрузить данные о вашем городе/i)).not.toBeInTheDocument();
  });
});
