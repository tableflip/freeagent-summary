'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _freeagent = require('../lib/freeagent');

var _company = require('./company');

var _company2 = _interopRequireDefault(_company);

var _accounts = require('./accounts');

var _accounts2 = _interopRequireDefault(_accounts);

var _invoices = require('./invoices');

var _invoices2 = _interopRequireDefault(_invoices);

var _incomeTrend = require('./income-trend');

var _incomeTrend2 = _interopRequireDefault(_incomeTrend);

var _outflows = require('./outflows');

var _outflows2 = _interopRequireDefault(_outflows);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/home/richard/Node/freeagent-summary/components/dashboard.js';


var Dashboard = function Dashboard(_ref) {
  var company = _ref.company,
      bankAccounts = _ref.bankAccounts,
      overdueInvoices = _ref.overdueInvoices,
      income = _ref.income,
      expenses = _ref.expenses,
      categories = _ref.categories;

  return _react2.default.createElement('div', { className: 'flex flex-column mw9 center', __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }, company ? _react2.default.createElement(_company2.default, { company: company.company, __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }) : null, _react2.default.createElement('div', { className: 'flex flex-row flex-wrap justify-around', __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }, bankAccounts ? _react2.default.createElement(_accounts2.default, { accounts: bankAccounts.bank_accounts, __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  }) : null, overdueInvoices ? _react2.default.createElement(_invoices2.default, { invoices: overdueInvoices.invoices, __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    }
  }) : null, income ? _react2.default.createElement(_incomeTrend2.default, { invoices: income.invoices, __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    }
  }) : null, bankAccounts && categories ? _react2.default.createElement(_outflows2.default, { accounts: bankAccounts.bank_accounts, categories: categories, __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    }
  }) : null));
};

exports.default = (0, _freeagent.connectComponent)(function () {
  return [{ key: 'company', endpoint: 'company' }, { key: 'bankAccounts', endpoint: 'bank_accounts' }, { key: 'overdueInvoices', endpoint: 'invoices?view=open_or_overdue', paging: true }, { key: 'income', endpoint: 'invoices?view=last_6_months', paging: true }, { key: 'categories', endpoint: 'categories' }];
})(Dashboard);