'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var Product = new Schema({
  name: String,
  pictures: [String],
  price: Number,
  description: String,
  shop: {
    id: { type: Schema.Types.ObjectId, ref: 'shop' },
    name: String
  },
  nutrients: [{
    name: String,
    value: String
  }],
  options: [{
    name: String,
    selections: [{
      name: String,
      price: Number,
      canBeMany: Boolean
    }]
  }]
});

var model = _mongoose2.default.model('product', Product);

exports.default = model;