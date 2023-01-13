import { render, screen } from '@testing-library/react';
import LocationError from './LocationError';

describe('LocationError component tests', () => {
  it('renders correctly', () => {
    render(<LocationError />);

    expect(screen.getByText(/нет доступа к вашему местоположению/i)).toBeInTheDocument();
  });

  it('default snapshot of component', () => {
    render(<LocationError
      testId="location-error"
    />);

    expect(screen.getByTestId('location-error')).toMatchSnapshot();
  });
});
