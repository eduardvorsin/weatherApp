import PropTypes from 'prop-types';
import useOnlineStatus from '../../../hooks/useOnlineStatus/useOnlineStatus';
import ErrorInfo from '../ErrorInfo/ErrorInfo';

export default function WithInternetConnection({
  children,
}) {
  const onlineStatus = useOnlineStatus();

  const lostConnectionIcon = (
    <svg
      viewBox="0 0 846.66 846.66"
    >
      <path d="M29.43 528.34c-27.24 0-27.24-41.41 0-41.41 89.85 0 162.71 72.85 162.71 162.71 0 27.23-41.42 27.23-41.42 0 0-66.99-54.3-121.3-121.29-121.3zm555.14 22.97c-18.51-19.9 11.75-48.05 30.26-28.15L651 561.99l36.17-38.83c18.51-19.9 48.76 8.25 30.25 28.15l-38.19 40.99 38.19 41c18.51 19.89-11.74 48.04-30.25 28.14L651 622.62l-36.17 38.82c-18.51 19.9-48.77-8.25-30.26-28.14l38.19-41-38.19-40.99zM651 405.64c103.08 0 186.66 83.57 186.66 186.66S754.09 778.97 651 778.97 464.34 695.39 464.34 592.3c0-55.59 24.54-107.86 67.15-143.39C449.32 243.52 250.68 109.1 29.43 109.1c-27.24 0-27.24-41.41 0-41.41 234.89 0 446.84 141.39 537.25 358.04 25.33-12.85 53.98-20.09 84.32-20.09zm0 41.41c-80.22 0-145.25 65.03-145.25 145.25S570.78 737.55 651 737.55s145.25-65.03 145.25-145.25S731.22 447.05 651 447.05zM29.43 296.22c-27.24 0-27.24-41.41 0-41.41 218.05 0 394.82 176.77 394.82 394.83 0 27.23-41.41 27.23-41.41 0 0-195.19-158.23-353.42-353.41-353.42z" fillRule="nonzero" fill="currentColor" />
    </svg>
  );

  if (onlineStatus === 'offline') {
    return (
      <ErrorInfo
        headingLevel={2}
        isCentered
        icon={lostConnectionIcon}
        message="Потеряно интернет соединение. Попробуйте подключиться позже"
      />
    );
  }

  return children;
}

WithInternetConnection.defaultProps = {
  children: null,
};

WithInternetConnection.propTypes = {
  children: PropTypes.element,
};
