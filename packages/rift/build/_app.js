"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _getInitialData = _interopRequireDefault(require("./getInitialData"));

var _jsxFileName = "/Users/frendyguo/Developments/rift/packages/rift/src/_app.js";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var generateRandomKey = function generateRandomKey(pre) {
  return "".concat(pre, "_").concat(new Date().getTime() + Math.random());
};

var RiftApp =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(RiftApp, _Component);

  function RiftApp(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, RiftApp);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(RiftApp).call(this, props));
    _this.state = {
      data: props.data,
      isLoading: false,
      randomKey: null,
      prevProps: {}
    };
    return _this;
  }

  (0, _createClass2["default"])(RiftApp, [{
    key: "componentDidUpdate",
    value: function () {
      var _componentDidUpdate = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(prevProps) {
        var _this$props, location, history, routes, rest, navigated, randomKey, key, _ref, data, postFetchKey;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$props = this.props, location = _this$props.location, history = _this$props.history, routes = _this$props.routes, rest = (0, _objectWithoutProperties2["default"])(_this$props, ["location", "history", "routes"]);
                navigated = prevProps.location !== location;

                if (!navigated) {
                  _context.next = 11;
                  break;
                }

                randomKey = this.state.randomKey;
                key = randomKey;
                _context.next = 7;
                return (0, _getInitialData["default"])(routes, location.pathname, _objectSpread({
                  location: location,
                  history: history
                }, rest));

              case 7:
                _ref = _context.sent;
                data = _ref.data;
                // Prevent updating past, irrelevant data
                postFetchKey = this.state.randomKey;

                if (postFetchKey === key) {
                  this.setState({
                    data: data,
                    isLoading: false
                  });
                }

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidUpdate(_x) {
        return _componentDidUpdate.apply(this, arguments);
      }

      return componentDidUpdate;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          data = _this$state.data,
          isLoading = _this$state.isLoading;
      var _this$props2 = this.props,
          location = _this$props2.location,
          routes = _this$props2.routes;
      var initialData = data;
      return _react["default"].createElement(_reactRouterDom.Switch, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 91
        }
      }, data && data.statusCode && data.statusCode === 404 && _react["default"].createElement(_reactRouterDom.Route, {
        component: this.NotfoundComponent,
        path: location.pathname,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 93
        }
      }), data && data.redirectTo && _react["default"].createElement(_reactRouterDom.Redirect, {
        to: data.redirectTo,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 94
        }
      }), routes.map(function (route, index) {
        var key = "route-".concat(index);
        return _react["default"].createElement(_reactRouterDom.Route, {
          key: key,
          path: route.path,
          exact: route.exact,
          location: location,
          render: function render(props) {
            return _react["default"].createElement(route.component, _objectSpread({}, initialData, {
              isLoading: isLoading,
              history: props.history,
              location: location,
              match: props.match
            }));
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 99
          }
        });
      }));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var prevProps = prevState.prevProps; // Initially only set prev location

      if (!prevProps.location) {
        return {
          prevProps: {
            location: nextProps.location
          }
        };
      } // Reset all states on route change


      if (prevProps.location !== nextProps.location) {
        return {
          prevProps: {
            location: nextProps.location
          },
          data: null,
          isLoading: true,
          randomKey: generateRandomKey(nextProps.location.pathname)
        };
      }

      return null;
    }
  }]);
  return RiftApp;
}(_react.Component);

var _default = (0, _reactRouterDom.withRouter)(RiftApp);

exports["default"] = _default;