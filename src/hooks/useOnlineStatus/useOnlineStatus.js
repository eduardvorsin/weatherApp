import { useEffect, useState } from 'react';

export default function useOnlineStatus() {
  const [onlineStatus, setOnlineStatus] = useState();

  useEffect(() => {
    const onlineStatusHandler = (e) => {
      setOnlineStatus(e.type);
    };

    window.addEventListener('online', onlineStatusHandler);
    window.addEventListener('offline', onlineStatusHandler);

    return () => {
      window.removeEventListener('online', onlineStatusHandler);
      window.removeEventListener('offline', onlineStatusHandler);
    };
  }, []);

  return onlineStatus;
}
