import { Client } from './client';

export class PageHandler {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  public registerEvents() {
    window.addEventListener('load', this.handleLoad.bind(this));
    window.addEventListener('click', this.handleClick.bind(this));
    window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));
  }

  private handleLoad() {
    return this.client.postPayload({
      page_title: window.document.title,
      url_route: window.location.pathname,
      user_first_visit: !window.document.referrer,
      user_location: '',
      referrer: window.document.referrer
    });
  }

  private handleClick(event: MouseEvent) {
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
    return this.client.postPayload({
      user_time_in_page: 0,
      user_scrolled: false,
      num_of_clicks: 1
    });
  }
}
