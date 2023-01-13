import PropTypes from 'prop-types';
import PieChart from '../../UI/PieChart/PieChart';
import classes from './Humidity.module.css';

export default function Humidity({
  relativeHumidity,
  apparentTemperature,
  className,
  testId,
}) {
  return (
    <div
      className={`${classes.humidity} ${className}`}
      data-testid={testId}
    >
      <h3 className={classes.humidity__title}>
        Относительная влажность
      </h3>

      <div className={classes.humidity__content}>
        <PieChart
          className={classes['humidity__pie-chart']}
          value={relativeHumidity}
        />

        <p className={classes['humidity__apparent-temperature']}>
          Ощущаемая температура:
          {' '}
          {`${apparentTemperature}°`}
        </p>
      </div>
    </div>
  );
}

Humidity.defaultProps = {
  className: '',
  relativeHumidity: 0,
  apparentTemperature: 0,
  testId: '',
};

Humidity.propTypes = {
  className: PropTypes.string,
  relativeHumidity: PropTypes.number,
  apparentTemperature: PropTypes.number,
  testId: PropTypes.string,
};
