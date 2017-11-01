'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var Log = new Schema({
  username: String,
  ip: String,
  httpMethod: String,
  url: String,
  userAgent: String,
  dataFromClient: {
    data: String,
    value: String
  },
  datetime: Date,
  error: String,
  httpCode: String,
  message: String
});

var model = _mongoose2.default.model('log', Log);

exports.default = model;