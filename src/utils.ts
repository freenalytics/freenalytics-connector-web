import 'cross-fetch/polyfill';

const IP_API_URL = 'https://api.ipify.org/?format=json';
const GEO_API_URL = 'https://reallyfreegeoip.org/json';

export const getPublicIp = async (): Promise<string> => {
  try {
    const response = await fetch(IP_API_URL);
    const json = await response.json();

    return json.ip;
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
