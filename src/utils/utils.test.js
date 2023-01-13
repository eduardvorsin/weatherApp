import {
  createReverseGeocodingURL,
  createWeatherURL,
  getCurrentISOTimeIndex,
  getFullDayDescription,
  getIconPathByCode,
  getWeatherStatusByCode,
  getWindDirectionNameByAngle,
  isCorrectHeadingLevel,
  isObject,
  normalizeDailyWeather,
  normalizeHourlyWeather,
  normalizeHours,
  normalizeHumidity,
} from './utils';

describe('getCurrentISOTimeIndex tests', () => {
  it('not an array passed', () => {
    expect(() => {
      getCurrentISOTimeIndex({});
    }).toThrow('passed argument must be an array');
  });

  it('an empty array was passed', () => {
    expect(getCurrentISOTimeIndex([])).toBeNull();
  });

  it('The necessary value was not found in the passed array', () => {
    const mockTimes = [
      '2022-12-27T03:35',
      '2022-12-27T04:35',
      '2022-12-27T05:35',
    ];
    expect(getCurrentISOTimeIndex(mockTimes)).toBe(-1);
  });
  it('The necessary value was found in the passed array', () => {
    const currentDate = new Date();
    currentDate.setMinutes(0, 0);
    const currentISOTime = currentDate.toISOString().slice(0, -8);
    const mockTimes = [
      '2022-12-27T03:35',
      '2022-12-27T04:35',
      currentISOTime,
      '2022-12-27T05:35',
    ];

    expect(getCurrentISOTimeIndex(mockTimes)).toBe(2);
  });
});

describe('getIconPathByCode tests', () => {
  it('when the passed code is 0 or 1', () => {
    expect(getIconPathByCode(0)).toMatch('sunny');
    expect(getIconPathByCode(1)).toMatch('sunny');
  });

  it('when the passed code is 2 or 3', () => {
    expect(getIconPathByCode(2)).toMatch('cloudy');
    expect(getIconPathByCode(3)).toMatch('cloudy');
  });

  it('when the passed code is 45', () => {
    expect(getIconPathByCode(45)).toMatch('fog');
  });

  it('when the passed code is in the range from 48 to 67 or from 80 to 86', () => {
    expect(getIconPathByCode(49)).toMatch('rain');
    expect(getIconPathByCode(81)).toMatch('rain');
  });

  it('when the passed code is in the range from 71 to 77', () => {
    expect(getIconPathByCode(72)).toMatch('snow');
  });

  it('when the passed code is in the range from 95 to 99', () => {
    expect(getIconPathByCode(96)).toMatch('thunderstorm');
  });

  it('when the passed code does not fall into any of the ranges of values', () => {
    expect(() => {
      getIconPathByCode(1000);
    }).toThrow('recived unknown weather code');
  });

  it('when the basePath parameter is not a string', () => {
    expect(() => {
      getIconPathByCode(1, 45);
    }).toThrow('basePath parameter should be a string type');
  });

  it('when the code parameter is not a number', () => {
    expect(() => {
      getIconPathByCode('abc');
    }).toThrow('code parameter should be a number type');
  });
});

describe('getWeatherStatusByCode tests', () => {
  it('when the passed code is 0 or 1', () => {
    expect(getWeatherStatusByCode(0)).toMatch('ясно');
    expect(getWeatherStatusByCode(1)).toMatch('ясно');
  });

  it('when the passed code is 2 or 3', () => {
    expect(getWeatherStatusByCode(2)).toMatch('пасмурно');
    expect(getWeatherStatusByCode(3)).toMatch('пасмурно');
  });

  it('when the passed code is 45', () => {
    expect(getWeatherStatusByCode(45)).toMatch('туман');
  });

  it('when the transmitted is in the range from 48 to 67 or from 80 to 86', () => {
    expect(getWeatherStatusByCode(49)).toMatch('дождь');
    expect(getWeatherStatusByCode(81)).toMatch('дождь');
  });

  it('when the transmitted is in the range from 71 to 77', () => {
    expect(getWeatherStatusByCode(72)).toMatch('снег');
  });

  it('when the transmitted is in the range from 95 to 99', () => {
    expect(getWeatherStatusByCode(96)).toMatch('гроза');
  });

  it('when the passed code does not fall into any of the ranges of values', () => {
    expect(() => {
      getWeatherStatusByCode(1500);
    }).toThrow('recived unknown weather code');
  });

  it('when the code parameter is not a number', () => {
    expect(() => {
      getWeatherStatusByCode('abc');
    }).toThrow('code parameter should be a number type');
  });
});

