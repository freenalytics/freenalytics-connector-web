import 'cross-fetch/polyfill';

const IP_API_URL = 'https://checkip.amazonaws.com/';
// const GEO_API_URL = 'https://ip-api.com/docs/api:json';

export const getPublicIp = async (): Promise<string> => {
  try {
    const response = await fetch(IP_API_URL);
    return await response.text();
  } catch (error) {
    return '';
  }
};
