import PropTypes from 'prop-types';
import { getFullDayDescription, getIconPathByCode, getWeatherStatusByCode } from '../../../utils/utils';
import classes from './DailyWeather.module.css';

export default function DailyWeather({
  temperatureMin,
  temperatureMax,
  day,
  weatherCode,
  className,
  testId,
}) {
  const iconPath = getIconPathByCode(weatherCode);
  const status = getWeatherStatusByCode(weatherCode);
  const date = getFullDayDescription(day);

  return (
    <div
      className={`${classes['daily-weather']} ${className}`}
      data-testid={testId}
    >
      <div
        className={classes['daily-weather__description']}
      >
        <p className={classes['daily-weather__text']}>
          {date}
        </p>
      </div>
      <img
        className={classes['daily-weather__icon']}
        src={iconPath}
        alt={status}
      />
      <p className={classes['daily-weather__temperature']}>
        <span
          className={classes['daily-weather__temperature--min']}
        >
          {temperatureMin}
          °
        </span>
        &nbsp;/&nbsp;
        <span
          className={classes['daily-weather__temperature--max']}
        >
          {temperatureMax}
          °
        </span>
      </p>
    </div>
  );
}

DailyWeather.defaultProps = {
  className: '',
  temperatureMin: 0,
  temperatureMax: 0,
  day: '2023-01-01T00:00',
  weatherCode: 0,
  testId: '',
};

DailyWeather.propTypes = {
  className: PropTypes.string,
  temperatureMin: PropTypes.number,
  temperatureMax: PropTypes.number,
  weatherCode: PropTypes.number,
  day: PropTypes.string,
  testId: PropTypes.string,
};