describe('createWeatherURL tests', () => {
  it('the passed parameter queries is not an object', () => {
    expect(() => {
      createWeatherURL(['d']);
    }).toThrow('the queries parameter must be an object');
  });

  it('the passed parameter queries is an empty object', () => {
    const expectedURLString = 'https://api.open-meteo.com/v1/forecast?timezone=auto&windspeed_unit=ms';

    const resultURL = createWeatherURL({});

    expect(resultURL.href).toMatch(expectedURLString);
  });

  it('one of the properties of quieries is an array', () => {
    const expectedURLString = 'https://api.open-meteo.com/v1/forecast?timezone=auto&windspeed_unit=ms&daily=temperature_2m_min&daily=temperature_2m_max';

    const resultURL = createWeatherURL({
      daily: ['temperature_2m_min', 'temperature_2m_max'],
    });

    expect(resultURL.href).toMatch(expectedURLString);
  });

  it('queries properties are not arrays', () => {
    const expectedURLString = 'https://api.open-meteo.com/v1/forecast?timezone=auto&windspeed_unit=ms&longitude=1.23';

    const resultURL = createWeatherURL({
      longitude: 1.23,
    });

    expect(resultURL.href).toMatch(expectedURLString);
  });

  it('the baseUrl parameter is not a string', () => {
    expect(() => {
      createWeatherURL({}, 1);
    }).toThrow('baseUrl parameter should be a string type');
  });
});

describe('createReverseGeocodingURL tests', () => {
  it('the passed parameter queries is not an object', () => {
    expect(() => {
      createReverseGeocodingURL(['d']);
    }).toThrow('the queries parameter must be an object');
  });

  it('the passed parameter queries is an empty object', () => {
    const expectedURLString = 'https://nominatim.openstreetmap.org/reverse';

    const resultURL = createReverseGeocodingURL({});

    expect(resultURL.href).toMatch(expectedURLString);
  });

  it('the queries property is an array', () => {
    const expectedURLString = 'https://nominatim.openstreetmap.org/reverse';

    const resultURL = createReverseGeocodingURL({
      lon: [1.23, 2],
    });

    expect(resultURL.href).toMatch(expectedURLString);
  });

  it('the queries property is not an array', () => {
    const expectedURLString = 'https://nominatim.openstreetmap.org/reverse?lon=1.23&lat=45.6';

    const resultURL = createReverseGeocodingURL({
      lon: 1.23,
      lat: 45.6,
    });

    expect(resultURL.href).toMatch(expectedURLString);
  });

  it('the baseUrl parameter is not a string', () => {
    expect(() => {
      createReverseGeocodingURL({}, 1);
    }).toThrow('baseUrl parameter should be a string type');
  });
});

