import { render, screen } from '@testing-library/react';

import Table from './Table';

describe('Table component tests', () => {
  it('renders correctly', () => {
    const headerCells = [
      { name: '1' },
      { name: '2' },
      { name: '3' },
    ];

    const dataRows = [{
      id: 0,
      data: [1, 2, 3],
    }];

    render(<Table
      className="test-table"
      headerCells={headerCells}
      dataRows={dataRows}
      renderInDataCell={null}
    />);

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getAllByRole('columnheader')).toHaveLength(3);
    expect(screen.getAllByRole('cell')).toHaveLength(3);
  });

  it('renders correctly without props', () => {
    render(<Table />);

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.queryByRole('columnheader')).not.toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(1);
    expect(screen.queryByRole('cell')).not.toBeInTheDocument();
  });

  it('correctly renders the div passed to renderInItem', () => {
    const headerCells = [
      { name: 'a' },
      { name: 'b' },
      { name: 'c' },
      { name: 'd' },
    ];

    const dataRows = [{
      id: 0,
      data: {
        a: 'red',
        b: 'orange',
        c: 'blue',
        d: 'purple',
      },
    }];

    render(<Table
      headerCells={headerCells}
      dataRows={dataRows}
      renderInDataCell={(_, value) => (
        <div data-testid="test-div">{value}</div>
      )}
    />);

    expect(screen.getAllByRole('cell')).toHaveLength(4);
    expect(screen.getAllByTestId('test-div')).toHaveLength(4);
    expect(screen.getByText(headerCells[0].name)).toBeInTheDocument();
    expect(screen.getByText(dataRows[0].data.c)).toBeInTheDocument();
  });

  it('if the renderInItem prop is not passed, then just render <td></td> with the values', () => {
    const headerCells = [
      { name: 'a' },
      { name: 'b' },
      { name: 'c' },
    ];

    const dataRows = [{
      id: 0,
      data: ['red', 'orange', 'blue'],
    }];

    render(<Table
      headerCells={headerCells}
      dataRows={dataRows}
    />);

    expect(screen.getAllByRole('cell')).toHaveLength(3);
    expect(screen.getByText(headerCells[2].name)).toBeInTheDocument();
    expect(screen.getByText(dataRows[0].data[1])).toBeInTheDocument();
  });

  it('the classname is correctly assigned to the element', () => {
    render(<Table
      className="test-class"
      testId="table"
    />);

    expect(screen.getByTestId('table')).toHaveClass('test-class');
  });

  it('snapshot of an empty table', () => {
    render(<Table testId="table" />);

    expect(screen.getByRole('table')).toMatchSnapshot();
  });

  it('snapshot with mock data', () => {
    const headerCells = [
      { name: 'animal1' },
      { name: 'animal2' },
      { name: 'animal3' },
    ];

    const dataRows = [{
      id: 0,
      data: ['cat', 'dog', 'parrot'],
    }];

    render(<Table
      headerCells={headerCells}
      dataRows={dataRows}
      testId="table"
    />);

    expect(screen.getByRole('table')).toMatchSnapshot();
  });
});
