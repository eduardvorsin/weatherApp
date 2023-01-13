import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchingStatuses from '../../../redux/fetchingStatuses';
import selectWind from '../../../redux/selectors/selectWind/selectWind';
import fetchWind from '../../../redux/thunks/fetchWind/fetchWind';
import ErrorInfo from '../../UI/ErrorInfo/ErrorInfo';
import Spinner from '../../UI/Spinner/Spinner';
import Wind from '../Wind/Wind';

export default function WindContainer({
  className,
  location,
  testId,
}) {
  const dispatch = useDispatch();
  const {
    data,
    loadingStatus,
  } = useSelector(selectWind);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      dispatch(fetchWind(location));
    }
  }, [location, dispatch]);

  return (
    <div
      className={`wind__section wind-section ${className}`}
      data-testid={testId}
    >
      {loadingStatus === fetchingStatuses.loading && (
        <Spinner
          size={246}
        />
      )}
      {loadingStatus === fetchingStatuses.error && (
        <ErrorInfo
          message="Не удалось загрузить данные о ветре"
          headingLevel={3}
        />
      )}
      {loadingStatus === fetchingStatuses.resolved
        && (
          <Wind
            windSpeed={data.speed}
            windDirectionAngle={data.directionAngle}
          />
        )}
    </div>
  );
}

WindContainer.defaultProps = {
  className: '',
  location: {},
  testId: '',
};

WindContainer.propTypes = {
  className: PropTypes.string,
  testId: PropTypes.string,
  location: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
};
