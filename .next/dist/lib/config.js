'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _config = require('../config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (typeof window === 'undefined') {
  require('dotenv').config();
}

var configPrivate = {};
if (process.env.CLIENT_SECRET) {
  configPrivate.clientSecret = process.env.CLIENT_SECRET;
}

exports.default = (0, _extends3.default)({}, _config2.default, configPrivate);