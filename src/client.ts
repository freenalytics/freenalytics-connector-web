import 'cross-fetch/polyfill';
import { Payload } from './payloads';
import { PageHandler } from './pageHandler';

export interface ClientOptions {
  apiUrl: string
  domain: string
}

export class Client {
  private readonly apiUrl: string;
  private readonly domain: string;
  private pageHandler: PageHandler | null;

  constructor(options: ClientOptions) {
    Client.validateOptions(options);

    this.apiUrl = options.apiUrl;
    this.domain = options.domain;
    this.pageHandler = null;
  }

  private static validateOptions(options: ClientOptions) {
    if (!options.apiUrl) {
      throw new Error('options.apiUrl needs to be specified.');
    }

    if (!options.domain) {
      throw new Error('options.domain needs to be specified.');
    }
  }

  public initialize() {
    this.pageHandler = new PageHandler(this);
    this.pageHandler.registerEvents();
  }

  public async postPayload(payload: Payload) {
    try {
      console.log(`${this.apiUrl}/applications/${this.domain}/data`, payload);
    } catch (error) {
      console.error(error);
    }
  }
}