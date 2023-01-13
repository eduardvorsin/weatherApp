import './App.css';
import PropTypes from 'prop-types';
import LocationError from './UI/LocationError/LocationError';
import WithInternetConnectionAccess from './UI/WithInternetConnection/WithInternetConnection';
import WeatherBoard from './WeatherBoard/WeatherBoard';
import useLocation from '../hooks/useLocation/useLocation';

export default function App({
  testId,
}) {
  const [location, locationError] = useLocation();

  return (
    <div
      className="app"
      data-testid={testId}
    >
      <main className="app__main main">
        <h1 className="main__title sr-only">Weather App</h1>
        <WithInternetConnectionAccess>
          {locationError
            ? (<LocationError />)
            : (
              <WeatherBoard
                location={location}
              />
            )}
        </WithInternetConnectionAccess>
      </main>
    </div>
  );
}

App.defaultProps = {
  testId: '',
};

App.propTypes = {
  testId: PropTypes.string,
};
