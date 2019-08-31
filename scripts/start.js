#! /usr/bin/env node
const fs = require('fs-extra');
const webpack = require('webpack');
const DevServer = require('webpack-dev-server');
const clearConsole = require('react-dev-utils/clearConsole');
const openBrowser = require('react-dev-utils/openBrowser');
const {
  choosePort,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');
const logger = require('./utils/logger');
const paths = require('./configs/path');

async function setPorts() {
  const port = (process.env.PORT && parseInt(process.env.PORT, 10)) || 3000;
  const portDev = (process.env.PORT_DEV && parseInt(process.env.PORT_DEV, 10)) || port + 1;
  const actualPort = await choosePort(process.env.HOST, port);
  const actualPortDev = await choosePort(process.env.HOST, portDev);

  process.env.PORT = actualPort;
  process.env.PORT_DEV = actualPortDev;
}

function compileWebpack(config) {
  let compiler;
  try {
    compiler = webpack(config);
  } catch (err) {
    logger('error', err);
    process.exit(1);
  }

  return compiler;
}

function main() {
  clearConsole();
  logger('log', 'Clearing configurations...');
  fs.removeSync(paths.appDist);
  clearConsole();
  logger('log', 'Compiling...');

  const createConfig = require('../webpack.config');
  const rift = { host: 'localhost', port: 3000 };
  const clientConfig = createConfig('web', 'dev', rift, null);
  const serverConfig = createConfig('node', 'dev', rift, null);

  const clientCompiler = compileWebpack(clientConfig);
  const serverCompiler = compileWebpack(serverConfig);

  const urls = prepareUrls('http', 'localhost', 3000);
  let watching;
  let browserOpened;

  clientCompiler.plugin('done', () => {
    if (watching) {
      return;
    }

    logger('log', 'Starting the development server...');
    watching = serverCompiler.watch({
      quiet: true,
      stats: 'none',
    }, (error, stats) => {
      if (error) {
        logger('error', error.stack || error);
        if (error.details) {
          logger('error', error.details.toString());
        }
        return;
      }

      const info = stats.toJson();
      if (stats.hasErrors()) {
        logger('error', info.errors);
        process.exit(1);
      }

      if (stats.hasWarnings()) {
        logger('warn', info.warnings);
      }
      if (!browserOpened) {
        setTimeout(() => {
          openBrowser(urls.localUrlForBrowser);
          browserOpened = true;
        }, 500);
      }
    });
  });

  const clientDevServer = new DevServer(clientCompiler, clientConfig.devServer);
  clientDevServer.listen(
    clientConfig.devServer.port,
    clientConfig.devServer.host,
  );
}

setPorts()
  .then(main)
  .catch(console.log);
