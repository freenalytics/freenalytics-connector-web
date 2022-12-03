import { getPublicIp } from './utils';

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
  });
});
