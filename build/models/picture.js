'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var Picture = new Schema({
  fileName: String,
  fileDir: String,
  shopId: { type: Schema.Types.ObjectId, ref: 'shop' },
  size: String
});

var model = _mongoose2.default.model('picture', Picture);

exports.default = model;