import { Client, ClientOptions } from './client';

const options: ClientOptions = {
  apiUrl: 'http://localhost:3000',
  domain: 'FD-107hpu34tlb7hjk1f'
};

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
});
