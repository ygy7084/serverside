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
  name: String,
  shop: {
    id: {type: Schema.Types.ObjectId, ref: 'shop'},
    name: String,
  },
  url: String,
 */

//nfc 생성
router.post('/', function (req, res) {
  var nfcTemp = {
    name: req.body.data.name,
    shop: req.body.data.shop,
    url: req.body.data.url
  };

  var nfc = new _models.Nfc(nfcTemp);
  nfc.save(function (err, result) {
    if (err) {
      return res.status(500).json({ message: 'nfc 생성 오류:' });
    }
    return res.json({
      data: result
    });
  });

  return null;
});

//nfc 리스트 반환
router.get('/', function (req, res) {
  _models.Nfc.find({}).exec(function (err, result) {
    if (err) {
      return res.status(500).json({ message: "nfc 리스트 조회 오류 " });
    }
    return res.json({
      data: result
    });
  });
});

//nfc 반환
router.get('/:id', function (req, res) {
  _models.Nfc.findOne({ _id: req.params.id }).lean().exec(function (err, result) {
    if (err) {
      return res.status(500).json({ message: 'nfc 조회 오류' });
    }
    return res.json({
      data: result
    });
  });
});

//nfc 수정
router.put('/:_id', function (req, res) {
  if (!req.params._id) {
    return res.status(500).json({ message: 'nfc 수정 오류: _id가 전송되지 않았습니다.' });
  }

  var properties = ['name', 'shop', 'url'];
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

  _models.Nfc.findOneAndUpdate({ _id: req.params._id }, update, function (err, result) {
    if (err) {
      return res.status(500).json({ message: "nfc 수정 오류 " });
    }
    return res.json({
      data: result
    });
  });
  return null;
});

//nfc 삭제
/*
router.delete('/:_id', (req, res) => {
  if (!req.params._id) {
    return res.status(500).json({ message: 'nfc 삭제 오류: _id가 전송되지 않았습니다.' });
  }
  Nfc.findOneAndRemove(
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
    return res.status(500).json({ message: 'nfc 삭제 오류: _id가 전송되지 않았습니다.' });
  }
  if (Array.isArray(req.body.data._id)) {
    // id 배열이 들어오면
    _models.Nfc.deleteMany({ _id: req.body.data._id }, function (err) {
      if (err) {
        return res.status(500).json({ message: 'nfc 삭제 오류: DB 삭제에 문제가 있습니다.' });
      }
      res.json({
        message: '삭제완료'
      });
    });
  } else {
    _models.Nfc.findOneAndRemove({ _id: req.body.data._id }, function (err, result) {
      return res.json({
        data: result
      });
    });
  }
  return null;
});

// nfc 전체 삭제
router.delete('/all', function (req, res) {
  _models.Nfc.deleteMany({}, function (err) {
    if (err) {
      return res.status(500).json({ message: 'nfc 삭제 오류: DB 삭제에 문제가 있습니다.' });
    }
    res.json({
      message: '삭제완료'
    });
  });
  return null;
});

exports.default = router;