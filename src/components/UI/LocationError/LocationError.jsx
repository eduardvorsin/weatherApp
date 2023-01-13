import PropTypes from 'prop-types';
import ErrorInfo from '../ErrorInfo/ErrorInfo';

export default function LocationError({
  testId
}) {
  const noAccessLocationIcon = (
    <svg
      viewBox="0 0 50 50"
      fill="none"
    >
      <path strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.765" stroke="currentColor" d="M40 17c0 13.604-15 31-15 31S10 30.928 10 17c0-8.285 6.715-15 15-15 8.284 0 15 6.715 15 15Z" />
      <path strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.765" stroke="currentColor" d="M25 24a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" />
      <path strokeLinecap="round" strokeWidth="1.76" stroke="currentColor" d="M10 2.5 40 48" />
    </svg>
  );

  return (
    <ErrorInfo
      testId={testId}
      headingLevel={2}
      isCentered
      icon={noAccessLocationIcon}
      message="Нет доступа к вашему местоположению, попробуйте предоставить доступ и перезагрузить страницу"
    />
  );
}

LocationError.defaultProps = {
  testId: '',
};

LocationError.propTypes = {
  testId: PropTypes.string,
};
