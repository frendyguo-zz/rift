const fs = require('fs-extra');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
// const resolveOwn = relativePath => path.resolve(__dirname, '..', relativePath);

module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appPublic: resolveApp('public'),
  appDist: resolveApp('dist'),
  appDistPublic: resolveApp('dist/public'),
  appBabelRc: resolveApp('.babelrc'),
  appSrc: resolveApp('src'),
  appServerJs: resolveApp('server.js'),
  appAssetsManifest: resolveApp('public/assets.json'),
  appPackageJson: resolveApp('package.json'),
  appNodeModules: resolveApp('node_modules'),
  appClientIndex: resolveApp('src/client'),
  appServerIndex: resolveApp('src/index'),
  appRiftConfig: resolveApp('rift.config.js'),
  // zz: resolveOwn('server.js'),
};
