import { render, screen } from '@testing-library/react';
import PieChart from './PieChart';

describe('PieChart component tests', () => {
  it('renders correctly', () => {
    render(<PieChart
      value={50}
      className="test-chart"
    />);

    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('renders correctly without props', () => {
    render(<PieChart />);

    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('the classname is correctly assigned to the element', () => {
    render(<PieChart
      className="test-chart"
      testId="pie-chart"
    />);

    expect(screen.getByTestId('pie-chart')).toHaveClass('test-chart');
  });

  it('snapshot with default value', () => {
    render(<PieChart
      testId="pie-chart"
    />);

    expect(screen.getByTestId('pie-chart')).toMatchSnapshot();
  });

  it('snapshot with mock value', () => {
    render(<PieChart
      value={33}
      testId="pie-chart"
    />);

    expect(screen.getByTestId('pie-chart')).toMatchSnapshot();
  });
});