describe('normalizeHourlyWeather tests', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date('2022-12-27T09:00:00'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('the passed value is not an object', () => {
    expect(() => {
      normalizeHourlyWeather(['d']);
    }).toThrow('the data parameter must be an object');
  });

  it('the passed value is an empty object', () => {
    expect(normalizeHourlyWeather({})).toBeNull();
  });

  it('startIndex is less than 0', () => {
    const mockTimes = [
      '2022-12-27T03:35',
      '2022-12-27T04:35',
      '2022-12-27T05:35',
    ];
    expect(normalizeHourlyWeather({ time: mockTimes })).toBeNull();
  });

  it('the correct weather array is returned', () => {
    const initialData = {
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
    };
    const expectedData = [{
      id: 0,
      data: {
        '9:00': {
          temperature: initialData.temperature_2m[0],
          weatherCode: initialData.weathercode[0],
        },
        '10:00': {
          temperature: initialData.temperature_2m[1],
          weatherCode: initialData.weathercode[1],
        },
        '11:00': {
          temperature: initialData.temperature_2m[2],
          weatherCode: initialData.weathercode[2],
        },
        '12:00': {
          temperature: initialData.temperature_2m[3],
          weatherCode: initialData.weathercode[3],
        },
        '13:00': {
          temperature: initialData.temperature_2m[4],
          weatherCode: initialData.weathercode[4],
        },
        '14:00': {
          temperature: initialData.temperature_2m[5],
          weatherCode: initialData.weathercode[5],
        },
        '15:00': {
          temperature: initialData.temperature_2m[6],
          weatherCode: initialData.weathercode[6],
        },
        '16:00': {
          temperature: initialData.temperature_2m[7],
          weatherCode: initialData.weathercode[7],
        },
        '17:00': {
          temperature: initialData.temperature_2m[8],
          weatherCode: initialData.weathercode[8],
        },
        '18:00': {
          temperature: initialData.temperature_2m[9],
          weatherCode: initialData.weathercode[9],
        },
        '19:00': {
          temperature: initialData.temperature_2m[10],
          weatherCode: initialData.weathercode[10],
        },
        '20:00': {
          temperature: initialData.temperature_2m[11],
          weatherCode: initialData.weathercode[11],
        },
        '21:00': {
          temperature: initialData.temperature_2m[12],
          weatherCode: initialData.weathercode[12],
        },
        '22:00': {
          temperature: initialData.temperature_2m[13],
          weatherCode: initialData.weathercode[13],
        },
        '23:00': {
          temperature: initialData.temperature_2m[14],
          weatherCode: initialData.weathercode[14],
        },
        '0:00': {
          temperature: initialData.temperature_2m[15],
          weatherCode: initialData.weathercode[15],
        },
        '1:00': {
          temperature: initialData.temperature_2m[16],
          weatherCode: initialData.weathercode[16],
        },
        '2:00': {
          temperature: initialData.temperature_2m[17],
          weatherCode: initialData.weathercode[17],
        },
        '3:00': {
          temperature: initialData.temperature_2m[18],
          weatherCode: initialData.weathercode[18],
        },
        '4:00': {
          temperature: initialData.temperature_2m[19],
          weatherCode: initialData.weathercode[19],
        },
        '5:00': {
          temperature: initialData.temperature_2m[20],
          weatherCode: initialData.weathercode[20],
        },
        '6:00': {
          temperature: initialData.temperature_2m[21],
          weatherCode: initialData.weathercode[21],
        },
        '7:00': {
          temperature: initialData.temperature_2m[22],
          weatherCode: initialData.weathercode[22],
        },
        '8:00': {
          temperature: initialData.temperature_2m[23],
          weatherCode: initialData.weathercode[23],
        },
      },
    }];

    expect(normalizeHourlyWeather(initialData)).toEqual(expectedData);
  });
});

