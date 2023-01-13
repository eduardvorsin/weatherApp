import PropTypes from 'prop-types';
import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchingStatuses from '../../../redux/fetchingStatuses';
import selectDailyWeather from '../../../redux/selectors/selectDailyWeather/selectDailyWeather';
import fetchDailyWeather from '../../../redux/thunks/fetchDailyWeather/fetchDailyWeather';
import { normalizeDailyWeather } from '../../../utils/utils';
import ErrorInfo from '../../UI/ErrorInfo/ErrorInfo';
import List from '../../UI/List/List';
import Spinner from '../../UI/Spinner/Spinner';
import DailyWeather from '../DailyWeather/DailyWeather';

export default function DailyWeatherContainer({
  className,
  location,
  testId,
}) {
  const dispatch = useDispatch();
  const {
    data,
    loadingStatus,
  } = useSelector(selectDailyWeather);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      dispatch(fetchDailyWeather(location));
    }
  }, [location, dispatch]);

  const dailyWeather = useMemo(() => normalizeDailyWeather(data), [data]);

  return (

    <section
      className={`daily-weather__section daily-weather-section ${className}`}
      data-testid={testId}
    >
      <h2 className="daily-weather-section__title sr-only">
        Погода на неделю
      </h2>

      {loadingStatus === fetchingStatuses.loading && (
        <Spinner
          size={382}
        />
      )}

      {loadingStatus === fetchingStatuses.error && (
        <ErrorInfo
          message="Не удалось загрузить данные о погоде на текущую неделю"
          headingLevel={3}
        />
      )}

      {loadingStatus === fetchingStatuses.resolved
        && (
          <List
            items={dailyWeather}
            renderInItem={(value) => (
              <DailyWeather
                temperatureMin={value.temperatureMin}
                temperatureMax={value.temperatureMax}
                day={value.day}
                weatherCode={value.weatherCode}
              />
            )}
          />
        )}
    </section>
  );
}

DailyWeatherContainer.defaultProps = {
  className: '',
  location: {},
  testId: '',
};

DailyWeatherContainer.propTypes = {
  className: PropTypes.string,
  testId: PropTypes.string,
  location: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
};
