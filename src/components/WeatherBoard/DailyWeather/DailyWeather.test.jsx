import { render, screen } from '@testing-library/react';
import DailyWeather from './DailyWeather';

describe('DailyWeather component tests', () => {
  it('renders correctly', () => {
    render(<DailyWeather
      className="test-class"
      temperatureMin={0}
      temperatureMax={21}
      day="2023-01-02T00:00"
    />);

    expect(screen.getByText(/21°/)).toBeInTheDocument();
    expect(screen.getByText(/0°/)).toBeInTheDocument();
    expect(screen.getByText(/понедельник, 2 января/)).toBeInTheDocument();
  });

  it('renders without props', () => {
    render(<DailyWeather />);

    expect(screen.getByText(/воскресенье, 1 января/)).toBeInTheDocument();
    expect(screen.getAllByText(/0°/)).toHaveLength(2);
  });

  it('the classname is correctly assigned to the element', () => {
    render(<DailyWeather
      className="test-class"
      testId="daily-weather"
    />);

    expect(screen.getByTestId('daily-weather')).toHaveClass('test-class');
  });

  it('snapshot with default data', () => {
    render(<DailyWeather
      testId="daily-weather"
    />);

    expect(screen.getByTestId('daily-weather')).toMatchSnapshot();
  });

  it('snapshot with mock text', () => {
    render(<DailyWeather
      className="test-class"
      temperatureMin={-23}
      temperatureMax={-6}
      day="2023-01-02T00:00"
      testId="daily-weather"
    />);

    expect(screen.getByTestId('daily-weather')).toMatchSnapshot();
  });
});
