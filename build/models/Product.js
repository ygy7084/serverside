'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var Product = new _mongoose2.default.Schema({
  name: String,
  price: String,
  shop: { type: Schema.Types.ObjectId, ref: 'shop' },
  image: String
});

var model = _mongoose2.default.model('product', Product);

exports.default = model;