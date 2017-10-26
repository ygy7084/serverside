import express from 'express';

import {
  Customer,
} from '../models';

const router = express.Router();


//고객 생성
router.post('/', (req, res) => {
  const customerTemp = {
    phone: req.body.data.phone,
  };

  const customer = new Customer(customerTemp);
  customer.save((err,result) => {
    if(err){
      return res.status(500).json({ message : '고객 생성 오류:'});
    }
    return res.json({
      data: result,
    });
  });

  return null;
});

//고객 리스트 반환
router.get('/', (req, res) => {
  Customer.find({})
    .exec((err, result) => {
      if(err){
        return res.status(500).json({ message : "고객 리스트 조회 오류 "});
      }
      return res.json({
        data: result,
      });
    });
});

//고객 반환
router.get('/:id', (req, res) => {
  Customer.findOne({ _id: req.params.id })
    .lean()
    .exec((err, result) => {
      if(err) {
        return res.status(500).json({ message: '고객 조회 오류'});
      }
      return res.json({
        data: result,
      });
    });
});

//고객 수정
router.put('/', (req, res) => {
  if(!req.body.data._id){
    return res.status(500).json({ message : '고객 수정 오류: _id가 전송되지 않았습니다.'});
  }

  const properties = [
    'phone',
  ];
  const update = { $set: {} };
  for (const property of properties){
    if(Object.prototype.hasOwnProperty.call(req.body.data, property)){
      update.$set[property] = req.body.data[property];
    }
  }
  Customer.findOneAndUpdate(
    { _id : req.body.data._id },
    update,
    (err, result) => {
      if(err) {
        return res.status(500).json({ message: "고객 수정 오류 "});
      }
      return res.json({
        data: result,
      });
    },
  );
  return null;
});

//고객 삭제
router.delete('/', (req, res) => {
  if (!req.body.data._id) {
    return res.status(500).json({ message: '고객 삭제 오류: _id가 전송되지 않았습니다.' });
  }
  Customer.findOneAndRemove(
    { _id: req.body.data._id },
    (err, result) =>
      res.json({
        data: result,
      }),
  );
  return null;
});

// 계정 전체 삭제
router.delete('/all', (req, res) => {
  Customer.deleteMany(
    {},
    (err) => {
      if (err) {
        return res.status(500).json({ message: '고객 전체 삭제 오류: DB 삭제에 문제가 있습니다.' });
      }
      res.json({
        message: '삭제완료',
      });
    },
  );
  return null;
});


export default router;