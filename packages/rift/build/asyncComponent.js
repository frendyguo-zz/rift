"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = asyncComponent;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _jsxFileName = "/Users/frendyguo/Developments/rift/packages/rift/src/asyncComponent.js";

function asyncComponent(_ref) {
  var _temp;

  var loader = _ref.loader,
      Placeholder = _ref.Placeholder;
  var LoadedComponent = null;
  return _temp =
  /*#__PURE__*/
  function (_React$Component) {
    (0, _inherits2["default"])(AsyncComponent, _React$Component);
    (0, _createClass2["default"])(AsyncComponent, null, [{
      key: "load",
      value: function load() {
        return loader().then(function (Comp) {
          LoadedComponent = Comp["default"] || Comp;
        });
      }
    }, {
      key: "getInitialProps",
      value: function getInitialProps(ctx) {
        if (!LoadedComponent) {
          return null;
        }

        return LoadedComponent.getInitialProps ? LoadedComponent.getInitialProps(ctx) : Promise.resolve(null);
      }
    }]);

    function AsyncComponent(props) {
      var _this;

      (0, _classCallCheck2["default"])(this, AsyncComponent);
      _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(AsyncComponent).call(this, props));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "updateComp", function () {
        var Component = _this.state.Component;

        if (Component !== LoadedComponent) {
          _this.setState({
            Component: LoadedComponent
          });
        }
      });
      _this.state = {
        Component: LoadedComponent
      };
      return _this;
    }

    (0, _createClass2["default"])(AsyncComponent, [{
      key: "componentDidMount",
      value: function () {
        var _componentDidMount = (0, _asyncToGenerator2["default"])(
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee() {
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  AsyncComponent.load().then(this.updateComp);

                case 1:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function componentDidMount() {
          return _componentDidMount.apply(this, arguments);
        }

        return componentDidMount;
      }()
    }, {
      key: "render",
      value: function render() {
        var Component = this.state.Component;

        if (Component) {
          return _react["default"].createElement(Component, (0, _extends2["default"])({}, this.props, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 48
            }
          }));
        }

        if (Placeholder) {
          return _react["default"].createElement(Placeholder, (0, _extends2["default"])({}, this.props, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 52
            }
          }));
        }

        return null;
      }
    }]);
    return AsyncComponent;
  }(_react["default"].Component), _temp;
}