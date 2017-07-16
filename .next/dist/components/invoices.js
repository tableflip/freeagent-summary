'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var _ref$invoices = _ref.invoices,
      invoices = _ref$invoices === undefined ? [] : _ref$invoices;

  var _summariseInvoices = summariseInvoices(invoices),
      due = _summariseInvoices.due,
      overdue = _summariseInvoices.overdue,
      d90 = _summariseInvoices.d90;

  return _react2.default.createElement('div', { className: 'ma4', __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }, _react2.default.createElement('h3', { className: 'f5 ttu fw6', __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }, 'Invoices'), _react2.default.createElement('div', { className: 'cf nowrap', __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }, _react2.default.createElement('dl', { className: 'fl fn-l w-50 dib-l w-auto-l lh-title mr5-l', __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  }, _react2.default.createElement('dd', { className: 'f6 fw4 ml0', __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    }
  }, 'Due'), _react2.default.createElement('dd', { className: 'f3 fw6 ml0', __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    }
  }, (0, _accountingJs.formatMoney)(due, moneyFormat))), _react2.default.createElement('dl', { className: 'fl fn-l w-50 dib-l w-auto-l lh-title mr5-l', __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    }
  }, _react2.default.createElement('dd', { className: 'f6 fw4 ml0', __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    }
  }, 'of which Overdue'), _react2.default.createElement('dd', { className: 'f3 fw6 ml0', __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    }
  }, (0, _accountingJs.formatMoney)(overdue, moneyFormat))), _react2.default.createElement('dl', { className: 'fl fn-l w-50 dib-l w-auto-l lh-title mr5-l', __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    }
  }, _react2.default.createElement('dd', { className: 'f6 fw4 ml0', __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    }
  }, 'of which > 90d'), _react2.default.createElement('dd', { className: 'f3 fw6 ml0', __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    }
  }, (0, _accountingJs.formatMoney)(d90, moneyFormat)))));
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _accountingJs = require('accounting-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/home/richard/Node/freeagent-summary/components/invoices.js';


var moneyFormat = { symbol: '£', precision: 2 };

var d90Ago = 1000 * 60 * 60 * 24 * 90;

function summariseInvoices(invoices) {
  var d90CutOff = Date.now() - d90Ago;

  return invoices.reduce(function (summary, _ref2) {
    var due_value = _ref2.due_value,
        due_on = _ref2.due_on,
        status = _ref2.status;

    var dueValue = parseFloat(due_value);
    var dueOn = new Date(due_on).getTime();

    summary.due += dueValue;
    if (status === 'Overdue') summary.overdue += dueValue;
    if (dueOn < d90CutOff) summary.d90 += dueValue;

    return summary;
  }, { due: 0, overdue: 0, d90: 0 });
}