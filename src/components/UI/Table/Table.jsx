import PropTypes from 'prop-types';
import classes from './Table.module.css';

export default function Table({
  className,
  headerCells,
  dataRows,
  renderInDataCell,
  testId,
}) {
  return (
    <div
      className={`${classes['table-overlay']} ${className}`}
      data-testid={testId}
    >
      <div className={classes['table-container']}>
        <table
          className={classes.table}
        >

          <thead className={classes.table__head}>
            <tr className={classes.table__row}>
              {headerCells.map((cell) => (
                <th
                  className={classes['table__head-cell']}
                  key={cell.name}
                >
                  {cell?.name}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className={classes.table__body}>
            {dataRows.map((row) => (
              <tr key={row.id} className={classes.table__row}>
                {
                  Object.entries(row.data).map(([key, value]) => (
                    <td
                      className={classes['table__data-cell']}
                      key={key}
                    >
                      {
                        renderInDataCell
                          ? renderInDataCell(key, value)
                          : value
                      }
                    </td>
                  ))
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

Table.defaultProps = {
  className: '',
  headerCells: [],
  dataRows: [],
  renderInDataCell: null,
  testId: '',
};

Table.propTypes = {
  className: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  headerCells: PropTypes.arrayOf(PropTypes.object),
  // eslint-disable-next-line react/forbid-prop-types
  dataRows: PropTypes.arrayOf(PropTypes.object),
  renderInDataCell: PropTypes.func,
  testId: PropTypes.string,
};
