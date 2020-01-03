"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _react = _interopRequireDefault(require("react"));

var _server = _interopRequireDefault(require("react-dom/server"));

var _reactRouterDom = require("react-router-dom");

var _reactHelmet = _interopRequireDefault(require("react-helmet"));

var _url = _interopRequireDefault(require("url"));

var _getInitialData = _interopRequireDefault(require("./getInitialData"));

var _Document = _interopRequireDefault(require("./Document"));

var _RiftApp = _interopRequireDefault(require("./RiftApp"));

var _jsxFileName = "/Users/frendyguo/Developments/rift/packages/rift/src/renderer.js";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _default =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(options) {
    var req, res, routes, assets, rest, Doc, context, renderPage, _ref3, match, data, redirectTo, statusCode, reactRouterMatch, _ref4, html, docProps, doc;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            req = options.req, res = options.res, routes = options.routes, assets = options.assets, rest = (0, _objectWithoutProperties2["default"])(options, ["req", "res", "routes", "assets"]);
            Doc = _Document["default"];
            context = {};

            renderPage =
            /*#__PURE__*/
            function () {
              var _ref2 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee() {
                var content, html, helmet, statusCode, redirectTo;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        content = _react["default"].createElement(_reactRouterDom.StaticRouter, {
                          location: req.url,
                          context: context,
                          __source: {
                            fileName: _jsxFileName,
                            lineNumber: 22
                          }
                        }, // eslint-disable-next-line no-use-before-define
                        _react["default"].createElement(_RiftApp["default"], {
                          routes: routes,
                          data: data,
                          __source: {
                            fileName: _jsxFileName,
                            lineNumber: 25
                          }
                        }));
                        html = _server["default"].renderToString(content);
                        helmet = _reactHelmet["default"].renderStatic();
                        statusCode = context.statusCode, redirectTo = context.url;

                        if (redirectTo) {
                          res.redirect(statusCode || 301, redirectTo);
                        }

                        if (statusCode) {
                          res.statusCode(statusCode);
                        }

                        return _context.abrupt("return", {
                          html: html,
                          helmet: helmet
                        });

                      case 7:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function renderPage() {
                return _ref2.apply(this, arguments);
              };
            }();

            _context2.next = 6;
            return (0, _getInitialData["default"])(routes, _url["default"].parse(req.url).pathname, _objectSpread({
              req: req,
              res: res
            }, rest));

          case 6:
            _ref3 = _context2.sent;
            match = _ref3.match;
            data = _ref3.data;

            if (!data) {
              _context2.next = 15;
              break;
            }

            redirectTo = data.redirectTo, statusCode = data.statusCode;

            if (statusCode) {
              context.statusCode = statusCode;
            }

            if (!redirectTo) {
              _context2.next = 15;
              break;
            }

            res.redirect(statusCode || 301, redirectTo);
            return _context2.abrupt("return", null);

          case 15:
            if (!(match && match.redirectTo && match.path)) {
              _context2.next = 18;
              break;
            }

            res.redirect(301, req.originalUrl.replace(match.path, match.redirectTo));
            return _context2.abrupt("return", null);

          case 18:
            reactRouterMatch = (0, _reactRouterDom.matchPath)(req.url, match);
            _context2.next = 21;
            return Doc.getInitialProps(_objectSpread({
              req: req,
              res: res,
              assets: assets,
              renderPage: renderPage,
              data: data,
              helmet: _reactHelmet["default"].renderStatic(),
              match: reactRouterMatch
            }, rest));

          case 21:
            _ref4 = _context2.sent;
            html = _ref4.html;
            docProps = (0, _objectWithoutProperties2["default"])(_ref4, ["html"]);
            doc = _server["default"].renderToStaticMarkup(_react["default"].createElement(Doc, (0, _extends2["default"])({}, docProps, {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 78
              }
            })));
            return _context2.abrupt("return", "<!doctype html>".concat(doc.replace('REPLACE_THIS_IN_RENDERER_METHOD', html)));

          case 26:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;