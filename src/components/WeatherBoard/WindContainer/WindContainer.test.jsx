import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import renderWithRedux from '../../../test-utils/renderWithRedux';
import { getWindDirectionNameByAngle } from '../../../utils/utils';
import errorState from '../../../__mocks__/errorState';
import loadingState from '../../../__mocks__/loadingState';
import mockLocation from '../../../__mocks__/location';
import resolvedState from '../../../__mocks__/resolvedState';
import server, { setupServerWithErrors } from '../../../__mocks__/server';
import WindContainer from './WindContainer';

describe('WindContainer component tests', () => {
  it('renders correctly', () => {
    renderWithRedux(<WindContainer
      className="test-class"
      location={{}}
      testId="wind"
    />);

    expect(screen.getByTestId('wind')).toBeInTheDocument();
  });

  it('renders with error when loadingStatus equals "error"', () => {
    renderWithRedux(
      <WindContainer
        className="test-class"
        location={{}}
      />,
      errorState,
    );

    expect(screen.getByText(/Не удалось загрузить данные о ветре/i)).toBeInTheDocument();
  });

  it('renders with loading spinner when loadingStatus equals "loading"', () => {
    renderWithRedux(
      <WindContainer
        className="test-class"
        location={{}}
      />,
      loadingState,
    );

    expect(screen.getByTitle('loading spinner')).toBeInTheDocument();
  });

  it('renders with data when loadingStatus equals "resolved"', () => {
    renderWithRedux(
      <WindContainer
        className="test-class"
        location={{}}
      />,
      resolvedState,
    );

    const directionAngle = new RegExp(getWindDirectionNameByAngle(
      resolvedState.weather.wind.data.directionAngle,
    ));

    const speed = new RegExp(
      resolvedState.weather.wind.data.speed,
    );

    expect(screen.getByText(speed)).toBeInTheDocument();
    expect(screen.getByText(directionAngle)).toBeInTheDocument();
  });

  it('the classname is correctly assigned to the element', () => {
    renderWithRedux(
      <WindContainer
        className="test-class"
        location={{}}
        testId="wind"
      />,
    );

    expect(screen.getByTestId('wind')).toHaveClass('test-class');
  });

  it('snapshot without anything', () => {
    renderWithRedux(
      <WindContainer
        className="test-class"
        location={{}}
        testId="wind"
      />,
    );
    expect(screen.getByTestId('wind')).toMatchSnapshot();
  });

  it('snapshot with mock error', () => {
    renderWithRedux(
      <WindContainer
        className="test-class"
        location={{}}
        testId="wind"
      />,
      errorState,
    );

    expect(screen.getByTestId('wind')).toMatchSnapshot();
  });

  it('snapshot with mock data', () => {
    renderWithRedux(
      <WindContainer
        className="test-class"
        location={{}}
        testId="wind"
      />,
      resolvedState,
    );

    expect(screen.getByTestId('wind')).toMatchSnapshot();
  });

  it('snapshot with a spinner', () => {
    renderWithRedux(
      <WindContainer
        className="test-class"
        location={{}}
        testId="wind"
      />,
      loadingState,
    );

    expect(screen.getByTestId('wind')).toMatchSnapshot();
  });
});

describe('WindContainer component itegration tests', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('the loading status changes to the error status', async () => {
    setupServerWithErrors();

    renderWithRedux(
      <WindContainer
        location={mockLocation}
      />,
    );

    expect(screen.getByTitle('loading spinner')).toBeInTheDocument();
    expect(screen.queryByText(/ветер/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/скорость/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/направление/i)).not.toBeInTheDocument();

    await waitForElementToBeRemoved(screen.getAllByTitle('loading spinner'));

    expect(screen.queryByTitle('loading spinner')).not.toBeInTheDocument();
    expect(screen.queryByText(/ветер/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Не удалось загрузить данные о ветре/i)).toBeInTheDocument();
  });

  it('the loading status changes to the resolved status', async () => {
    renderWithRedux(
      <WindContainer
        location={mockLocation}
      />,
    );

    expect(screen.getByTitle('loading spinner')).toBeInTheDocument();
    expect(screen.queryByText(/ветер/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/скорость/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/направление/i)).not.toBeInTheDocument();

    await waitForElementToBeRemoved(screen.getAllByTitle('loading spinner'));

    expect(screen.queryByTitle('loading spinner')).not.toBeInTheDocument();
    expect(screen.queryByText(/ветер/i)).toBeInTheDocument();
    expect(screen.queryByText(/Не удалось загрузить данные о ветре/i)).not.toBeInTheDocument();
  });
});
