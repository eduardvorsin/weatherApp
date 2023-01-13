import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchingStatuses from '../../../redux/fetchingStatuses';
import selectGeocodingData from '../../../redux/selectors/selectGeocodingData/selectGeocodingData';
import fetchGeocoding from '../../../redux/thunks/fetchGeocoding/fetchGeocoding';
import ErrorInfo from '../../UI/ErrorInfo/ErrorInfo';
import Spinner from '../../UI/Spinner/Spinner';
import LocationInfo from '../LocationInfo/LocationInfo';

export default function LocationInfoContainer({
  className,
  location,
  testId,
}) {
  const dispatch = useDispatch();
  const {
    data,
    loadingStatus,
  } = useSelector(selectGeocodingData);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      dispatch(fetchGeocoding(location));
    }
  }, [location, dispatch]);

  return (
    <section
      className={`location__section location-section ${className}`}
      data-testid={testId}
    >
      <h2 className="location-section__title sr-only">
        Ваш город
      </h2>

      {loadingStatus === fetchingStatuses.loading
        && (
          <Spinner
            size={74}
          />
        )}
      {loadingStatus === fetchingStatuses.error
        && (
          <ErrorInfo
            message="Не удалось загрузить данные о вашем городе"
            headingLevel={3}
          />
        )}
      {loadingStatus === fetchingStatuses.resolved
        && (
          <LocationInfo
            text={data.city}
          />
        )}
    </section>
  );
}

LocationInfoContainer.defaultProps = {
  className: '',
  location: {},
  testId: '',
};

LocationInfoContainer.propTypes = {
  className: PropTypes.string,
  testId: PropTypes.string,
  location: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
};
