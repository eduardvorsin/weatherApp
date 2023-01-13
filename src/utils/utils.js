export const isCorrectHeadingLevel = (level) => {
  if (Number.isNaN(+level)) {
    throw new Error('the heading level must be a number');
  }

  if (level < 1 || level > 6) {
    throw new Error('the heading level must be at least 1 and not more than 6');
  }

  if (!Number.isInteger(level)) {
    throw new Error('the header level must be an integer');
  }

  return true;
};

export const getWeatherStatusByCode = (code) => {
  if (typeof code !== 'number') {
    throw new Error('code parameter should be a number type');
  }

  let status = '';

  if (code === 0 || code === 1) {
    status = 'ясно';
  } else if (code === 2 || code === 3) {
    status = 'пасмурно';
  } else if (code === 45) {
    status = 'туман';
  } else if ((code >= 48 && code <= 67) || (code >= 80 && code <= 86)) {
    status = 'дождь';
  } else if (code >= 71 && code <= 77) {
    status = 'снег';
  } else if (code >= 95 && code <= 99) {
    status = 'гроза';
  } else {
    throw new Error('recived unknown weather code');
  }

  return status;
};
