import PropTypes from 'prop-types';
import { getWeatherStatusByCode } from '../../../utils/utils';
import classes from './CurrentWeather.module.css';

export default function CurrentWeather({
  className,
  weatherCode,
  temperature,
  testId,
}) {
  const weatherStatus = getWeatherStatusByCode(weatherCode);
  return (
    <div
      className={`${classes['current-weather']} ${className}`}
      data-testid={testId}
    >
      <p className={classes['current-weather__temperature']}>
        {`${temperature}°`}
      </p>
      <p className={classes['current-weather__status']}>
        {weatherStatus}
      </p>
    </div>
  );
}

CurrentWeather.defaultProps = {
  className: '',
  weatherCode: 0,
  temperature: 0,
  testId: '',
};

CurrentWeather.propTypes = {
  className: PropTypes.string,
  weatherCode: PropTypes.number,
  temperature: PropTypes.number,
  testId: PropTypes.string,
};
