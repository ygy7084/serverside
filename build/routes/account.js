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
username: String,
  password: String,
  connectedShops: [
  {
    id: {type: Schema.Types.ObjectId, ref: 'shop'},
    name: String,
  }
],
  level : String,
*/
//계정 생성
router.post('/', function (req, res) {
  var accountTemp = {
    username: req.body.data.username,
    password: req.body.data.password,
    connectedShops: req.body.data.connectedShops,
    level: req.body.data.level
  };

  var account = new _models.Account(accountTemp);
  account.save(function (err, result) {
    if (err) {
      return res.status(500).json({ message: '계정 생성 오류:' });
    }
    return res.json({
      data: result
    });
  });

  return null;
});

//계정 리스트 조회
router.get('/', function (req, res) {
  _models.Account.find({}).exec(function (err, result) {
    if (err) {
      return res.status(500).json({ message: "계정 리스트 조회 오류 " });
    }
    return res.json({
      data: result
    });
  });
});

//계정 단일 조회
router.get('/:id', function (req, res) {
  _models.Account.findOne({ _id: req.params.id }).lean().exec(function (err, result) {
    if (err) {
      return res.status(500).json({ message: '계정 조회 오류' });
    }
    return res.json({
      data: result
    });
  });
});

//계정 수정
router.put('/:_id', function (req, res) {
  if (!req.params._id) {
    return res.status(500).json({ message: '계정 수정 오류: _id가 전송되지 않았습니다.' });
  }

  var properties = ['username', 'password', 'connectedShops', 'level'];
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

  _models.Account.findOneAndUpdate({ _id: req.params._id }, update, function (err, result) {
    if (err) {
      return res.status(500).json({ message: "계정 수정 오류 " });
    }
    return res.json({
      data: result
    });
  });
  return null;
});

//계정 삭제
router.delete('/:_id', function (req, res) {
  if (!req.params._id) {
    return res.status(500).json({ message: '계정 삭제 오류: _id가 전송되지 않았습니다.' });
  }
  _models.Account.findOneAndRemove({ _id: req.params._id }, function (err, result) {
    return res.json({
      data: result
    });
  });
  return null;
});

// 계정 전체 삭제
router.delete('/', function (req, res) {
  _models.Account.deleteMany({}, function (err) {
    if (err) {
      return res.status(500).json({ message: '계정 삭제 오류: DB 삭제에 문제가 있습니다.' });
    }
    res.json({
      message: '삭제완료'
    });
  });
  return null;
});

exports.default = router;