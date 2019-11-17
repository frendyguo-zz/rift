const fs = require('fs');
const paths = require('../path');
const logger = require('../utils/logger');

module.exports = (resolve, rootDir) => {
  // Use this instead of `paths.testsSetup` to avoid putting
  // an absolute filename into configuration after ejecting.
  const setupTestsMatches = paths.appTestSetups.match(/src[/\\]setupTests\.(.+)/);
  const setupTestsFileExtension = (setupTestsMatches && setupTestsMatches[1]) || 'js';
  const setupTestsFile = fs.existsSync(paths.testsSetup)
    ? `<rootDir>/src/setupTests.${setupTestsFileExtension}`
    : undefined;

  const config = {
    collectCoverageFrom: ['src/**/*.{js,jsx,mjs}'],
    setupTestFrameworkScriptFile: setupTestsFile,
    testMatch: [
      '<rootDir>/src/**/__tests__/**/*.{js,jsx,mjs}',
      '<rootDir>/src/**/?(*.)(spec|test).{js,jsx,mjs}',
    ],
    testEnvironment: 'node',
    testURL: 'http://localhost',
    transform: {
      '^.+\\.(js|jsx|mjs)$': resolve('configs/jest/babelTransform.js'),
      '^.+\\.css$': resolve('configs/jest/cssTransform.js'),
      '^(?!.*\\.(js|jsx|mjs|css|json)$)': resolve('configs/jest/fileTransform.js'),
    },
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
    watchPathIgnorePatterns: [
      '<rootDir>/node_modules',
    ],
  };
  if (rootDir) {
    config.rootDir = rootDir;
  }

  const overrides = Object.assign({}, require(paths.appPackageJson).jest); // eslint-disable-line
  const supportedKeys = [
    'collectCoverageFrom',
    'coverageReporters',
    'coverageThreshold',
    'globals',
    'globalSetup',
    'globalTeardown',
    'mapCoverage',
    'moduleDirectories',
    'moduleFileExtensions',
    'moduleNameMapper',
    'modulePaths',
    'snapshotSerializers',
    'setupFiles',
    'testMatch',
    'testEnvironmentOptions',
    'testResultsProcessor',
    'transform',
    'transformIgnorePatterns',
    'reporters',
    'watchPlugins',
  ];
  if (overrides) {
    supportedKeys.forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(overrides, key)) {
        config[key] = overrides[key];
        delete overrides[key];
      }
    });
    const unsupportedKeys = Object.keys(overrides);
    /* eslint-disable */
    if (unsupportedKeys.length) {
      logger('error', (
        'Out of the box, Rift only supports overriding ' +
        'these Jest options:\n\n' +
        supportedKeys.map(key => chalk.bold('  \u2022 ' + key)).join('\n') +
        '.\n\n' +
        'These options in your package.json Jest configuration ' +
        'are not currently supported by Rift:\n\n' +
        unsupportedKeys.map(key => chalk.bold('  \u2022 ' + key)).join('\n')
      ));
      process.exit(1);
    }
  }
  return config;
};