describe('normalizeDailyWeather tests', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date('2022-12-27T09:00:00'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('the passed value is not an object', () => {
    expect(() => {
      normalizeDailyWeather(['d']);
    }).toThrow('the data parameter must be an object');
  });

  it('the passed value is an empty object', () => {
    expect(normalizeDailyWeather({})).toBeNull();
  });

  it('correct data has been passed', () => {
    const initialData = {
      time: [
        '2022-12-27',
        '2022-12-28',
        '2022-12-29',
        '2022-12-30',
        '2022-12-31',
        '2023-01-01',
        '2023-01-02',
      ],
      temperature_2m_max: [-3.4, -4.6, -2, -7.7, -5, -1.8, -6.2],
      temperature_2m_min: [-7, -6.9, -8.4, -12.4, -8.6, -7.1, -9.5],
      weathercode: [71, 72, 72, 71, 89, 73, 71],
    };
    const expectedData = [];

    for (let i = 1; i < 7; i += 1) {
      expectedData[i - 1] = {
        id: initialData.time[i],
        day: initialData.time[i],
        temperatureMin: initialData.temperature_2m_min[i],
        temperatureMax: initialData.temperature_2m_max[i],
        weatherCode: initialData.weathercode[i],
      };
    }

    expect(normalizeDailyWeather(initialData)).toEqual(expectedData);
  });
});

describe('normalizeHours tests', () => {
  it('if the passed value is null', () => {
    expect(normalizeHours(null)).toBeNull();
  });

  it('if the passed array is empty', () => {
    expect(normalizeHours([])).toBeNull();
  });

  it('if a valid array is passed', () => {
    const initialData = [{
      id: 0,
      data: {
        '0:00': { temperature: '-10.8°', weatherCode: 0 },
        '1:00': { temperature: '-11.9°', weatherCode: 0 },
        '2:00': { temperature: '-12.9°', weatherCode: 0 },
        '3:00': { temperature: '-13.6°', weatherCode: 0 },
        '4:00': { temperature: '-14°', weatherCode: 0 },
        '5:00': { temperature: '-14°', weatherCode: 1 },
        '6:00': { temperature: '-13.8°', weatherCode: 3 },
        '7:00': { temperature: '-13.6°', weatherCode: 2 },
        '8:00': { temperature: '-13.8°', weatherCode: 2 },
        '9:00': { temperature: '-14.2°', weatherCode: 2 },
        '10:00': { temperature: '-14.3°', weatherCode: 3 },
        '11:00': { temperature: '-13.8°', weatherCode: 3 },
        '12:00': { temperature: '-13.4°', weatherCode: 2 },
        '13:00': { temperature: '-13.1°', weatherCode: 2 },
        '14:00': { temperature: '-16.4°', weatherCode: 2 },
        '15:00': { temperature: '-16.5°', weatherCode: 2 },
        '16:00': { temperature: '-16.3°', weatherCode: 2 },
        '17:00': { temperature: '-15.5°', weatherCode: 1 },
        '18:00': { temperature: '-13.8°', weatherCode: 1 },
        '19:00': { temperature: '-11.7°', weatherCode: 1 },
        '20:00': { temperature: '-9.7°', weatherCode: 0 },
        '21:00': { temperature: '-8.7°', weatherCode: 0 },
        '22:00': { temperature: '-8.6°', weatherCode: 0 },
        '23:00': { temperature: '-9.5°', weatherCode: 0 },
      },
    }];
    const expectedData = Object.keys(initialData[0].data).map((time) => (
      { name: time }
    ));

    expect(normalizeHours(initialData)).toEqual(expectedData);
  });
});

describe('getFullDayDescription tests', () => {
  it('invalid date string passed', () => {
    expect(() => {
      getFullDayDescription('abcd');
    }).toThrow('invalid date string passed');
  });

  it('the correct date string was passed', () => {
    const dateStr = '27 December 2022 15:30 UTC';

    expect(getFullDayDescription(dateStr)).toMatch('вторник, 27 декабря');
  });
});

