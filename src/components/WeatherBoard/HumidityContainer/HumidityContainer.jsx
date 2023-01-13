import PropTypes from 'prop-types';
import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchingStatuses from '../../../redux/fetchingStatuses';
import selectHumidity from '../../../redux/selectors/selectHumidity/selectHumidity';
import fetchHumidity from '../../../redux/thunks/fetchHumidity/fetchHumidity';
import { normalizeHumidity } from '../../../utils/utils';
import ErrorInfo from '../../UI/ErrorInfo/ErrorInfo';
import Spinner from '../../UI/Spinner/Spinner';
import Humidity from '../Humidity/Humidity';

export default function HumidityContainer({
  className,
  location,
  testId,
}) {
  const dispatch = useDispatch();
  const {
    data,
    loadingStatus,
  } = useSelector(selectHumidity);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      dispatch(fetchHumidity(location));
    }
  }, [location, dispatch]);

  const humidity = useMemo(() => normalizeHumidity(data), [data]);
  return (
    <div
      className={`humidity__section humidity-section ${className}`}
      data-testid={testId}
    >
      {loadingStatus === fetchingStatuses.loading && (
        <Spinner
          size={257}
        />
      )}
      {loadingStatus === fetchingStatuses.error && (
        <ErrorInfo
          message="Не удалось загрузить данные об относительной влажности"
          headingLevel={3}
        />
      )}
      {loadingStatus === fetchingStatuses.resolved
        && (
          <Humidity
            apparentTemperature={humidity.apparentTemperature}
            relativeHumidity={humidity.relativeHumidity}
          />
        )}
    </div>
  );
}

HumidityContainer.defaultProps = {
  className: '',
  location: {},
  testId: '',
};

HumidityContainer.propTypes = {
  className: PropTypes.string,
  testId: PropTypes.string,
  location: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
};
