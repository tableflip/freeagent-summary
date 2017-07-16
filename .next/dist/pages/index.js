'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _head = require('next/dist/lib/head.js');

var _head2 = _interopRequireDefault(_head);

var _dashboard = require('../components/dashboard');

var _dashboard2 = _interopRequireDefault(_dashboard);

var _config = require('../lib/config');

var _config2 = _interopRequireDefault(_config);

var _freeagent = require('../lib/freeagent');

var _freeagent2 = _interopRequireDefault(_freeagent);

var _stateUtils = require('../lib/state-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/home/richard/Node/freeagent-summary/pages/index.js?entry';


var Home = function (_Component) {
  (0, _inherits3.default)(Home, _Component);

  function Home() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Home);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Home.__proto__ || (0, _getPrototypeOf2.default)(Home)).call.apply(_ref, [this].concat(args))), _this), _this.state = { freeagent: null }, _this.connectToFreeagent = function (evt) {
      evt.preventDefault();
      var _window$location = window.location,
          protocol = _window$location.protocol,
          host = _window$location.host;

      var redirectUri = protocol + '//' + host + '/oauth';
      var oauthUrl = _url2.default.format({
        protocol: 'https:',
        host: 'api.freeagent.com',
        pathname: '/v2/approve_app',
        query: {
          redirect_uri: redirectUri,
          response_type: 'code',
          client_id: _config2.default.clientId,
          state: window.oauthState
        }
      });
      window.location = oauthUrl;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Home, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return { freeagent: this.state.freeagent };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({ freeagent: (0, _freeagent2.default)() });
    }
  }, {
    key: 'render',
    value: function render() {
      var state = this.props.state;
      var freeagent = this.state.freeagent;

      return _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 51
        }
      }, state ? _react2.default.createElement(_head2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 52
        }
      }, _react2.default.createElement('script', { dangerouslySetInnerHTML: { __html: 'window.oauthState=\'' + state + '\'' }, __source: {
          fileName: _jsxFileName,
          lineNumber: 52
        }
      })) : null, freeagent ? _react2.default.createElement(_dashboard2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 54
        }
      }) : _react2.default.createElement('a', { href: '#', onClick: this.connectToFreeagent, __source: {
          fileName: _jsxFileName,
          lineNumber: 55
        }
      }, 'Connect to Freeagent'));
    }
  }], [{
    key: 'getInitialProps',
    value: function getInitialProps() {
      return (0, _stateUtils.makeState)();
    }
  }]);

  return Home;
}(_react.Component);

Home.childContextTypes = {
  freeagent: _react2.default.PropTypes.object
};

exports.default = Home;