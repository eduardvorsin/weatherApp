import PropTypes from 'prop-types';
import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchingStatuses from '../../../redux/fetchingStatuses';
import selectHourlyWeather from '../../../redux/selectors/selectHourlyWeather/selectHourlyWeather';
import fetchHourlyWeather from '../../../redux/thunks/fetchHourlyWeather/fetchHourlyWeather';
import { normalizeHourlyWeather, normalizeHours } from '../../../utils/utils';
import ErrorInfo from '../../UI/ErrorInfo/ErrorInfo';
import Spinner from '../../UI/Spinner/Spinner';
import Table from '../../UI/Table/Table';
import HourlyWeather from '../HourlyWeather/HourlyWeather';

export default function HourlyWeatherContainer({
  className,
  location,
  testId,
}) {
  const dispatch = useDispatch();
  const {
    data,
    loadingStatus,
  } = useSelector(selectHourlyWeather);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      dispatch(fetchHourlyWeather(location));
    }
  }, [location, dispatch]);

  const content = useMemo(() => normalizeHourlyWeather(data), [data]);
  const hours = useMemo(() => normalizeHours(content), [content]);

  return (
    <section
      className={`hourly-weather__section hourly-weather-section ${className}`}
      data-testid={testId}
    >
      <h2 className="hourly-weather-section__title sr-only">
        Погода на ближайщие 24 часа
      </h2>

      {loadingStatus === fetchingStatuses.loading
        && (
          <Spinner
            size={207}
          />
        )}

      {loadingStatus === fetchingStatuses.error
        && (
          <ErrorInfo
            message="Не удалось загрузить данные о погоде на ближайщие 24 часа"
            headingLevel={3}
          />
        )}

      {loadingStatus === fetchingStatuses.resolved
        && (
          <Table
            headerCells={hours}
            dataRows={content}
            renderInDataCell={
              (_, value) => (
                <HourlyWeather
                  temperature={value.temperature}
                  weatherCode={value.weatherCode}
                />
              )
            }
          />
        )}
    </section>
  );
}

HourlyWeatherContainer.defaultProps = {
  className: '',
  location: {},
  testId: '',
};

HourlyWeatherContainer.propTypes = {
  className: PropTypes.string,
  testId: PropTypes.string,
  location: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
};
