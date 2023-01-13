import PropTypes from 'prop-types';
import { isCorrectHeadingLevel } from '../../../utils/utils';
import classes from './ErrorInfo.module.css';

export default function ErrorInfo({
  className,
  message,
  icon,
  testId,
  isCentered,
  headingLevel,
}) {
  const centerClass = isCentered ? `${classes['error-info--center']}` : '';
  const Heading = isCorrectHeadingLevel(headingLevel) ? `h${headingLevel}` : 'h6';

  return (
    <div
      className={`${classes['error-info']} ${className} ${centerClass}`}
      data-testid={testId}
      role="alert"
    >
      {icon && (
        <div
          className={classes['error-info__icon-wrapper']}
        >
          {icon}
        </div>
      )}

      <Heading
        className={classes['error-info__description']}
      >
        {message}
      </Heading>
    </div>
  );
}

ErrorInfo.defaultProps = {
  className: '',
  message: 'default message',
  icon: null,
  testId: '',
  isCentered: false,
  headingLevel: 6,
};

ErrorInfo.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  icon: PropTypes.element,
  testId: PropTypes.string,
  isCentered: PropTypes.bool,
  headingLevel: PropTypes.number,
};
