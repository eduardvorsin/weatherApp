import { useEffect, useState } from 'react';

const useLocation = () => {
  const [location, setLocation] = useState();
  const [locationError, setLocationError] = useState();

  useEffect(() => {
    const getUserLocation = () => {
      navigator.geolocation.getCurrentPosition((currentLocation) => {
        const { latitude, longitude } = currentLocation.coords;
        setLocation({
          latitude,
          longitude,
        });
      }, (error) => {
        setLocationError(error.message);
      });
    };

    getUserLocation();
  }, []);

  return [location, locationError];
};

export default useLocation;
