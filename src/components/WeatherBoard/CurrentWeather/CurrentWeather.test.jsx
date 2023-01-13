import { render, screen } from '@testing-library/react';
import CurrentWeather from './CurrentWeather';

describe('CurrentWeather component tests', () => {
  it('renders correctly', () => {
    render(<CurrentWeather
      className="test-class"
      weatherCode={1}
      temperature={21}
    />);

    expect(screen.getByText(/21°/)).toBeInTheDocument();
  });

  it('renders without props', () => {
    render(<CurrentWeather
      testId="current-weather"
    />);

    expect(screen.getByTestId('current-weather')).toBeInTheDocument();
  });

  it('the classname is correctly assigned to the element', () => {
    render(<CurrentWeather
      className="test-class"
      testId="current-weather"
    />);

    expect(screen.getByTestId('current-weather')).toHaveClass('test-class');
  });

  it('snapshot with default data', () => {
    render(<CurrentWeather
      testId="current-weather"
    />);

    expect(screen.getByTestId('current-weather')).toMatchSnapshot();
  });

  it('snapshot with mock text', () => {
    render(<CurrentWeather
      weatherCode={1}
      temperature={13}
      testId="current-weather"
    />);

    expect(screen.getByTestId('current-weather')).toMatchSnapshot();
  });
});
