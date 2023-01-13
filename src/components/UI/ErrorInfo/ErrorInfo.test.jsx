import { render, screen } from '@testing-library/react';
import ErrorInfo from './ErrorInfo';
import { ReactComponent as MockIcon } from '../../../assets/icons/settings.svg';

describe('ErrorInfo component tests', () => {
  it('renders correctly', () => {
    render(<ErrorInfo
      className="test-class"
      message="text"
      icon={<MockIcon />}
    />);

    expect(screen.getByText(/text/)).toBeInTheDocument();
  });

  it('renders without props', () => {
    render(<ErrorInfo />);

    expect(screen.getByText(/default message/)).toBeInTheDocument();
  });

  it('renders with icon', () => {
    render(<ErrorInfo
      message="text"
      icon={<MockIcon title="mock-icon" />}
    />);

    expect(screen.getByTitle(/mock-icon/)).toBeInTheDocument();
  });

  it('the classname is correctly assigned to the element', () => {
    render(<ErrorInfo
      className="test-class"
      message="text"
      testId="error-info"
    />);

    expect(screen.getByTestId('error-info')).toHaveClass('test-class');
  });

  it('when the correct headingLevel is passed, the header with the appropriate level is rendered inside the component', () => {
    render(<ErrorInfo
      className="test-class"
      message="text"
      testId="error-info"
      headingLevel={2}
    />);

    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('when an incorrect headingLevel is passed, a header with level 6 is rendered inside the component', () => {
    render(<ErrorInfo
      className="test-class"
      message="text"
      testId="error-info"
    />);

    expect(screen.getByRole('heading', { level: 6 })).toBeInTheDocument();
  });



  it('shapshot with default text', () => {
    render(<ErrorInfo
      testId="error-info"
    />);

    expect(screen.getByTestId('error-info')).toMatchSnapshot();
  });

  it('shapshot with mock text', () => {
    render(<ErrorInfo
      message="an important error"
      testId="error-info"
    />);

    expect(screen.getByTestId('error-info')).toMatchSnapshot();
  });

  it('shapshot with another heading level', () => {
    render(<ErrorInfo
      message="an important error"
      testId="error-info"
      headingLevel={4}
    />);

    expect(screen.getByTestId('error-info')).toMatchSnapshot();
  });

  it('shapshot with isCentered props', () => {
    render(<ErrorInfo
      message="an important error"
      testId="error-info"
      isCentered
    />);

    expect(screen.getByTestId('error-info')).toMatchSnapshot();
  });
});
