import PropTypes from 'prop-types';
import { getWindDirectionNameByAngle } from '../../../utils/utils';
import classes from './Wind.module.css';

export default function Wind({
  windSpeed,
  windDirectionAngle,
  className,
  testId,
}) {
  const windDirectionName = getWindDirectionNameByAngle(windDirectionAngle);

  return (
    <div
      className={`${classes.wind} ${className}`}
      data-testid={testId}
    >
      <h3 className={classes.wind__title}>
        Ветер
      </h3>
      <div className={classes.wind__content}>
        <svg
          className={classes.wind__icon}
          xmlns="http://www.w3.org/2000/svg"
          viewBox=" 0 0 850 850"
          fill="none"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M464.387 409.738c7.981-9.277 12.804-21.348 12.804-34.546 0-29.271-23.729-53-53-53s-53 23.729-53 53a52.769 52.769 0 0 0 10.626 31.84l-28.143 31.105-1.441 1.593-.208 2.138-29.964 307.63h-34.567v13h274.5v-13h-34.066l-29.964-307.63-.209-2.138-1.441-1.593-28.5-31.5-3.427 3.101Zm-5.953 5.909a52.787 52.787 0 0 1-34.243 12.545 52.781 52.781 0 0 1-33.325-11.785l-26.111 28.859-29.633 304.232h179.744l-29.633-304.232-26.799-29.619Z"
            clipRule="evenodd"
          />
          <path
            className={classes.wind__blades}
            fill="currentColor"
            fillRule="evenodd"
            d="m710.884 169.192-4.597 4.596-4 4-146.999 147-1.5 1.5-4.597 4.596-4.596-4.596-72-72-4.596-4.596 4.596-4.596 2-2 118-118 32.5-32.5L629.691 88l4.597 4.596 12.499 12.5 59.5 59.5 4.597 4.596Zm-18.385 0-54.904-54.903-7.904-7.904-27.903 27.903-115.404 115.404 62.807 62.808 143.308-143.308ZM344.788 462.788l.193-.193.5.5 79.211-79.211 79.903 79.904.25-.25.053.053 9.193-9.193-79.957-79.956 79.154-79.154-9.193-9.192-.807.807-.5-.5-78.346 78.346-78.154-78.153-9.192 9.192 2.057 2.057-.25.25 76.096 76.097-79.403 79.403 9.192 9.193ZM138 579.691l4.596-4.596 4-4 147-146.999 1.5-1.5 4.596-4.597 4.596 4.597 72 71.999 4.596 4.597-4.596 4.596-2 2-118 117.999-32.5 32.5-4.596 4.597-4.596-4.597-12.5-12.5-59.5-59.499-4.596-4.597Zm18.385 0 54.903 54.904 7.904 7.904 27.904-27.904L362.5 499.192l-62.808-62.808-143.307 143.307ZM220.192 89l4.596 4.596 4 4 147 147 1.5 1.5 4.596 4.596-4.596 4.596-72 72-4.596 4.596-4.596-4.596-2-2-118-118-32.5-32.5-4.596-4.596 4.596-4.596 12.5-12.5 59.5-59.5L220.192 89Zm0 18.385-54.903 54.903-7.904 7.904 27.903 27.904L300.692 313.5l62.808-62.808-143.308-143.307Zm410.499 553.999-4.596-4.597-4-4-147-146.999-1.5-1.5-4.596-4.596 4.596-4.597 72-71.999 4.596-4.597 4.597 4.597 2 2 117.999 117.999 32.5 32.5 4.597 4.596-4.597 4.597-12.5 12.5-59.499 59.499-4.597 4.597Zm0-18.385 54.904-54.904 7.904-7.904-27.904-27.903-115.404-115.404-62.807 62.808 143.307 143.307Z"
            clipRule="evenodd"
          />
        </svg>
        <div className={classes.wind__text}>
          <p className={classes.wind__speed}>
            Скорость:
            {' '}
            {windSpeed}
            м/с
          </p>
          <p className={classes.wind__direction}>
            Направление:
            {' '}
            {windDirectionName}
          </p>
        </div>
      </div>
    </div>
  );
}

Wind.defaultProps = {
  className: '',
  windSpeed: 0,
  windDirectionAngle: 0,
  testId: '',
};

Wind.propTypes = {
  className: PropTypes.string,
  windSpeed: PropTypes.number,
  windDirectionAngle: PropTypes.number,
  testId: PropTypes.string,
};
