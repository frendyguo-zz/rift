"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _jsxFileName = "/Users/frendyguo/Developments/rift/packages/rift/src/_404.js";

var NotFound =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(NotFound, _Component);

  function NotFound() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, NotFound);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(NotFound)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {});
    return _this;
  }

  (0, _createClass2["default"])(NotFound, [{
    key: "render",
    value: function render() {
      return _react["default"].createElement(_reactRouterDom.Route, {
        render: function render(_ref) {
          var staticContext = _ref.staticContext;
          if (staticContext) staticContext.statusCode = 404;
          return _react["default"].createElement("div", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 12
            }
          }, "404 Page Not Found");
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 9
        }
      });
    }
  }]);
  return NotFound;
}(_react.Component);

var _default = NotFound;
exports["default"] = _default;