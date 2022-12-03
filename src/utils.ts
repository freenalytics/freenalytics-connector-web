import 'cross-fetch/polyfill';

const IP_API_URL = 'https://checkip.amazonaws.com';
const GEO_API_URL = 'http://ip-api.com/json';

export const getPublicIp = async (): Promise<string> => {
  try {
    const response = await fetch(IP_API_URL);
    return await response.text();
  } catch (error) {
    return '';
  }
};

export const getLocationForIp = async (ip: string): Promise<string> => {
  try {
    const response = await fetch(`${GEO_API_URL}/${ip}`);
    const json = await response.json();

    if (!json.success) {
      return 'N/A';
    }

    return `${json.city}, ${json.country}`;
  } catch (error) {
    return 'N/A';
  }
};
