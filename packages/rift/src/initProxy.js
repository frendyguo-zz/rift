const initProxy = () => {
  const proxy = require('http-proxy-middleware');
  const pathRewrite = {
    '^/__WDS__/info': '/sockjs-node/info',
    '^/__WDS__': '',
  };
  const pathRewriteKey = Object.keys(pathRewrite);
  const pathRewriteRegexes = pathRewriteKey.map(key => new RegExp(key));

  global.__WDS_PROXY__ = proxy({
    ws: true,
    target: 'http://127.0.0.1:3001',
    logLevel: 'silent',
    pathRewrite: (path, req) => {
      let result = path;
      if (!req.protocol) {
        // Websocket requests
        result = path.replace('/__WDS__/', '/sockjs-node/');
      } else {
        for (let i = 0; i < pathRewriteKey.length; i += 1) {
          if (pathRewriteRegexes[i].test(path)) {
            result = path.replace(
              pathRewriteRegexes[i],
              pathRewrite[pathRewriteKey[i]],
            );
            break;
          }
        }
      }
      return result;
    },
  });
};

export default initProxy;
