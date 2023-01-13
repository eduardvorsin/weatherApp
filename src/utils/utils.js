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

export const getIconPathByCode = (code, basePath = '/assets/icons') => {
  if (typeof basePath !== 'string') {
    throw new Error('basePath parameter should be a string type');
  }

  if (typeof code !== 'number') {
    throw new Error('code parameter should be a number type');
  }

  let path = '';

  if (code === 0 || code === 1) {
    path += 'sunny';
  } else if (code === 2 || code === 3) {
    path += 'cloudy';
  } else if (code === 45) {
    path += 'fog';
  } else if ((code >= 48 && code <= 67) || (code >= 80 && code <= 86)) {
    path += 'rain';
  } else if (code >= 71 && code <= 77) {
    path += 'snow';
  } else if (code >= 95 && code <= 99) {
    path += 'thunderstorm';
  } else {
    throw new Error('recived unknown weather code');
  }

  return `${basePath}/${path}.svg`;
};

export const getFullDayDescription = (date) => {
  if (Number.isNaN(new Date(date).getTime())) {
    throw new Error('invalid date string passed');
  }

  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  };

  return new Intl.DateTimeFormat('ru-RU', options).format(new Date(date));
};

export const getWindDirectionNameByAngle = (angle) => {
  if (Number.isNaN(+angle)) throw Error('angle value must be a number');

  if (angle === 0 || angle === 360) return 'Север';
  if (angle > 0 && angle < 90) return 'Северо-восток';
  if (angle === 90) return 'Восток';
  if (angle > 90 && angle < 180) return 'Юго-восток';
  if (angle === 180) return 'Юг';
  if (angle > 180 && angle < 270) return 'Юго-Запад';
  if (angle === 270) return 'Запад';
  if (angle > 270 && angle < 360) return 'Северо-запад';

  return 'Неизвестно';
};

export const isObject = (value) => (
  typeof value === 'object' && !Array.isArray(value) && value !== null
);

export const createReverseGeocodingURL = (queries = {
  lat: '51.47',
  lon: '0.00',
  zoom: '10',
  format: 'jsonv2',
  'accept-language': 'ru',
}, baseUrl = 'https://nominatim.openstreetmap.org/reverse') => {
  if (!isObject(queries)) {
    throw new Error('the queries parameter must be an object');
  }
  if (typeof baseUrl !== 'string') {
    throw new Error('baseUrl parameter should be a string type');
  }

  const url = new URL(baseUrl);

  Object.keys(queries).forEach((param) => {
    if (!Array.isArray(param)) {
      url.searchParams.append(param, queries[param]);
    }
  });

  return url;
};
