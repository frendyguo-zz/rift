import React, { Component } from 'react';
import serialize from 'serialize-javascript';

export default class Document extends Component {
  static async getInitialProps({ assets, data, renderPage }) {
    const page = await renderPage();
    return { assets, data, ...page };
  }

  state = {};

  render() {
    const {
      assets,
      data,
    } = this.props;

    return (
      <html lang="en">
        <head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />
          <title>Welcome to Rift</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {
            assets.client.css && <link rel="stylesheet" href={assets.client.css} />
          }
        </head>
        <body>
          <script
            id="__RIFT_DATA__"
            type="application/json"
            dangerouslySetInnerHTML={{
              __html: serialize({ ...data }),
            }}
          />
          <div id="root">REPLACE_THIS_IN_RENDERER_METHOD</div>
          {
            assets.client.js && <script type="text/javascript" src={assets.client.js} defer crossOrigin="anonymouse" />
          }
          {
            assets.vendor.js && <script src={assets.vendor.js} defer crossOrigin="anonymouse" />
          }
        </body>
      </html>
    );
  }
}
