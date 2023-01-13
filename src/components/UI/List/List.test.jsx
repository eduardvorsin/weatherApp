import { render, screen } from '@testing-library/react';
import List from './List';

describe('List component tests', () => {
  it('renders correctly', () => {
    render(<List
      className="test-list"
      items={[1, 2, 3]}
      renderInItem={null}
      isOrdered
    />);

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('renders correctly without props', () => {
    render(<List />);

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('correctly renders the div passed to renderInItem', () => {
    render(<List
      items={['a', 'b', 'c', 'd', 'e']}
      renderInItem={(value) => (
        <div data-testid="test-div">{value}</div>
      )}
    />);

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(5);
    expect(screen.getAllByTestId('test-div')).toHaveLength(5);
    expect(screen.getAllByText(/[a-e]/i)).toHaveLength(5);
  });

  it('if the renderInItem prop is not passed, then just render <li></li> with the values', () => {
    render(<List
      className="test-list"
      items={[1, 2, 3]}
      isOrdered
    />);
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('the classname is correctly assigned to the element', () => {
    render(<List
      className="test-list"
    />);

    expect(screen.getByRole('list')).toHaveClass('test-list');
  });

  it('empty list snapshot', () => {
    render(<List />);

    expect(screen.getByRole('list')).toMatchSnapshot();
  });

  it('snapshot with mock data', () => {
    render(<List
      items={['lion', 'tiger', 'cat']}
    />);

    expect(screen.getByRole('list')).toMatchSnapshot();
  });

  it('snapshot of an ordered list', () => {
    render(<List
      isOrdered
      items={['bmw', 'nissan', 'toyota']}
    />);

    expect(screen.getByRole('list')).toMatchSnapshot();
  });
});
