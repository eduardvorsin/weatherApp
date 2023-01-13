import { render, screen } from '@testing-library/react';
import HourlyWeather from './HourlyWeather';

describe('HourlyWeather component tests', () => {
  it('renders correctly', () => {
    render(<HourlyWeather
      className="test-class"
      weatherCode={0}
      temperature={-30}
    />);

    expect(screen.getByText(/-30°/)).toBeInTheDocument();
    expect(screen.getByText(/ясно/)).toBeInTheDocument();
  });

  it('renders without props', () => {
    render(<HourlyWeather />);

    expect(screen.getByText(/ясно/)).toBeInTheDocument();
    expect(screen.getByText(/0°/)).toBeInTheDocument();
  });

  it('the classname is correctly assigned to the element', () => {
    render(<HourlyWeather
      className="test-class"
      testId="hourly-weather"
    />);

    expect(screen.getByTestId('hourly-weather')).toHaveClass('test-class');
  });

  it('snapshot with default data', () => {
    render(<HourlyWeather
      testId="hourly-weather"
    />);

    expect(screen.getByTestId('hourly-weather')).toMatchSnapshot();
  });

  it('snapshot with mock text', () => {
    render(<HourlyWeather
      className="test-class"
      weatherCode={0}
      temperature={-30}
      testId="hourly-weather"
    />);

    expect(screen.getByTestId('hourly-weather')).toMatchSnapshot();
  });
});
