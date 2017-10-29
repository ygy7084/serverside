'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _models = require('../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

//고객 생성
router.post('/', function (req, res) {
  var customerTemp = {
    phone: req.body.data.phone,
    point: 0
  };

  var customer = new _models.Customer(customerTemp);
  customer.save(function (err, result) {
    if (err) {
      return res.status(500).json({ message: '고객 생성 오류:' });
    }
    return res.json({
      data: result
    });
  });
  return null;
});

router.post('/PointSave', function (req, res) {
  //let phone = req.body.data.phone;
  var id_check = void 0;
  _models.Customer.findOne({ phone: req.body.data.phone }).lean().exec(function (err, result) {
    if (err) {
      return res.status(500).json({ message: '고객 조회 오류' });
    }
    console.log(result);
    if (!result) {
      console.log("등록된 고객이 아닙니다. 신규 등록후 포인트 적립 진행");
      var customerTemp = {
        phone: req.body.data.phone,
        point: 1
      };
      var customer = new _models.Customer(customerTemp);
      customer.save(function (err, resultc) {
        if (err) {
          return res.status(500).json({ message: '고객 생성 오류 ' });
        }
        console.log(resultc);
        return res.json({
          data: resultc
        });
      });
    } else {
      console.log('포인트 추가');
      /*
      const properties = [
        'point',
      ];
        const update = {$set: {}};
      for (const property of properties) {
        if (Object.prototype.hasOwnProperty.call(req.body.data, property)) {
          update.$set[property] = req.body.data[property] + 1;
        }
      }*/
      _models.Customer.findOneAndUpdate({ phone: req.body.data.phone }, { $inc: { point: 1 } }, function (err, result) {
        if (err) {
          return res.status(500).json({ message: "포인트 적립 오류 " });
        }
        return res.json({
          data: result
        });
      });
    }
  });

  /*
  if(!req.body.data.phone){
    // 번호로 저장된 id가 없는경우 customer 등록 후 pointSave
    const customerTemp = {
      }
    }
  else {
    const properties = [
      'point',
    ];
      const update = {$set: {}};
    for (const property of properties) {
      if (Object.prototype.hasOwnProperty.call(req.body.data, property)) {
        update.$set[property] = req.body.data[property] + 1;
      }
    }
    Customer.findOneAndUpdate(
      {phone: req.body.data.phone},
      update,
      (err, result) => {
        if (err) {
          return res.status(500).json({message: "포인트 적립 오류 "});
        }
        return res.json({
          data: result,
        });
      },
    );
  }
  */

  return null;
});

//고객 리스트 반환
router.get('/', function (req, res) {
  _models.Customer.find({}).exec(function (err, result) {
    if (err) {
      return res.status(500).json({ message: "고객 리스트 조회 오류 " });
    }
    return res.json({
      data: result
    });
  });
});

//고객 반환
router.get('/:id', function (req, res) {
  _models.Customer.findOne({ _id: req.params.id }).lean().exec(function (err, result) {
    if (err) {
      return res.status(500).json({ message: '고객 조회 오류' });
    }
    return res.json({
      data: result
    });
  });
});

//고객 수정
router.put('/', function (req, res) {
  if (!req.body.data._id) {
    return res.status(500).json({ message: '고객 수정 오류: _id가 전송되지 않았습니다.' });
  }

  var properties = ['phone'];
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

  _models.Customer.findOneAndUpdate({ _id: req.body.data._id }, update, function (err, result) {
    if (err) {
      return res.status(500).json({ message: "고객 수정 오류 " });
    }
    return res.json({
      data: result
    });
  });
  return null;
});

//고객 삭제
router.delete('/', function (req, res) {
  if (!req.body.data._id) {
    return res.status(500).json({ message: '고객 삭제 오류: _id가 전송되지 않았습니다.' });
  }
  _models.Customer.findOneAndRemove({ _id: req.body.data._id }, function (err, result) {
    return res.json({
      data: result
    });
  });
  return null;
});

// 계정 전체 삭제
router.delete('/all', function (req, res) {
  _models.Customer.deleteMany({}, function (err) {
    if (err) {
      return res.status(500).json({ message: '고객 전체 삭제 오류: DB 삭제에 문제가 있습니다.' });
    }
    res.json({
      message: '삭제완료'
    });
  });
  return null;
});

exports.default = router;