import { Client } from './client';
import { getLocationForIp, getPublicIp } from './utils';

export class PageHandler {
  private client: Client;
  private readonly visitTimestamp: number;
  private numOfClicks: number;

  constructor(client: Client) {
    this.client = client;
    this.visitTimestamp = Date.now();
    this.numOfClicks = 0;
  }

  public registerEvents() {
    window.addEventListener('load', this.handleLoad.bind(this));
    window.addEventListener('click', this.handleClick.bind(this));
    window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));
  }

  private async handleLoad() {
    const ip = await getPublicIp();
    const location = ip ? await getLocationForIp(ip) : 'N/A';

    return this.client.postPayload({
      page_title: document.title,
      url_route: window.location.pathname,
      user_first_visit: !document.referrer,
      user_location: location,
      referrer: document.referrer
    });
  }

  private handleClick(event: MouseEvent) {
    this.numOfClicks++;

    return this.client.postPayload({
      element_clicked: {
        tag_name: 'tag',
        class_name: 'class',
        id: 'id',
        page_x: event.pageX,
        page_y: event.pageY,
        client_x: event.clientX,
        client_y: event.clientY
      }
    });
  }

  private handleBeforeUnload() {
    const timeInPage = (Date.now() - this.visitTimestamp) / 1000;

    return this.client.postPayload({
      user_time_in_page: timeInPage,
      user_scrolled: false,
      num_of_clicks: this.numOfClicks
    });
  }
}
