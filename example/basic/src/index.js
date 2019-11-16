import express from 'express';
import logger from '../../../scripts/utils/logger';

let app = require('./server').default;

if (module.hot) {
  logger('log', 'module hot accepting');
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
export default express()
  .use((req, res) => app.handle(req, res))
  .listen(port, (err) => {
    if (err) {
      logger('error', err);
      return;
    }
    logger('log', `Server started on port ${port}!`);
  });
