import mockLocation from '../../__mocks__/location';
import WeatherAPI from './WeatherAPI';

global.fetch = jest.fn();

const mockError = new Error('mock error');

describe('fetchWeather tests', () => {
  it('the passed value is not a string or an instance of the class URL', () => {
    expect(async () => {
      await WeatherAPI.fetchWeather(1);
    }).rejects.toThrow('the url parameter must be either a string or an instance of the class URL');
  });

  it('mock incorrect url', async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 404,
      json: () => Promise.resolve({
        reason: mockError.message,
      }),
    });

    const result = await WeatherAPI.fetchWeather('abc');

    expect(result.message).toBe('HTTP 404 error: mock error');
  });

  it('a mock fetch request returns an mock result object', async () => {
    const expectedResult = {
      temperature: -31,
      time: '19:50',
    };

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(expectedResult),
    });

    const result = await WeatherAPI.fetchWeather('bca');

    expect(result).toEqual(expectedResult);
  });
});

describe('getCurrentWeather tests', () => {
  it('the passed value is not an object', () => {
    expect(async () => {
      await WeatherAPI.getCurrentWeather([]);
    }).rejects.toThrow('the location parameter must be an object');
  });

  it('the passed object is empty', () => {
    expect(async () => {
      await WeatherAPI.getCurrentWeather({});
    }).rejects.toThrow('the passed object must have the longitude & latitude properties');
  });

  it('one of the properties is missing in the passed object', () => {
    expect(async () => {
      await WeatherAPI.getCurrentWeather({
        latitude: mockLocation.latitude,
      });
    }).rejects.toThrow('the passed object must have the longitude & latitude properties');
  });

  it('a mock fetch request returns a weather object', async () => {
    const mockData = {
      current_weather: {
        weathercode: 3,
        temperature: -25,
      },
    };

    const expectedResult = {
      weatherCode: mockData.current_weather.weathercode,
      temperature: mockData.current_weather.temperature,
    };

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await WeatherAPI.getCurrentWeather(mockLocation);

    expect(result).toEqual(expectedResult);
  });
});

describe('getHourlyWeather tests', () => {
  it('the passed value is not an object', () => {
    expect(async () => {
      await WeatherAPI.getHourlyWeather([]);
    }).rejects.toThrow('the location parameter must be an object');
  });

  it('the passed object is empty', () => {
    expect(async () => {
      await WeatherAPI.getHourlyWeather({});
    }).rejects.toThrow('the passed object must have the longitude & latitude properties');
  });

  it('one of the properties is missing in the passed object', () => {
    expect(async () => {
      await WeatherAPI.getHourlyWeather({
        latitude: mockLocation.latitude,
      });
    }).rejects.toThrow('the passed object must have the longitude & latitude properties');
  });

  it('a mock fetch request returns a weather object', async () => {
    const mockData = {
      hourly: {
        temperature_2m: [-5.7, -5.5, -5.6],
        time: ['2022-12-31T00:00', '2022-12-31T01:00', '2022-12-31T02:00'],
        weathercode: [3, 3, 71],
      },
    };

    const expectedResult = {
      ...mockData.hourly,
    };

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await WeatherAPI.getHourlyWeather(mockLocation);

    expect(result).toEqual(expectedResult);
  });
});

describe('getDailyWeather tests', () => {
  it('the passed value is not an object', () => {
    expect(async () => {
      await WeatherAPI.getDailyWeather([]);
    }).rejects.toThrow('the location parameter must be an object');
  });

  it('the passed object is empty', () => {
    expect(async () => {
      await WeatherAPI.getDailyWeather({});
    }).rejects.toThrow('the passed object must have the longitude & latitude properties');
  });

  it('one of the properties is missing in the passed object', () => {
    expect(async () => {
      await WeatherAPI.getDailyWeather({
        latitude: mockLocation.latitude,
      });
    }).rejects.toThrow('the passed object must have the longitude & latitude properties');
  });

  it('a mock fetch request returns a weather object', async () => {
    const mockData = {
      daily: {
        time: ['2022-12-26', '2022-12-27', '2022-12-28'],
        temperature_2m_max: [-9.4, -8, -7.3],
        temperature_2m_min: [-17.1, -15.5, -16.4],
        weathercode: [3, 2, 71],
      },
    };

    const expectedResult = {
      ...mockData.daily,
    };

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await WeatherAPI.getDailyWeather(mockLocation);

    expect(result).toEqual(expectedResult);
  });
});

describe('getWindData tests', () => {
  it('the passed value is not an object', () => {
    expect(async () => {
      await WeatherAPI.getWindData([]);
    }).rejects.toThrow('the location parameter must be an object');
  });

  it('the passed object is empty', () => {
    expect(async () => {
      await WeatherAPI.getWindData({});
    }).rejects.toThrow('the passed object must have the longitude & latitude properties');
  });

  it('one of the properties is missing in the passed object', () => {
    expect(async () => {
      await WeatherAPI.getWindData({
        latitude: mockLocation.latitude,
      });
    }).rejects.toThrow('the passed object must have the longitude & latitude properties');
  });

  it('a mock fetch request returns a weather object', async () => {
    const mockData = {
      current_weather: {
        windspeed: 10.1,
        directionAngle: 270,
      },
    };

    const expectedResult = {
      speed: mockData.current_weather.windspeed,
      directionAngle: mockData.current_weather.winddirection,
    };

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await WeatherAPI.getWindData(mockLocation);

    expect(result).toEqual(expectedResult);
  });
});

describe('getHumidityData tests', () => {
  it('the passed value is not an object', () => {
    expect(async () => {
      await WeatherAPI.getHumidityData([]);
    }).rejects.toThrow('the location parameter must be an object');
  });

  it('the passed object is empty', () => {
    expect(async () => {
      await WeatherAPI.getHumidityData({});
    }).rejects.toThrow('the passed object must have the longitude & latitude properties');
  });

  it('one of the properties is missing in the passed object', () => {
    expect(async () => {
      await WeatherAPI.getHumidityData({
        latitude: mockLocation.latitude,
      });
    }).rejects.toThrow('the passed object must have the longitude & latitude properties');
  });

  it('a mock fetch request returns a weather object', async () => {
    const mockData = {
      hourly: {
        apparent_temperature: [-10.1, -10.2, -10.5],
        relativehumidity_2m: [86, 86, 87],
        time: ['2022-12-31T00:00', '2022-12-31T01:00', '2022-12-31T02:00'],
      },
    };

    const expectedResult = {
      ...mockData.hourly,
    };

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await WeatherAPI.getHumidityData(mockLocation);

    expect(result).toEqual(expectedResult);
  });
});
