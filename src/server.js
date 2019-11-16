import express from 'express';
import renderer from '../lib/renderer';
import routes from './routes';

const assets = require('../dist/assets.json');
const initWDSProxy = require('../server/proxy').default;

const app = express();
app.use(express.static(process.env.PUBLIC_PATH));
app.use(express.static(process.env.PUBLIC_DIR));

if (!global.__WDS_PROXY__) {
  initWDSProxy();
}
app.use('/__WDS__', global.__WDS_PROXY__);

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.get('*', async (req, res) => {
  try {
    const html = await renderer({
      req,
      res,
      routes,
      assets,
      customThing: 'thing',
    });
    res.send(html);
  } catch (err) {
    console.error(err);
    res.json({ message: err.message, stack: err.stack });
  }
});

export default app;
