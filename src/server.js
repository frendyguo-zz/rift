import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { getLoadableState } from 'loadable-components/server';
import App from './app';

const assets = require('../dist/assets.json');
const initWDSProxy = require('../server/proxy').default;

const app = express();
app.use(express.static('public'));

if (!global.__WDS_PROXY__) {
  initWDSProxy();
}
app.use('/__WDS__', global.__WDS_PROXY__);

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.get('*', async (req, res) => {
  const data = { foo: 'bar' };
  const jsx = <App initialData={data} />;
  const loadableState = await getLoadableState(jsx);
  const markup = renderToString(jsx);

  res.send(`
    <!doctype html>
    <html lang="">
      <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>Welcome to Rift</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${assets.client.css ? `<link rel="stylesheet" href="${assets.client.css}">` : ''}
      </head>
      <body>
        <script>window._INITIAL_DATA_ = ${JSON.stringify(data)};</script>
        <div id="root">${markup}</div>
        ${loadableState.getScriptTag()}
        ${assets.client.js ? `<script src="${assets.client.js}" crossorigin></script>` : ''}
        ${assets.vendor.js ? `<script src="${assets.vendor.js}" crossorigin></script>` : ''}
      </body>
    </html>
  `);
});

export default app;
