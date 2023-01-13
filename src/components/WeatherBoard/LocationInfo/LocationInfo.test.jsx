import { render, screen } from '@testing-library/react';
import LocationInfo from './LocationInfo';

describe('LocationInfo component tests', () => {
  it('renders correctly', () => {
    render(<LocationInfo
      className="test-class"
      text="Лондон"
    />);

    expect(screen.getByText(/Лондон/)).toBeInTheDocument();
  });

  it('renders without props', () => {
    render(<LocationInfo
      testId="location-info"
    />);

    expect(screen.getByTestId('location-info')).toBeInTheDocument();
  });

  it('the classname is correctly assigned to the element', () => {
    render(<LocationInfo
      className="test-class"
      testId="location-info"
    />);

    expect(screen.getByTestId('location-info')).toHaveClass('test-class');
  });

  it('snapshot with default data', () => {
    render(<LocationInfo
      testId="location-info"
    />);

    expect(screen.getByTestId('location-info')).toMatchSnapshot();
  });

  it('snapshot with mock text', () => {
    render(<LocationInfo
      className="test-class"
      text="Лондон"
      testId="location-info"
    />);

    expect(screen.getByTestId('location-info')).toMatchSnapshot();
  });
});
