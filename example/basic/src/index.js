import express from 'express';

let app = require('./server').default;

if (module.hot) {
  console.log('Accepting module.hot');
  module.hot.accept('./server', () => {
    console.log('HMR Server-side enabled!');
    try {
      app = require('./server').default;
    } catch (err) {
      console.error('error', err);
    }
  });
}

const port = process.env.PORT || 3000;
export default express()
  .use((req, res) => app.handle(req, res))
  .listen(port, (err) => {
    if (err) {
      console.error('error', err);
      return;
    }
    console.log(`Server started on port ${port}!`);
  });
