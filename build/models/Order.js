'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var Order = new Schema({
  shop: {
    id: { type: Schema.Types.ObjectId, ref: 'shop' },
    name: String
  },
  products: [{
    name: String,
    id: { type: Schema.Types.ObjectId, ref: 'product' },
    price: Number,
    options: [{
      name: String,
      amount: Number
    }]
  }],
  customer: {
    id: { type: Schema.Types.ObjectId, ref: 'customer' },
    name: String,
    phone: String
  },
  nfc: {
    id: { type: Schema.Types.ObjectId, ref: 'nfc' },
    name: String
  },
  place: String,
  orderedWay: String,
  datetime: Date,
  payment: [{
    name: String,
    value: Number
  }],
  messages: [{
    name: String,
    phone: String,
    kind: String,
    id: { type: Schema.Types.ObjectId, refPath: 'messages.kind' },
    message: String
  }],
  unreadMessages: Number,
  status: Number
});

var model = _mongoose2.default.model('order', Order);

exports.default = model;