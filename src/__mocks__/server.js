import { rest } from 'msw';
import { setupServer } from 'msw/node';
import mockGeocodingError from './geocodingError';
import mockWeatherError from './weatherError';

const isCurrentWeatherOrWindRequest = (searchParams) => (
  searchParams.get('current_weather') === 'true'
);

const isHourlyWeatherRequest = (searchParams) => {
  const currentParams = searchParams.getAll('hourly');
  return currentParams.includes('temperature_2m') && currentParams.includes('weathercode');
};

const isDailyWeatherRequest = (searchParams) => {
  const currentParams = searchParams.getAll('daily');
  return currentParams.includes('temperature_2m_max') && currentParams.includes('temperature_2m_min') && currentParams.includes('weathercode');
};

const isHumidityRequest = (searchParams) => {
  const currentParams = searchParams.getAll('hourly');
  return currentParams.includes('apparent_temperature') && currentParams.includes('relativehumidity_2m');
};

const currentWeatherData = {
  current_weather: {
    weathercode: 1,
    temperature: -6.7,
    winddirection: 128,
    windspeed: 1.64,
  },
};
const hourlyWeatherData = {
  hourly: {
    time: [
      '2022-12-27T03:00',
      '2022-12-27T04:00',
      '2022-12-27T05:00',
      '2022-12-27T06:00',
      '2022-12-27T07:00',
      '2022-12-27T08:00',
      '2022-12-27T09:00',
      '2022-12-27T10:00',
      '2022-12-27T11:00',
      '2022-12-27T12:00',
      '2022-12-27T13:00',
      '2022-12-27T14:00',
      '2022-12-27T15:00',
      '2022-12-27T16:00',
      '2022-12-27T17:00',
      '2022-12-27T18:00',
      '2022-12-27T19:00',
      '2022-12-27T20:00',
      '2022-12-27T21:00',
      '2022-12-27T22:00',
      '2022-12-27T23:00',
      '2022-12-28T00:00',
      '2022-12-28T01:00',
      '2022-12-28T02:00',
      '2022-12-28T03:00',
      '2022-12-28T04:00',
      '2022-12-28T05:00',
      '2022-12-28T06:00',
      '2022-12-28T07:00',
      '2022-12-28T08:00',
    ],
    temperature_2m: [
      -4.5, -4.4, -4.3, -4.5, -5.1, -5.6, -5.8, -6, -6.5, -6.8, -7, -6.4,
      -5.3, -4.3, -3.6, -3.4, -3.7, -4.4, -4.9, -5.3, -5.6, -5.8, -5.7, -5.5,
      -5.0, -4.5, -3.9, -3.1, -3.4, -4.9,
    ],
    weathercode: [1, 2, 3, 71, 71, 3, 3, 2, 2, 2, 1, 3, 71, 86, 1, 1, 3, 2, 2,
      71, 71, 3, 2, 1, 71, 2, 3, 1, 2, 71],
  },
};
const dailyWeatherData = {
  daily: {
    time: ['2022-12-26', '2022-12-27', '2022-12-29', '2022-12-30', '2022-12-31', '2023-01-01', '2023-01-02'],
    temperature_2m_max: [-9.4, -8, -7.3, -5, -6.7, -7.6, -9.8],
    temperature_2m_min: [-17.1, -15.5, -16.4, -17.5, -15.7, -16.3, -13.6],
    weathercode: [3, 2, 71, 2, 2, 3, 71],
  },
};
const humidityData = {
  hourly: {
    time: [
      '2022-12-27T00:00',
      '2022-12-27T01:00',
      '2022-12-27T02:00',
      '2022-12-27T03:00',
      '2022-12-27T04:00',
      '2022-12-27T05:00',
      '2022-12-27T06:00',
      '2022-12-27T07:00',
      '2022-12-27T08:00',
      '2022-12-27T09:00',
    ],
    apparent_temperature: [-17.4, -18, -18.6, -19.1, -19.5, -19, -17, -16, -15, 14],
    relativehumidity_2m: [81, 82, 83, 84, 85, 86, 71, 72, 73, 74],
  },
};
const geocodingData = {
  address: {
    city: 'Вестминстер',
    state_district: 'Большой Лондон',
    state: 'Англия',
    country: 'Великобритания',
    country_code: 'gb',
    'ISO3166-2-lvl4': 'GB-ENG',
    'ISO3166-2-lvl8': 'GB-WSM',
  },
};

const handlers = [
  rest.get('https://api.open-meteo.com/v1/forecast', (req, res, ctx) => {
    const { searchParams } = req.url;

    if (isCurrentWeatherOrWindRequest(searchParams)) {
      return res(ctx.json(currentWeatherData), ctx.delay(150));
    }
    if (isHourlyWeatherRequest(searchParams)) {
      return res(ctx.json(hourlyWeatherData), ctx.delay(150));
    }
    if (isDailyWeatherRequest(searchParams)) {
      return res(ctx.json(dailyWeatherData), ctx.delay(150));
    }
    if (isHumidityRequest(searchParams)) {
      return res(ctx.json(humidityData), ctx.delay(150));
    }

    return res(ctx.json('unknown request'), ctx.delay(150));
  }),
  rest.get('https://nominatim.openstreetmap.org/reverse', (_, res, ctx) => (
    res(ctx.json(geocodingData), ctx.delay(150))
  )),
];

export const errorHandlers = [
  rest.get('https://nominatim.openstreetmap.org/reverse', (_, res, ctx) => res(ctx.status(404), ctx.json(mockGeocodingError), ctx.delay(150))),
  rest.get('https://api.open-meteo.com/v1/forecast', (_, res, ctx) => res(ctx.status(404), ctx.json(mockWeatherError), ctx.delay(150))),
];

const server = setupServer(...handlers);

export const setupServerWithErrors = () => server.use(...errorHandlers);

export default server;