describe('normalizeHumidity tests', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date('2022-12-27T09:00:00'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('the passed value is not an object', () => {
    expect(() => {
      normalizeHumidity(['d']);
    }).toThrow('the data parameter must be an object');
  });

  it('the passed value is an empty object', () => {
    expect(normalizeHumidity({})).toBeNull();
  });

  it('startIndex is less than 0', () => {
    const mockTimes = [
      '2022-12-27T03:35',
      '2022-12-27T04:35',
      '2022-12-27T05:35',
    ];
    expect(normalizeHourlyWeather({ time: mockTimes })).toBeNull();
  });

  it('correct data has been passed', () => {
    const initialData = {
      time: [
        '2022-12-27T00:00',
        '2022-12-27T01:00',
        '2022-12-27T02:00',
        '2022-12-27T03:00',
        '2022-12-27T04:00',
      ],
      apparent_temperature: [-17.4, -18, -18.6, -19.1, -19.5],
      relativehumidity_2m: [86, 87, 87, 88, 89],
    };
    const expectedData = {
      apparentTemperature: -19.1,
      relativeHumidity: 88,
    };

    expect(normalizeHumidity(initialData)).toEqual(expectedData);
  });
});

describe('getWindDirectionNameByAngle tests', () => {
  it('The passed angle is not a number', () => {
    expect(() => {
      getWindDirectionNameByAngle('abc');
    }).toThrow('angle value must be a number');
  });

  it('The passed angle does not fall within the range from 0 to 360', () => {
    expect(getWindDirectionNameByAngle(-150)).toMatch('Неизвестно');
    expect(getWindDirectionNameByAngle(1150)).toMatch('Неизвестно');
  });

  it('the passed angle is 0 or 360 degrees', () => {
    expect(getWindDirectionNameByAngle(0)).toMatch('Север');
    expect(getWindDirectionNameByAngle(360)).toMatch('Север');
  });

  it('the passed angle is in the range from 0 to 90 degrees(not inclusive)', () => {
    expect(getWindDirectionNameByAngle(30)).toMatch('Северо-восток');
  });

  it('the passed angle is 90 degrees', () => {
    expect(getWindDirectionNameByAngle(90)).toMatch('Восток');
  });

  it('the passed angle is in the range from 90 to 180 degrees(not inclusive)', () => {
    expect(getWindDirectionNameByAngle(120)).toMatch('Юго-восток');
  });

  it('the passed angle is 180 degrees', () => {
    expect(getWindDirectionNameByAngle(180)).toMatch('Юг');
  });

  it('the passed angle is in the range from 180 to 270 degrees(not inclusive)', () => {
    expect(getWindDirectionNameByAngle(210)).toMatch('Юго-Запад');
  });
  it('the passed angle is 270 degrees', () => {
    expect(getWindDirectionNameByAngle(270)).toMatch('Запад');
  });

  it('the passed angle is in the range from 270 to 360 degrees(not inclusive)', () => {
    expect(getWindDirectionNameByAngle(300)).toMatch('Северо-запад');
  });
});

describe('isObject tests', () => {
  it('the passed value is a string', () => {
    expect(isObject('abb')).toBeFalsy();
  });

  it('the passed null value', () => {
    expect(isObject(null)).toBeFalsy();
  });

  it('the passed value is an array', () => {
    expect(isObject([1, 2, 3])).toBeFalsy();
  });

  it('the passed value is an array', () => {
    expect(isObject({ name: 'adam', age: 32 })).toBeTruthy();
  });
});

describe('isCorrectHeadingLevel', () => {
  it('the passed value is not a number', () => {
    expect(
      () => isCorrectHeadingLevel('abc'),
    ).toThrow('the heading level must be a number');
  });

  it('the passed value is less than 1', () => {
    expect(
      () => isCorrectHeadingLevel(-1),
    ).toThrow('the heading level must be at least 1 and not more than 6');
  });

  it('the passed value is greater than 6', () => {
    expect(
      () => isCorrectHeadingLevel(7),
    ).toThrow('the heading level must be at least 1 and not more than 6');
  });

  it('the passed value is not an integer', () => {
    expect(
      () => isCorrectHeadingLevel(3.33),
    ).toThrow('the header level must be an integer');
  });

  it('the passed value is 1', () => {
    expect(isCorrectHeadingLevel(1)).toBeTruthy();
  });

  it('the passed value is 6', () => {
    expect(isCorrectHeadingLevel(6)).toBeTruthy();
  });
});
