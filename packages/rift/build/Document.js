"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _serializeJavascript = _interopRequireDefault(require("serialize-javascript"));

var _jsxFileName = "/Users/frendyguo/Developments/rift/packages/rift/src/Document.js";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Document =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(Document, _Component);

  function Document() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, Document);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(Document)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {});
    return _this;
  }

  (0, _createClass2["default"])(Document, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          assets = _this$props.assets,
          data = _this$props.data,
          helmet = _this$props.helmet;
      return _react["default"].createElement("html", {
        lang: "en",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 20
        }
      }, _react["default"].createElement("head", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 21
        }
      }, _react["default"].createElement("meta", {
        httpEquiv: "X-UA-Compatible",
        content: "IE=edge",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        }
      }), _react["default"].createElement("meta", {
        charSet: "utf-8",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 23
        }
      }), _react["default"].createElement("title", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 24
        }
      }, "Welcome to Rift"), _react["default"].createElement("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 25
        }
      }), helmet.title.toComponent(), helmet.meta.toComponent(), helmet.link.toComponent(), assets.client.css && _react["default"].createElement("link", {
        rel: "stylesheet",
        href: assets.client.css,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 30
        }
      })), _react["default"].createElement("body", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 33
        }
      }, _react["default"].createElement("script", {
        id: "__RIFT_DATA__",
        type: "application/json",
        dangerouslySetInnerHTML: {
          __html: (0, _serializeJavascript["default"])(_objectSpread({}, data))
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 34
        }
      }), _react["default"].createElement("div", {
        id: "root",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 41
        }
      }, "REPLACE_THIS_IN_RENDERER_METHOD"), assets.client.js && _react["default"].createElement("script", {
        type: "text/javascript",
        src: assets.client.js,
        defer: true,
        crossOrigin: "anonymouse",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 43
        }
      }), assets.vendor.js && _react["default"].createElement("script", {
        src: assets.vendor.js,
        defer: true,
        crossOrigin: "anonymouse",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 46
        }
      })));
    }
  }], [{
    key: "getInitialProps",
    value: function () {
      var _getInitialProps = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(_ref) {
        var assets, data, renderPage, page;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                assets = _ref.assets, data = _ref.data, renderPage = _ref.renderPage;
                _context.next = 3;
                return renderPage();

              case 3:
                page = _context.sent;
                return _context.abrupt("return", _objectSpread({
                  assets: assets,
                  data: data
                }, page));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getInitialProps(_x) {
        return _getInitialProps.apply(this, arguments);
      }

      return getInitialProps;
    }()
  }]);
  return Document;
}(_react.Component);

exports["default"] = Document;