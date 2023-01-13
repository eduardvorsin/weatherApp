import PropTypes from 'prop-types';
import classes from './PieChart.module.css';

export default function PieChart({
  value,
  className,
  testId,
}) {
  return (
    <div
      className={`${classes['pie-chart']} ${className}`}
      data-testid={testId}
    >
      <svg
        className={classes['pie-chart__icon']}
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className={classes['pie-chart__circle']}
          cx="255"
          cy="255"
          r="245.25"
        />
        <circle
          className={classes['pie-chart__circle']}
          style={{ '--value': `${value}` }}
          cx="255"
          cy="255"
          r="245.25"
        />
      </svg>
      <p className={classes['pie-chart__text']}>
        {value}
        %
      </p>
    </div>
  );
}

PieChart.defaultProps = {
  className: '',
  value: 75,
  testId: '',
};

PieChart.propTypes = {
  className: PropTypes.string,
  value: PropTypes.number,
  testId: PropTypes.string,
};
