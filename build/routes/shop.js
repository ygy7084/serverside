'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _models = require('../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

//매장 생성
router.post('/', function (req, res) {
  var shopTemp = {
    name: req.body.data.name,
    phone: req.body.data.phone
  };

  var shop = new _models.Shop(shopTemp);
  shop.save(function (err, result) {
    if (err) {
      return res.status(500).json({ message: '매장 생성 오류:' });
    }
    return res.json({
      data: result
    });
  });

  return null;
});

//매장 리스트 반환
router.get('/', function (req, res) {
  _models.Shop.find({}).exec(function (err, result) {
    if (err) {
      return res.status(500).json({ message: "매장 리스트 조회 오류 " });
    }
    return res.json({
      data: result
    });
  });
});

//매장 반환
router.get('/:id', function (req, res) {
  _models.Shop.findOne({ _id: req.params.id }).lean().exec(function (err, result) {
    if (err) {
      return res.status(500).json({ message: '매장 조회 오류' });
    }
    return res.json({
      data: result
    });
  });
});

//매장 수정
router.put('/:_id', function (req, res) {
  if (!req.params._id) {
    return res.status(500).json({ message: '매장 수정 오류: _id가 전송되지 않았습니다.' });
  }

  var properties = ['name', 'phone'];
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

  _models.Shop.findOneAndUpdate({ _id: req.params._id }, update, function (err, result) {
    if (err) {
      return res.status(500).json({ message: "매장 수정 오류 " });
    }
    return res.json({
      data: result
    });
  });
  return null;
});

//매장 삭제
/*
router.delete('/:_id', (req, res) => {
  if (!req.params._id) {
    return res.status(500).json({ message: '매장 삭제 오류: _id가 전송되지 않았습니다.' });
  }
  Shop.findOneAndRemove(
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
    return res.status(500).json({ message: 'shop 삭제 오류: _id가 전송되지 않았습니다.' });
  }
  if (Array.isArray(req.body.data._id)) {
    // id 배열이 들어오면
    _models.Shop.deleteMany({ _id: req.body.data._id }, function (err) {
      if (err) {
        return res.status(500).json({ message: 'shop 삭제 오류: DB 삭제에 문제가 있습니다.' });
      }
      res.json({
        message: '삭제완료'
      });
    });
  } else {
    _models.Shop.findOneAndRemove({ _id: req.body.data._id }, function (err, result) {
      return res.json({
        data: result
      });
    });
  }
  return null;
});

// 매장 전체 삭제
router.delete('/all', function (req, res) {
  _models.Shop.deleteMany({}, function (err) {
    if (err) {
      return res.status(500).json({ message: '매장 삭제 오류: DB 삭제에 문제가 있습니다.' });
    }
    res.json({
      message: '삭제완료'
    });
  });
  return null;
});

exports.default = router;