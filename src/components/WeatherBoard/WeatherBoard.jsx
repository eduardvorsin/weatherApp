import PropTypes from 'prop-types';
import classes from './WeatherBoard.module.css';
import CurrentWeatherContainer from './CurrentWeatherContainer/CurrentWeatherContainer';
import HourlyWeatherContainer from './HourlyWeatherContainer/HourlyWeatherContainer';
import DailyWeatherContainer from './DailyWeatherContainer/DailyWeatherContainer';
import HumidityContainer from './HumidityContainer/HumidityContainer';
import WindContainer from './WindContainer/WindContainer';
import LocationInfoContainer from './LocationInfoContainer/LocationInfoContainer';

export default function WeatherBoard({
  className,
  location,
  testId,
}) {
  return (
    <div
      className={`${classes['weather-board']} ${className}`}
      data-testid={testId}
    >
      <CurrentWeatherContainer
        className={classes['weather-board__current-weather']}
        location={location}
      />
      <LocationInfoContainer
        className={classes['weather-board__location-info']}
        location={location}
      />
      <HourlyWeatherContainer
        className={classes['weather-board__hourly-weather']}
        location={location}
      />
      <DailyWeatherContainer
        className={classes['weather-board__daily-weather']}
        location={location}
      />

      <section className={`${classes['weather-board__additional-info']} additional-info`}>
        <h2 className="additional-info__title sr-only">
          Информация об относительной влажности и ветре
        </h2>
        <HumidityContainer
          className={classes['weather-board__humidity']}
          location={location}
        />
        <WindContainer
          className={classes['weather-board__wind']}
          location={location}
        />
      </section>
    </div>
  );
}

WeatherBoard.defaultProps = {
  className: '',
  location: {},
  testId: '',
};

WeatherBoard.propTypes = {
  className: PropTypes.string,
  testId: PropTypes.string,
  location: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
};
