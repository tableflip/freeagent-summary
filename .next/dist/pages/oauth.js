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

var _index = require('next/dist/lib/router/index.js');

var _index2 = _interopRequireDefault(_index);

var _urlParse = require('url-parse');

var _urlParse2 = _interopRequireDefault(_urlParse);

var _config = require('../lib/config');

var _config2 = _interopRequireDefault(_config);

var _freeagent = require('../lib/freeagent');

var _stateUtils = require('../lib/state-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/home/richard/Node/freeagent-summary/pages/oauth.js?entry';


var isServer = typeof window === 'undefined';
var request = isServer ? require('request-promise') : null;

var OAuth = function (_Component) {
  (0, _inherits3.default)(OAuth, _Component);

  function OAuth() {
    (0, _classCallCheck3.default)(this, OAuth);

    return (0, _possibleConstructorReturn3.default)(this, (OAuth.__proto__ || (0, _getPrototypeOf2.default)(OAuth)).apply(this, arguments));
  }

  (0, _createClass3.default)(OAuth, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      (0, _freeagent.saveCredentials)(this.props.freeagent);
      _index2.default.push('/');
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 49
        }
      }, 'LOADING');
    }
  }], [{
    key: 'getInitialProps',
    value: function getInitialProps(_ref) {
      var query = _ref.query,
          req = _ref.req;

      (0, _stateUtils.checkState)(query.state);

      var clientId = _config2.default.clientId,
          clientSecret = _config2.default.clientSecret;

      var urlParts = (0, _urlParse2.default)(req.url, true);
      var redirectUri = 'http' + (req.connection.encrypted ? 's' : '') + '://' + req.headers.host + urlParts.pathname;

      var opts = {
        method: 'POST',
        uri: 'https://api.freeagent.com/v2/token_endpoint',
        auth: {
          user: clientId,
          pass: clientSecret
        },
        form: {
          grant_type: 'authorization_code',
          code: query.code,
          redirect_uri: redirectUri
        },
        json: true
      };

      return request(opts).then(function (res) {
        return { freeagent: res };
      }).catch(function (err) {
        return { error: err };
      });
    }
  }]);

  return OAuth;
}(_react.Component);

exports.default = OAuth;