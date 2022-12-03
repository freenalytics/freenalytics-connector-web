import { Client, ClientOptions } from './client';
import { Payload } from './payloads';

const options: ClientOptions = {
  apiUrl: 'http://localhost:4000/api',
  domain: 'FD-107hpu34tlb7hjk1f'
};

jest.spyOn(global, 'fetch').mockResolvedValue({} as any);

describe('Client', () => {
  describe('constructor', () => {
    it('should throw if no options.apiUrl is provided.', () => {
      expect(() => {
        return new Client({ ...options, apiUrl: '' });
      }).toThrow(Error);
    });

    it('should throw if no options.domain is provided.', () => {
      expect(() => {
        return new Client({ ...options, domain: '' });
      }).toThrow(Error);
    });

    it('should not throw if everything is provided.', () => {
      expect(() => {
        return new Client(options);
      }).not.toThrow(Error);
    });
  });

  describe('initialize()', () => {
    it('should set the pageHandler property.', () => {
      const client = new Client(options);
      client.initialize();

      expect(client).toHaveProperty('pageHandler');
    });
  });

  describe('postPayload()', () => {
    it('should post the payload.', async () => {
      const client = new Client(options);
      await client.postPayload({ } as Payload);
      expect(fetch).toHaveBeenCalledWith(`${options.apiUrl}/applications/${options.domain}/data`, expect.anything());
    });
  });
});
