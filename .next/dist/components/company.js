'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var _ref$company = _ref.company,
      company = _ref$company === undefined ? {} : _ref$company;
  var name = company.name,
      town = company.town,
      country = company.country;

  return _react2.default.createElement('header', { className: 'tc pv4 pv5-ns', __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    }
  }, _react2.default.createElement('img', { src: 'https://tableflip.io/img/tableflip.min.svg', className: 'br3 h3 w3', alt: 'avatar', __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    }
  }), _react2.default.createElement('h1', { className: 'f5 f4-ns fw6', __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }, name), _react2.default.createElement('h2', { className: 'f6 fw2 ttu tracked', __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }, town, ', ', country));
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/home/richard/Node/freeagent-summary/components/company.js';