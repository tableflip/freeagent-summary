'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var _ref$accounts = _ref.accounts,
      accounts = _ref$accounts === undefined ? [] : _ref$accounts;

  return _react2.default.createElement('div', { className: 'ma4', __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    }
  }, _react2.default.createElement('h3', { className: 'f5 ttu fw6', __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    }
  }, 'Balances'), _react2.default.createElement('table', { className: 'collapse', __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }, _react2.default.createElement('tbody', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }, accounts.map(renderAccount))));
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _accountingJs = require('accounting-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/home/richard/Node/freeagent-summary/components/accounts.js';


function renderAccount(_ref2) {
  var bank_name = _ref2.bank_name,
      name = _ref2.name,
      current_balance = _ref2.current_balance;

  return _react2.default.createElement('tr', { className: 'fw2', key: name, __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    }
  }, _react2.default.createElement('td', { className: 'pv2 pr3', __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    }
  }, name), _react2.default.createElement('td', { className: 'pv2 ph3 i', __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    }
  }, bank_name), _react2.default.createElement('td', { className: 'pv2 pl3 tr fw6 f3', __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    }
  }, (0, _accountingJs.formatMoney)(parseFloat(current_balance), { symbol: '£', precision: 2 })));
}