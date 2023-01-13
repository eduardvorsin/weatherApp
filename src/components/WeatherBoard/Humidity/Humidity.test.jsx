import { render, screen } from '@testing-library/react';
import Humidity from './Humidity';

describe('Humidity component tests', () => {
  it('renders correctly', () => {
    render(<Humidity
      className="test-class"
      relativeHumidity={80}
      apparentTemperature={-17}
    />);

    expect(screen.getByText(/-17°/)).toBeInTheDocument();
    expect(screen.getByText(/80/)).toBeInTheDocument();
  });

  it('renders without props', () => {
    render(<Humidity />);

    expect(screen.getAllByText(/0/)).toHaveLength(2);
  });

  it('the classname is correctly assigned to the element', () => {
    render(<Humidity
      className="test-class"
      testId="humidity"
    />);

    expect(screen.getByTestId('humidity')).toHaveClass('test-class');
  });

  it('snapshot with default data', () => {
    render(<Humidity
      testId="humidity"
    />);

    expect(screen.getByTestId('humidity')).toMatchSnapshot();
  });

  it('snapshot with mock text', () => {
    render(<Humidity
      className="test-class"
      relativeHumidity={80}
      apparentTemperature={-17}
      testId="humidity"
    />);

    expect(screen.getByTestId('humidity')).toMatchSnapshot();
  });
});
