'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var creds = window.localStorage.getItem('freeagent');
  if (!creds) return null;
  creds = JSON.parse(creds);
  if (creds.expires_at && creds.expires_at < Date.now()) {
    window.localStorage.removeItem('freeagent');
    return null;
  }

  var _creds = creds,
      access_token = _creds.access_token;

  function get(_ref) {
    var url = _ref.url,
        endpoint = _ref.endpoint;

    if (!url) url = freeagentApi.domain + '/' + freeagentApi.root + '/' + endpoint;
    return fetch(url, {
      headers: {
        Authorization: 'Bearer ' + access_token
      }
    }).then(function (res) {
      var json = res.json();
      if (!res.ok) return _promise2.default.reject(json);
      return json;
    });
  }

  return {
    get: get
  };
};

exports.saveCredentials = saveCredentials;
exports.connectComponent = connectComponent;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _urlParse = require('url-parse');

var _urlParse2 = _interopRequireDefault(_urlParse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/home/richard/Node/freeagent-summary/lib/freeagent.js';


var freeagentApi = {
  domain: 'https://api.freeagent.com',
  root: 'v2'
};

function saveCredentials(creds) {
  if (!creds.expires_at && creds.expires_in) {
    creds.expires_at = creds.expires_in * 1000 + Date.now();
  }
  window.localStorage.setItem('freeagent', (0, _stringify2.default)(creds));
}

function connectComponent(data) {
  return function (WrappedComponent) {
    var _class, _temp2;

    return _temp2 = _class = function (_Component) {
      (0, _inherits3.default)(ConnectComponent, _Component);

      function ConnectComponent() {
        var _ref2;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, ConnectComponent);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref2 = ConnectComponent.__proto__ || (0, _getPrototypeOf2.default)(ConnectComponent)).call.apply(_ref2, [this].concat(args))), _this), _this.state = {}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
      }

      (0, _createClass3.default)(ConnectComponent, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          var _this2 = this;

          var freeagent = this.context.freeagent;

          var _data = typeof data === 'function' ? data(this.props) : data;
          _data = _data instanceof Array ? _data : [_data];

          _data.map(function (_ref3) {
            var key = _ref3.key,
                endpoint = _ref3.endpoint,
                paging = _ref3.paging;

            var url = (0, _urlParse2.default)(freeagentApi.root + '/' + endpoint, freeagentApi.domain, true);
            var pagedResults = [];

            var getPages = function getPages(urlObj) {
              var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

              var thisUrl = (0, _urlParse2.default)(urlObj.toString(), true);
              thisUrl.query = (0, _extends3.default)({}, thisUrl.query, { page: page, per_page: 100 });

              freeagent.get({ url: thisUrl.toString() }).then(function (data) {
                var resKey = (0, _keys2.default)(data)[0];
                pagedResults = pagedResults.concat(data[resKey]);
                if (data[resKey].length < 100) return _this2.setState((0, _defineProperty3.default)({}, key, (0, _defineProperty3.default)({}, resKey, pagedResults)));
                getPages(urlObj, page + 1);
              });
            };

            if (paging) {
              return getPages(url);
            }

            freeagent.get({ url: url.toString() }).then(function (data) {
              return _this2.setState((0, _defineProperty3.default)({}, key, data));
            });
          });
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(WrappedComponent, (0, _extends3.default)({}, this.props, this.state, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 86
            }
          }));
        }
      }]);

      return ConnectComponent;
    }(_react.Component), _class.contextTypes = {
      freeagent: _react2.default.PropTypes.object
    }, _temp2;
  };
}