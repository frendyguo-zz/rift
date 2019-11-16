#! /usr/bin/env node
process.env.NODE_ENV = 'production';
const fs = require('fs-extra');
const FileSizeReporter = require('react-dev-utils/FileSizeReporter');
const clearConsole = require('react-dev-utils/clearConsole');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const webpack = require('webpack');
const logger = require('../configs/utils/logger');
const paths = require('../configs/path');
const createConfig = require('../configs/createWebpackConfig');

const {
  measureFileSizesBeforeBuild,
  printFileSizesAfterBuild,
} = FileSizeReporter;

function compileWebpack(config, cb) {
  let compiler;
  try {
    compiler = webpack(config);
  } catch (err) {
    logger('error', `Failed to compile ${err}`);
    process.exit(1);
  }
  compiler.run((err, stats) => {
    cb(err, stats);
  });
}

function build(previousFileSizes) {
  const rift = { host: 'localhost', port: 3000 };
  const clientConfig = createConfig('web', 'prod', rift, null);
  const serverConfig = createConfig('node', 'prod', rift, null);

  return new Promise((resolve, reject) => {
    compileWebpack(clientConfig, (err, clientStats) => { // eslint-disable-line
      logger('log', 'Compiling client...');
      if (err) {
        reject(err);
      }

      const clientMessages = formatWebpackMessages(clientStats.toJson({}, true));
      if (clientMessages.errors.length) {
        return reject(new Error(clientMessages.errors.join('\n\n')));
      }

      logger('log', 'Client bundles compiled successfully.');
      logger('log', 'Compiling server...');
      compileWebpack(serverConfig, (srvErr, serverStats) => {
        if (srvErr) {
          reject(srvErr);
        }

        const serverMessages = formatWebpackMessages(serverStats.toJson({}, true));
        if (serverMessages.errors.length) {
          return reject(new Error(serverMessages.errors.join('\n\n')));
        }

        logger('log', 'Server compiled successfully.');

        return resolve({
          clientStats,
          serverStats,
          previousFileSizes,
          warnings: Object.assign(
            {},
            clientMessages.warnings,
            serverMessages.warnings,
          ),
        });
      });
    });
  });
}

async function main() {
  clearConsole();
  logger('log', 'Clearing build...');
  fs.removeSync(paths.appDist);
  clearConsole();
  logger('log', 'Creating an optimized production build...');

  // try {
  measureFileSizesBeforeBuild(paths.appDist)
    .then((previousFileSizes) => {
      fs.emptyDirSync(paths.appDist);
      return build(previousFileSizes);
    })
    .then(({
      clientStats,
      serverStats,
      previousFileSizes,
      warnings,
    }) => {
      if (warnings.length) {
        logger('warn', 'Compiled with warnings.');
        logger('warn', warnings.join('\n\n'));
      } else {
        logger('log', 'Compiled successfully.');
      }
      logger('log', 'File sizes after gzip:');
      printFileSizesAfterBuild(clientStats, previousFileSizes, paths.appDist);
      printFileSizesAfterBuild(serverStats, previousFileSizes, paths.appDist);
    })
    .catch((err) => {
      logger('error', err);
      process.exit(1);
    });
}

main();
