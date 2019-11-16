"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var initProxy = function initProxy() {
  var proxy = require('http-proxy-middleware');

  var _pathRewrite = {
    '^/__WDS__/info': '/sockjs-node/info',
    '^/__WDS__': ''
  };
  var pathRewriteKey = Object.keys(_pathRewrite);
  var pathRewriteRegexes = pathRewriteKey.map(function (key) {
    return new RegExp(key);
  });
  global.__WDS_PROXY__ = proxy({
    ws: true,
    target: 'http://127.0.0.1:3001',
    logLevel: 'silent',
    pathRewrite: function pathRewrite(path, req) {
      var result = path;

      if (!req.protocol) {
        // Websocket requests
        result = path.replace('/__WDS__/', '/sockjs-node/');
      } else {
        for (var i = 0; i < pathRewriteKey.length; i += 1) {
          if (pathRewriteRegexes[i].test(path)) {
            result = path.replace(pathRewriteRegexes[i], _pathRewrite[pathRewriteKey[i]]);
            break;
          }
        }
      }

      return result;
    }
  });
};

var _default = initProxy;
exports["default"] = _default;