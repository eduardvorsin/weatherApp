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

export const createWeatherURL = (queries = {
  latitude: '51.47',
  longitude: '0.00',
  current_weather: false,
  hourly: ['windspeed_10m', 'temperature_2m'],
}, baseUrl = 'https://api.open-meteo.com/v1/forecast') => {
  if (!isObject(queries)) {
    throw new Error('the queries parameter must be an object');
  }
  if (typeof baseUrl !== 'string') {
    throw new Error('baseUrl parameter should be a string type');
  }

  const url = new URL(baseUrl);
  url.searchParams.append('timezone', 'auto');
  url.searchParams.append('windspeed_unit', 'ms');

  Object.keys(queries).forEach((key) => {
    if (queries[key] instanceof Array) {
      queries[key].forEach((parameter) => {
        url.searchParams.append(key, parameter);
      });
    } else {
      url.searchParams.append(key, queries[key]);
    }
  });

  return url;
};

export const getCurrentISOTimeIndex = (timeArr) => {
  if (!Array.isArray(timeArr)) throw new Error('passed argument must be an array');
  if (timeArr.length === 0) return null;

  const currentDate = new Date();
  currentDate.setMinutes(0, 0);
  const currentISOTime = currentDate.toISOString().slice(0, -8);

  return timeArr.findIndex((timeMoment) => (
    timeMoment === currentISOTime
  ));
};

export const normalizeDailyWeather = (data) => {
  if (!isObject(data)) {
    throw new Error('the data parameter must be an object');
  }
  if (Object.keys(data).length === 0) return null;

  const daysInWeek = 7;
  const dailyWeather = [];

  for (let i = 1; i < daysInWeek; i += 1) {
    const weather = {
      id: data.time[i],
      day: data.time[i],
      temperatureMin: data.temperature_2m_min[i],
      temperatureMax: data.temperature_2m_max[i],
      weatherCode: data.weathercode[i],
    };

    dailyWeather.push(weather);
  }

  return dailyWeather;
};

export const normalizeHours = (data) => {
  if (!data || data.length === 0) return null;

  const hours = Object.keys(data[0].data);
  return hours.map((timeMoment) => ({ name: timeMoment }));
};

export const normalizeHourlyWeather = (data) => {
  if (!isObject(data)) {
    throw new Error('the data parameter must be an object');
  }

  if (Object.keys(data).length === 0) return null;

  const hoursInDay = 24;
  const currentHour = new Date().getHours();
  const hourlyWeather = [{ id: 0, data: {} }];

  const startIndex = getCurrentISOTimeIndex(data.time);

  if (startIndex < 0) return null;

  for (let i = 0; i < hoursInDay; i += 1) {
    const nextHour = currentHour + i;
    const time = nextHour < hoursInDay
      ? nextHour
      : Math.abs(hoursInDay - nextHour);

    hourlyWeather[0].data[`${time}:00`] = {
      temperature: data.temperature_2m[startIndex + i],
      weatherCode: data.weathercode[startIndex + i],
    };
  }

  return hourlyWeather;
};

export const normalizeHumidity = (data) => {
  if (!isObject(data)) {
    throw new Error('the data parameter must be an object');
  }
  if (Object.keys(data).length === 0) return null;

  const currentTimeIndex = getCurrentISOTimeIndex(data.time);

  if (currentTimeIndex < 0) return null;

  const apparentTemperature = data.apparent_temperature[currentTimeIndex];
  const relativeHumidity = data.relativehumidity_2m[currentTimeIndex];

  return {
    apparentTemperature,
    relativeHumidity,
  };
};
