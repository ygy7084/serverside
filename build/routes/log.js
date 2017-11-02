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
  ip: String,
  httpMethod: String,
  url: String,
  userAgent: String,
  dataFromClient: {
    data: String,
    value: String
  },
  datetime: Date,
  error : String,
  httpCode: String,
  message: String
 */

//log 생성
router.post('/', function (req, res) {
  var logTemp = {
    username: req.body.data.username,
    ip: req.body.data.ip,
    httpMethod: req.body.data.httpMethod,
    url: req.body.data.url,
    userAgent: req.body.data.userAgent,
    dataFromClient: req.body.data.dataFromClient,
    datetime: req.body.data.datetime,
    error: req.body.data.error,
    httpCode: req.body.data.httpCode,
    message: req.body.data.message
  };

  var log = new _models.Log(logTemp);
  log.save(function (err, result) {
    if (err) {
      return res.status(500).json({ message: 'log 생성 오류:' });
    }
    return res.json({
      data: result
    });
  });

  return null;
});

//log 리스트 반환
router.get('/', function (req, res) {
  _models.Log.find({}).exec(function (err, result) {
    if (err) {
      return res.status(500).json({ message: "log 리스트 조회 오류 " });
    }
    return res.json({
      data: result
    });
  });
});

//log 반환
router.get('/:id', function (req, res) {
  _models.Log.findOne({ _id: req.params.id }).lean().exec(function (err, result) {
    if (err) {
      return res.status(500).json({ message: 'log 조회 오류' });
    }
    return res.json({
      data: result
    });
  });
});

//log 삭제
router.delete('/:_id', function (req, res) {
  if (!req.params._id) {
    return res.status(500).json({ message: 'log 삭제 오류: _id가 전송되지 않았습니다.' });
  }
  _models.Log.findOneAndRemove({ _id: req.params._id }, function (err, result) {
    return res.json({
      data: result
    });
  });
  return null;
});

// log 전체 삭제
router.delete('/', function (req, res) {
  _models.Log.deleteMany({}, function (err) {
    if (err) {
      return res.status(500).json({ message: 'log 전체 삭제 오류: DB 삭제에 문제가 있습니다.' });
    }
    res.json({
      message: '삭제완료'
    });
  });
  return null;
});

exports.default = router;