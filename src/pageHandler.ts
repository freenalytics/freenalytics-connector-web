import { Client } from './client';
import { getLocationForIp, getPublicIp } from './utils';

export class PageHandler {
  private client: Client;
  private readonly visitTimestamp: number;
  private numOfClicks: number;
  private scrolled: boolean;

  constructor(client: Client) {
    this.client = client;
    this.visitTimestamp = Date.now();
    this.numOfClicks = 0;
    this.scrolled = false;
  }

  public registerEvents() {
    window.addEventListener('load', this.handleLoad.bind(this));
    window.addEventListener('click', this.handleClick.bind(this));
    window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));
    window.addEventListener('wheel', this.handleScroll.bind(this), { once: true });
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

    const [element] = event.composedPath() as Element[];

    return this.client.postPayload({
      element_clicked: {
        tag_name: element?.localName ?? 'unknown',
        class_name: element?.className ?? '',
        id: element?.id ?? '',
        page_x: event.pageX,
        page_y: event.pageY,
        client_x: event.clientX,
        client_y: event.clientY
      }
    });
  }

  private handleScroll() {
    this.scrolled = true;
  }

  private handleBeforeUnload() {
    const timeInPage = (Date.now() - this.visitTimestamp) / 1000;

    return this.client.postPayload({
      user_time_in_page: timeInPage,
      user_scrolled: this.scrolled,
      num_of_clicks: this.numOfClicks
    });
  }
}
