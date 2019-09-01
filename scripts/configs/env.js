const paths = require('./path');

function getEnvironmentVariables(target) {
  const raw = Object.keys(process.env)
    .reduce(
      (env, key) => {
        env[key] = process.env[key]; // eslint-disable-line
        return env;
      },
      {
        // Useful for determining whether we’re running in production mode.
        // Most importantly, it switches React into the correct mode.
        NODE_ENV: process.env.NODE_ENV || 'development',
        PORT: process.env.PORT || 3000,
        VERBOSE: !!process.env.VERBOSE,
        HOST: process.env.HOST || 'localhost',
        BUILD_TARGET: target === 'web' ? 'client' : 'server',
        PUBLIC_PATH: process.env.PUBLIC_PATH || '/',
        PUBLIC_DIR: process.env.NODE_ENV === 'production'
          ? paths.appDist
          : '__WDS__',
      },
    );

  const stringified = Object.keys(raw).reduce((env, key) => {
    env[`process.env.${key}`] = JSON.stringify(raw[key]); // eslint-disable-line
    return env;
  }, {});

  return { raw, stringified };
}

module.exports = {
  getEnvironmentVariables,
};
