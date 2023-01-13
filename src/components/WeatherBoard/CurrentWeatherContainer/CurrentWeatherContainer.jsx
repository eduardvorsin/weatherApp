import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchingStatuses from '../../../redux/fetchingStatuses';
import selectCurrentWeather from '../../../redux/selectors/selectCurrentWeather/selectCurrentWeather';
import fetchCurrentWeather from '../../../redux/thunks/fetchCurrentWeather/fetchCurrentWeather';
import ErrorInfo from '../../UI/ErrorInfo/ErrorInfo';
import Spinner from '../../UI/Spinner/Spinner';
import CurrentWeather from '../CurrentWeather/CurrentWeather';

export default function CurrentWeatherContainer({
  className,
  location,
  testId,
}) {
  const dispatch = useDispatch();

  const {
    data,
    loadingStatus,
  } = useSelector(selectCurrentWeather);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      dispatch(fetchCurrentWeather(location));
    }
  }, [location, dispatch]);

  return (
    <section
      className={`current-weather__section current-weather-section ${className}`}
      data-testid={testId}
    >
      <h2 className="current-weather-section__title sr-only">
        Текущая погода
      </h2>
      {loadingStatus === fetchingStatuses.loading
        && (
          <Spinner
            size={102}
          />
        )}
      {
        loadingStatus === fetchingStatuses.error
        && (
          <ErrorInfo
            message="Не удалось загрузить данные о текущей погоде"
            headingLevel={3}
          />
        )
      }
      {
        loadingStatus === fetchingStatuses.resolved
        && (
          <CurrentWeather
            weatherCode={data.weatherCode}
            temperature={data.temperature}
          />
        )
      }
    </section>
  );
}

CurrentWeatherContainer.defaultProps = {
  className: '',
  location: {},
  testId: '',
};

CurrentWeatherContainer.propTypes = {
  className: PropTypes.string,
  testId: PropTypes.string,
  location: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
};
