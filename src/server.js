import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
// import Loadable from 'react-loadable';
// import { getBundles } from 'react-loadable/webpack';
import App from './app';

// const stats = require('../dist/react-loadable.json');
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
  // const modules = [];
  const data = { foo: 'bar' };
  const markup = renderToString(<App initialData={data} />);
  // <Loadable.Capture report={moduleName => modules.push(moduleName)}>
  // </Loadable.Capture>,
  // );
  // const bundles = getBundles(stats, modules);
  // console.log(modules);

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
        ${assets.client.js ? `<script src="${assets.client.js}" crossorigin></script>` : ''}
      </body>
    </html>
  `);
  // ${assets.vendor.js ? `<script src="${assets.vendor.js}" crossorigin></script>` : ''}
});

export default app;
