export type OnLoadPayload = {
  page_title: string,
  url_route: string,
  user_first_visit: boolean,
  user_location: string,
  referrer: string
}

export type OnBeforeUnLoadPayload = {
  user_time_in_page: number,
  user_scrolled: boolean,
  num_of_clicks: number
}

export type ElementClickPayload = {
  element_clicked: {
    url_route: string,
    tag_name: string,
    class_name: string,
    id: string,
    page_x: number,
    page_y: number,
    page_width: number,
    page_height: number,
    client_x: number,
    client_y: number,
    client_width: number,
    client_height: number
  }
}

export type Payload = OnLoadPayload | OnBeforeUnLoadPayload | ElementClickPayload;
