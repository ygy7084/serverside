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
fileName: String,
  fileDir: String,
  shopId : {type: Schema.Types.ObjectId, ref:'shop'},
  size: String,
 */

//사진 생성
router.post('/', function (req, res) {
  var pictureTemp = {
    fileName: req.body.data.fileName,
    fileDir: req.body.data.fileDir,
    shopId: req.body.data.shopId,
    size: req.body.data.size
  };

  var picture = new _models.Picture(pictureTemp);
  picture.save(function (err, result) {
    if (err) {
      return res.status(500).json({ message: '사진 생성 오류:' });
    }
    return res.json({
      data: result
    });
  });

  return null;
});

//사진 다중 생성
router.post('/many', function (req, res) {
  var picturesTemp = [];
  for (var k in req.body.data) {
    picturesTemp.push({
      fileName: req.body.data[k].fileName,
      fileDir: req.body.data[k].fileDir,
      shopId: req.body.data[k].shopId,
      size: req.body.data[k].size
    });
  }

  _models.Picture.insertMany(picturesTemp, function (err, result) {
    if (err) {
      return res.status(500).json({ message: '사진 다중 생성 오류:' });
    }
    return res.json({
      data: result
    });
  });

  return null;
});

//사진 리스트 조회
router.get('/', function (req, res) {
  _models.Picture.find({}).exec(function (err, result) {
    if (err) {
      return res.status(500).json({ message: "사진 리스트 조회 오류 " });
    }
    return res.json({
      data: result
    });
  });
});

//사진 개별 조회
router.get('/:id', function (req, res) {
  _models.Picture.findOne({ _id: req.params.id }).lean().exec(function (err, result) {
    if (err) {
      return res.status(500).json({ message: '사진 조회 오류' });
    }
    return res.json({
      data: result
    });
  });
});

//사진 개별 삭제
router.delete('/:_id', function (req, res) {
  if (!req.params._id) {
    return res.status(500).json({ message: '사진 삭제 오류: _id가 전송되지 않았습니다.' });
  }
  _models.Picture.findOneAndRemove({ _id: req.params._id }, function (err, result) {
    return res.json({
      data: result
    });
  });
  return null;
});

// 사진 전체 삭제
router.delete('/', function (req, res) {
  _models.Picture.deleteMany({}, function (err) {
    if (err) {
      return res.status(500).json({ message: '사진 삭제 오류: DB 삭제에 문제가 있습니다.' });
    }
    res.json({
      message: '삭제완료'
    });
  });
  return null;
});

exports.default = router;