import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner component tests', () => {
  it('renders correctly', () => {
    render(<Spinner
      size={60}
      className="test-spinner"
    />);

    expect(screen.getByTitle('loading spinner')).toBeInTheDocument();
  });

  it('renders correctly without props', () => {
    render(<Spinner />);

    expect(screen.getByTitle('loading spinner')).toBeInTheDocument();
  });

  it('the classname is correctly assigned to the element', () => {
    render(<Spinner
      className="test-spinner"
    />);

    expect(screen.getByTitle('loading spinner')).toHaveClass('test-spinner');
  });

  it('if the prop size is 150, then the width and height of the spinner are also 150', () => {
    render(<Spinner
      className="test-spinner"
      size={150}
    />);

    expect(screen.getByTitle('loading spinner')).toHaveStyle({
      width: '150',
      height: '150',
    });
  });

  it('snapshot with default size', () => {
    render(<Spinner />);

    expect(screen.getByTitle('loading spinner')).toMatchSnapshot();
  });

  it('snapshot with custom size', () => {
    render(<Spinner
      size={30}
    />);

    expect(screen.getByTitle('loading spinner')).toMatchSnapshot();
  });
});
