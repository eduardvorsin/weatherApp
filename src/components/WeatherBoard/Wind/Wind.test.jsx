import { render, screen } from '@testing-library/react';
import Wind from './Wind';

describe('Wind component tests', () => {
  it('renders correctly', () => {
    render(<Wind
      className="test-class"
      windSpeed={15}
      windDirectionAngle={270}
    />);

    expect(screen.getByText(/15/)).toBeInTheDocument();
    expect(screen.getByText(/Запад/)).toBeInTheDocument();
  });

  it('renders without props', () => {
    render(<Wind
      testId="wind"
    />);

    expect(screen.getByTestId('wind')).toBeInTheDocument();
  });

  it('the classname is correctly assigned to the element', () => {
    render(<Wind
      className="test-class"
      testId="wind"
    />);

    expect(screen.getByTestId('wind')).toHaveClass('test-class');
  });

  it('snapshot with default data', () => {
    render(<Wind
      testId="wind"
    />);

    expect(screen.getByTestId('wind')).toMatchSnapshot();
  });

  it('snapshot with mock text', () => {
    render(<Wind
      className="test-class"
      windSpeed={15}
      windDirectionAngle={270}
      testId="wind"
    />);

    expect(screen.getByTestId('wind')).toMatchSnapshot();
  });
});
