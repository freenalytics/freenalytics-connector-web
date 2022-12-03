import { getPublicIp, getLocationForIp } from './utils';

describe('Utils', () => {
  describe('getPublicIp()', () => {
    it('should return an IP if accessible.', async () => {
      const ip = '123.123.123.123';
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({ text: () => Promise.resolve(ip) } as any);

      expect(await getPublicIp()).toBe(ip);
    });

    it('should return empty if not accessible.', async () => {
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({ text: () => Promise.resolve('') } as any);

      expect(await getPublicIp()).toBe('');
    });

    it('should return empty if request rejects.', async () => {
      jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error(''));

      expect(await getPublicIp()).toBe('');
    });
  });

  describe('getLocationForIp()', () => {
    const ip = '123.123.123.123';

    it('should return a location string if accessible.', async () => {
      jest.spyOn(global, 'fetch').mockResolvedValueOnce(
        {
          json: () => {
            return Promise.resolve({
              country_name: 'France',
              city: 'Paris'
            });
          }
        } as any);

      expect(await getLocationForIp(ip)).toBe('Paris, France');
    });

    it('should return N/A if request rejects.', async () => {
      jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error(''));

      expect(await getLocationForIp(ip)).toBe('N/A');
    });
  });
});
