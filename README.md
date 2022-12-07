[![ci-build-status](https://img.shields.io/github/workflow/status/freenalytics/freenalytics-connector-web/On%20Push%20%28Master%29?logo=github&label=CI)](https://github.com/freenalytics/freenalytics-connector-web)
[![open-issues-count](https://img.shields.io/github/issues-raw/freenalytics/freenalytics-connector-web?label=Open%20Issues&logo=github)](https://github.com/freenalytics/freenalytics-connector-web)
[![open-pr-count](https://img.shields.io/github/issues-pr-raw/freenalytics/freenalytics-connector-web?label=Open%20PRs&logo=github)](https://github.com/freenalytics/freenalytics-connector-web)
[![version](https://img.shields.io/github/package-json/v/freenalytics/freenalytics-connector-web?logo=Node.js&logoColor=white)](https://github.com/freenalytics/freenalytics-connector-web)
[![license](https://img.shields.io/github/license/freenalytics/freenalytics-connector-web)](https://github.com/freenalytics/freenalytics-connector-web)

# freenalytics-connector-web

A connector library for applications that use the official Web template.

## Setting-up Your Application

In order to use this connector library, you should use the Official Web Template when creating your application.

This library will follow the following schema:

```yml
type: object
properties:
  page_title:
    type: string
  url_route:
    type: string
  user_time_in_page:
    type: number
  user_scrolled:
    type: boolean
  user_first_visit:
    type: boolean
  user_location:
    type: string
  referrer:
    type: string
  num_of_clicks:
    type: integer
  element_clicked:
    type: object
    properties:
      url_route:
        type: string
      tag_name:
        type: string
      class_name:
        type: string
      id:
        type: string
      page_x:
        type: integer
      page_y:
        type: integer
      page_width:
        type: integer
      page_height:
        type: integer
```

## Usage

In order to integrate this library with your webpage, add the following tags inside your `head` tag in your `html` pages:

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/freenalytics/freenalytics-connector-web@v1.1.0/connector.min.js"></script>
<script type="text/javascript" src="/script.js"></script>
```

Notice that the second `script` tag points to a local script named `script.js`.

In this case, you need to instantiate the client with your information. An example of what this `script.js` file could look like:

```js
const client = new freenalytics.Client({
  apiUrl: 'http://localhost:4000/api',
  domain: 'FD-107hpu34tlb7s7mro'
});
client.initialize();
```

Once you have that set up, the client will automatically send relevant data periodically.

Check out the [web example](https://github.com/freenalytics/example-web) repository for a better view on how to set this up on your
own project.

## Development

In order to develop this library, clone the repository:

```text
git clone https://github.com/freenalytics/freenalytics-connector-web
```

And install the dependencies:

```text
npm install
```

You can start the bundler in watch mode with:

```text
npm run build:watch
```

And start an HTTP server to serve the bundle locally with:

```text
npm run dev:serve
```

Make sure to check that the linting is correct with:

```text
npm run lint
```

And that the tests run successfully:

```text
npm run test
```

## Author

This application was made by [Freenalytics](https://github.com/freenalytics) as a final college project.
