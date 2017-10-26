'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var History = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'product' },
  shop: { type: Schema.Types.ObjectId, ref: 'shop' },
  customer: { type: Schema.Types.ObjectId, ref: 'customer' },
  datetime: Date
});

var model = _mongoose2.default.model('history', History);

exports.default = model;