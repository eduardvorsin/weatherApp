import PropTypes from 'prop-types';
import { getIconPathByCode, getWeatherStatusByCode } from '../../../utils/utils';
import classes from './HourlyWeather.module.css';

export default function HourlyWeather({
  temperature,
  weatherCode,
  className,
  testId,
}) {
  const iconPath = getIconPathByCode(weatherCode);
  const status = getWeatherStatusByCode(weatherCode);

  return (
    <div
      className={`${classes['hourly-weather']} ${className}`}
      data-testid={testId}
    >
      <img
        className={classes['hourly-weather__icon']}
        src={iconPath}
        alt={status}
      />
      <p
        className={classes['hourly-weather__temperature']}
      >
        {temperature}
        °
      </p>
      <p
        className={classes['hourly-weather__status']}
      >
        {status}
      </p>
    </div>
  );
}

HourlyWeather.defaultProps = {
  temperature: 0,
  weatherCode: 0,
  className: '',
  testId: '',
};

HourlyWeather.propTypes = {
  className: PropTypes.string,
  temperature: PropTypes.number,
  weatherCode: PropTypes.number,
  testId: PropTypes.string,
};
