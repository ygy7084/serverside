'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var Nfc = new Schema({
  name: String,
  shop: {
    id: { type: Schema.Types.ObjectId, ref: 'shop' },
    name: String
  },
  url: String
});

var model = _mongoose2.default.model('nfc', Nfc);

exports.default = model;