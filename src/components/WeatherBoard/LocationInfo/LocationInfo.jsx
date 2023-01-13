import PropTypes from 'prop-types';
import classes from './LocationInfo.module.css';

export default function LocationInfo({
  className,
  text,
  testId,
}) {
  return (
    <p
      className={`${classes['location-info']} ${className}`}
      data-testid={testId}
    >
      <span className={classes['location-info__text']}>
        {text}
      </span>
      <img
        className={classes['location-info__icon']}
        src="/assets/icons/location.svg"
        alt="location icon"
      />
    </p>
  );
}

LocationInfo.defaultProps = {
  className: '',
  text: '',
  testId: '',
};

LocationInfo.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  testId: PropTypes.string,
};
