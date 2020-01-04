import React, { Component } from 'react';
import RiftData from './RiftData';

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
      helmet,
    } = this.props;

    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();

    return (
      <html {...htmlAttrs}>
        <head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          {assets.client.css && <link rel="stylesheet" href={assets.client.css} />}
        </head>
        <body {...bodyAttrs}>
          <RiftData data={data} />
          <div id="root">DO_NOT_CHANGE_THIS_LINE</div>
          {assets.client.js && <script type="text/javascript" src={assets.client.js} defer crossOrigin="anonymouse" />}
          {assets.vendor.js && <script src={assets.vendor.js} defer crossOrigin="anonymouse" />}
        </body>
      </html>
    );
  }
}
