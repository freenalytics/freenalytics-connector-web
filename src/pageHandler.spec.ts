import { PageHandler } from './pageHandler';
import { Client } from './client';

window.addEventListener = jest.fn();
document.title = 'website';
Object.defineProperty(window, 'location', {
  value: {
    pathname: 'path'
  }
});

const clientMock = {
  postPayload: jest.fn()
} as unknown as Client;

jest.mock('./utils', () => ({
  getPublicIp: jest.fn().mockResolvedValue(''),
  getLocationForIp: jest.fn()
}));

describe('PageHandler', () => {
  let handler: PageHandler;

  beforeEach(() => {
    handler = new PageHandler(clientMock);
    (clientMock.postPayload as jest.Mock).mockClear();
  });

  describe('registerEvents()', () => {
    it('should register the relevant events.', () => {
      handler.registerEvents();
      expect(window.addEventListener).toHaveBeenCalledWith('load', expect.anything());
      expect(window.addEventListener).toHaveBeenCalledWith('click', expect.anything());
      expect(window.addEventListener).toHaveBeenCalledWith('beforeunload', expect.anything());
    });
  });

  describe('handleLoad()', () => {
    it('should call handleLoad() with the appropriate data.', async () => {
      await (handler as any).handleLoad();

      expect(clientMock.postPayload).toHaveBeenCalledWith({
        page_title: 'website',
        url_route: 'path',
        user_first_visit: true,
        user_location: 'N/A',
        referrer: ''
      });
    });
  });

  describe('handleClick()', () => {
    const event = {
      pageX: 1,
      pageY: 2,
      clientX: 3,
      clientY: 4
    } as MouseEvent;

    it('should call handleClick() with the appropriate data.', () => {
      (handler as any).handleClick(event);

      expect(clientMock.postPayload).toHaveBeenCalledWith({
        element_clicked: {
          tag_name: 'tag',
          class_name: 'class',
          id: 'id',
          page_x: 1,
          page_y: 2,
          client_x: 3,
          client_y: 4
        }
      });
    });

    it('should increment number of clicks.', async () => {
      await (handler as any).handleClick(event);

      expect(handler).toHaveProperty('numOfClicks', 1);
    });
  });

  describe('handleBeforeUnload()', () => {
    it('should call handleBeforeUnload() with the appropriate data.', () => {
      const nowSpy = jest.spyOn(Date, 'now');
      nowSpy.mockReturnValue(1000);
      handler = new PageHandler(clientMock);

      nowSpy.mockReturnValue(2000);
      (handler as any).handleBeforeUnload();

      expect(clientMock.postPayload).toHaveBeenCalledWith({
        user_time_in_page: 1,
        user_scrolled: false,
        num_of_clicks: 0
      });
    });
  });
});
