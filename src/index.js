import express from 'express';
import Loadable from 'react-loadable';
import logger from '../scripts/utils/logger';

let app = require('./server').default;

if (module.hot) {
  module.hot.accept('./server', () => {
    logger('log', 'HMR Server-side enabled!');
    try {
      app = require('./server').default;
    } catch (err) {
      logger('error', err);
    }
  });
}

const port = process.env.PORT || 3000;
export default Loadable.preloadAll().then(() => express()
  .use((req, res) => app.handle(req, res))
  .listen(port, (err) => {
    if (err) {
      logger('error', err);
      return;
    }
    logger('log', `Server started on port ${port}!`);
  }));
