'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeState = makeState;
exports.checkState = checkState;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crypto = require('crypto');
var stateTokens = [];

function makeState() {
  return new _promise2.default(function (resolve, reject) {
    crypto.randomBytes(48, function (err, buffer) {
      if (err) return reject(err);
      var state = buffer.toString('hex');
      stateTokens.push(state);
      resolve({ state: state });
    });
  });
}

function checkState(state) {
  console.log('Checking state', stateTokens, state);
  var ind = stateTokens.indexOf(state);
  if (ind === -1) throw new Error('Invalid state token');
  stateTokens.splice(ind, 1);
  return true;
}