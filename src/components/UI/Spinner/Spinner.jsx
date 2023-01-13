import PropTypes from 'prop-types';
import classes from './Spinner.module.css';

export default function Spinner({
  className,
  size,
}) {
  const spinnerSize = `${size}px`;
  const ringSize = `${0.8 * size}px`;

  return (
    <div
      className={`${classes.spinner} ${className}`}
      aria-label="loading spinner"
      style={{ '--size': spinnerSize }}
      title="loading spinner"
    >
      <div
        className={classes.spinner__ring}
        style={{ '--ring-size': ringSize }}
      />
      <div
        className={classes.spinner__ring}
        style={{ '--ring-size': ringSize }}
      />
      <div
        className={classes.spinner__ring}
        style={{ '--ring-size': ringSize }}
      />
      <div
        className={classes.spinner__ring}
        style={{ '--ring-size': ringSize }}
      />
    </div>
  );
}

Spinner.defaultProps = {
  className: '',
  size: 100,
};

Spinner.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
};
