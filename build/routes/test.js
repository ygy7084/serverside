'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/test1', function (req, res) {

  var food = [];
  food.push({ id: 1, name: '토피 넛 크런치 라떼' });

  console.log('확인');
  res.json(food);
});

router.get('/test2/:name', function (req, res) {});

exports.default = router;