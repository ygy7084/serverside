'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _models = require('../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
/*
  shop: {
    id: {type: Schema.Types.ObjectId, ref: 'shop'},
    name: String,
  },
  products:[
    {
      name: String,
      id : {type: Schema.Types.ObjectId, ref: 'product'},
      price: Number,
      options: [
        {
          name: String,
          amount: Number,
        }
      ]
    }
  ],
  customer:{
    id : {type: Schema.Types.ObjectId, ref:'customer'},
    name: String,
    phone: String,
  },
  nfc:{
    id : {type: Schema.Types.ObjectId, ref:'nfc'},
    name: String,
  },
  place: String,
  orderedWay: String,
  datetime : Date,
  payment: [
    {
      name:String,
      value: Number,
    }
  ],
  message: String,
  status: Number,
 */

//주문 생성
router.post('/', function (req, res) {
  var orderTemp = {
    shop: req.body.data.shop,
    products: req.body.data.products,
    customer: req.body.data.customer,
    nfc: req.body.data.nfc,
    place: req.body.data.place,
    orderedWay: req.body.data.place,
    datetime: req.body.data.datetime,
    payment: req.body.data.payment,
    message: req.body.data.message,
    status: req.body.data.status
  };

  var order = new _models.Order(orderTemp);
  order.save(function (err, result) {
    if (err) {
      return res.status(500).json({ message: '주문 생성 오류:' });
    }
    return res.json({
      data: result
    });
  });

  return null;
});

//order 리스트 조회
router.get('/', function (req, res) {
  _models.Order.find({}).exec(function (err, result) {
    if (err) {
      return res.status(500).json({ message: "주문 리스트 조회 오류 " });
    }
    return res.json({
      data: result
    });
  });
});

//order 조회
router.get('/:id', function (req, res) {
  _models.Order.findOne({ _id: req.params.id }).lean().exec(function (err, result) {
    if (err) {
      return res.status(500).json({ message: '주문 조회 오류' });
    }
    return res.json({
      data: result
    });
  });
});

//주문 수정
router.put('/:_id', function (req, res) {
  if (!req.params._id) {
    return res.status(500).json({ message: '주문 수정 오류: _id가 전송되지 않았습니다.' });
  }

  var properties = ['shop', 'products', 'customer', 'nfc', 'place', 'orderedWay', 'datetime', 'payment', 'message', 'status'];
  var update = { $set: {} };
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = properties[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var property = _step.value;

      if (Object.prototype.hasOwnProperty.call(req.body.data, property)) {
        update.$set[property] = req.body.data[property];
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  _models.Order.findOneAndUpdate({ _id: req.params._id }, update, function (err, result) {
    if (err) {
      return res.status(500).json({ message: "주문 수정 오류 " });
    }
    return res.json({
      data: result
    });
  });
  return null;
});

//주문 삭제
/*
router.delete('/:_id', (req, res) => {
  if (!req.params._id) {
    return res.status(500).json({ message: '주문 삭제 오류: _id가 전송되지 않았습니다.' });
  }
  Order.findOneAndRemove(
    { _id: req.params._id },
    (err, result) =>
      res.json({
        data: result,
      }),
  );
  return null;
});
*/
router.delete('/', function (req, res) {

  if (!req.body.data._id) {
    return res.status(500).json({ message: 'order 삭제 오류: _id가 전송되지 않았습니다.' });
  }
  if (Array.isArray(req.body.data._id)) {
    // id 배열이 들어오면
    _models.Order.deleteMany({ _id: req.body.data._id }, function (err) {
      if (err) {
        return res.status(500).json({ message: 'order 삭제 오류: DB 삭제에 문제가 있습니다.' });
      }
      res.json({
        message: '삭제완료'
      });
    });
  } else {
    _models.Order.findOneAndRemove({ _id: req.body.data._id }, function (err, result) {
      return res.json({
        data: result
      });
    });
  }
  return null;
});

// 주문 전체 삭제
router.delete('/all', function (req, res) {
  _models.Order.deleteMany({}, function (err) {
    if (err) {
      return res.status(500).json({ message: '주문 삭제 오류: DB 삭제에 문제가 있습니다.' });
    }
    res.json({
      message: '삭제완료'
    });
  });
  return null;
});

exports.default = router;