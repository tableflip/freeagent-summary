'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var _ref$invoices = _ref.invoices,
      invoices = _ref$invoices === undefined ? [] : _ref$invoices;

  var trends = calculateTrends(invoices);

  return _react2.default.createElement('div', { className: 'ma4', __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }, _react2.default.createElement('h3', { className: 'f5 ttu fw6', __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }, 'Income Trend'), _react2.default.createElement('div', { className: 'cf nowrap', __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }, trends.map(function (_ref2) {
    var monthsAgo = _ref2.monthsAgo,
        rate = _ref2.rate;

    return _react2.default.createElement('dl', { key: monthsAgo, className: 'fl fn-l w-50 dib-l w-auto-l lh-title mr5-l', __source: {
        fileName: _jsxFileName,
        lineNumber: 13
      }
    }, _react2.default.createElement('dd', { className: 'f6 fw4 ml0', __source: {
        fileName: _jsxFileName,
        lineNumber: 14
      }
    }, 'Last ', monthsAgo, ' months'), _react2.default.createElement('dd', { className: 'f3 fw6 ml0', __source: {
        fileName: _jsxFileName,
        lineNumber: 15
      }
    }, (0, _accountingJs.formatMoney)(rate, { symbol: '£', precision: 2 })));
  })));
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _accountingJs = require('accounting-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/home/richard/Node/freeagent-summary/components/income-trend.js';


var oneMonth = 1000 * 60 * 60 * 24 * 30;

function calculateTrends(invoices) {
  return [1, 2, 3, 6].map(function (monthsAgo) {
    var timeAgo = oneMonth * monthsAgo;
    var minTime = Date.now() - timeAgo;

    return {
      monthsAgo: monthsAgo,
      rate: invoices.reduce(function (total, _ref3) {
        var dated_on = _ref3.dated_on,
            net_value = _ref3.net_value;

        var datedOn = new Date(dated_on).getTime();
        if (datedOn > minTime) total += parseFloat(net_value);
        return total;
      }, 0) * 365 / (30 * monthsAgo)
    };
  });
}