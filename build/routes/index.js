'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _account = require('./account');

var _account2 = _interopRequireDefault(_account);

var _shop = require('./shop');

var _shop2 = _interopRequireDefault(_shop);

var _customer = require('./customer');

var _customer2 = _interopRequireDefault(_customer);

var _product = require('./product');

var _product2 = _interopRequireDefault(_product);

var _history = require('./history');

var _history2 = _interopRequireDefault(_history);

var _test = require('./test1');

var _test2 = _interopRequireDefault(_test);

var _picture = require('./picture');

var _picture2 = _interopRequireDefault(_picture);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/account', _account2.default);
router.use('/shop', _shop2.default);
router.use('/customer', _customer2.default);
router.use('/product', _product2.default);
router.use('/history', _history2.default);
router.use('/test1', _test2.default);
router.use('/picture', _picture2.default);

exports.default = router;