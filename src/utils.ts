import 'cross-fetch/polyfill';

const IP_API_URL = 'https://checkip.amazonaws.com';
const GEO_API_URL = 'https://reallyfreegeoip.org/json';

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

    return `${json.city}, ${json.country_name}`;
  } catch (error) {
    return 'N/A';
  }
};
