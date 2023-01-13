import { createReverseGeocodingURL, isObject } from '../../utils/utils';

class ReverseGeocodingAPI {
  static async getGeocodingData(location) {
    if (!isObject(location)) {
      throw new Error('the location parameter must be an object');
    }

    if (!location.latitude || !location.longitude) {
      throw new Error('the passed object must have the longitude & latitude properties');
    }

    const { latitude: lat, longitude: lon } = location;
    const url = createReverseGeocodingURL({
      lat,
      lon,
      zoom: '10',
      format: 'jsonv2',
      'accept-language': 'ru',
    });

    try {
      const response = await fetch(url);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`HTTP ${response.status} error: ${error.error.message}`);
      }

      const result = await response.json();
      return result.address;
    } catch (error) {
      return error;
    }
  }
}

export default ReverseGeocodingAPI;
