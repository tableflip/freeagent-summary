'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _freeagent = require('../lib/freeagent');

var _accountingJs = require('accounting-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/home/richard/Node/freeagent-summary/components/outflows.js';


var moneyFormat = { symbol: '£', precision: 2 };
var filters = [/HMRC VAT/];

function Outflows(data) {
  var pseudoArray = (0, _extends3.default)({}, data, { length: data.accounts.length });
  var _categories = data.categories;
  var categories = (0, _keys2.default)(_categories).reduce(function (categories, section) {
    return categories.concat(_categories[section]);
  }, []);
  var transactions = Array.prototype.reduce.call(pseudoArray, function (allTrans, account) {
    return allTrans.concat(account.bank_transactions);
  }, []);
  if (!transactions.length) return null;
  var annualised = annualiseOutflows(transactions, categories);
  return _react2.default.createElement('div', { className: 'ma4', __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    }
  }, _react2.default.createElement('h3', { className: 'f5 ttu fw6', __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    }
  }, 'Outflows'), _react2.default.createElement('div', { className: 'cf nowrap', __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    }
  }, _react2.default.createElement('dl', { className: 'fl fn-l w-50 dib-l w-auto-l lh-title mr5-l', __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    }
  }, _react2.default.createElement('dd', { className: 'f6 fw4 ml0', __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    }
  }, 'Annualised'), _react2.default.createElement('dd', { className: 'f3 fw6 ml0', __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    }
  }, (0, _accountingJs.formatMoney)(annualised, moneyFormat))), _react2.default.createElement('dl', { className: 'fl fn-l w-50 dib-l w-auto-l lh-title mr5-l', __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    }
  }, _react2.default.createElement('dd', { className: 'f6 fw4 ml0', __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    }
  }, 'Monthly'), _react2.default.createElement('dd', { className: 'f3 fw6 ml0', __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    }
  }, (0, _accountingJs.formatMoney)(annualised / 12, moneyFormat)))));
}

exports.default = (0, _freeagent.connectComponent)(function (_ref) {
  var accounts = _ref.accounts;

  var sixMonthsAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * 6).toISOString().substr(0, 10);
  var threeMonthsAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * 6).toISOString().substr(0, 10);
  return accounts.map(function (_ref2, ind) {
    var url = _ref2.url;
    return {
      key: ind,
      endpoint: 'bank_transactions?bank_account=' + url + '&from_date=' + threeMonthsAgo,
      paging: true
    };
  });
})(Outflows);


function annualiseOutflows(transactions, categories) {
  var start = Date.now() - 1000 * 60 * 60 * 24 * 60;
  console.log(transactions.filter(function (t) {
    if (parseFloat(t.amount) > -1000) return false;
    if (new Date(t.datedOn).getTime() > start) return false;
    return true;
  }));
  return transactions.reduce(function (total, _ref3) {
    var amount = _ref3.amount,
        description = _ref3.description;

    if (filters.some(function (f) {
      return f.test(description);
    })) return total;
    var amountNum = parseFloat(amount);
    if (amountNum < 0) total += amountNum;
    var unexplainedAmount = parseFloat(unexplainedAmount);
    if (amountNum < 0 && unexplainedAmount < 0) total -= unexplainedAmount;
    return total;
  }, 0) * 365 / 180;
}