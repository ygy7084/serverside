import express from 'express';

import {
  History,
} from '../models';

const router = express.Router();


//내역 생성
router.post('/', (req, res) => {
  const historyTemp = {
    customer: req.body.data.customer,
    product: req.body.data.product,
    shop: req.body.data.shop,
    datetime: req.body.data.datetime,
  };

  const history = new History(historyTemp);
  history.save((err,result) => {
    if(err){
      return res.status(500).json({ message : '내역 생성 오류:'});
    }
    return res.json({
      data: result,
    });
  });

  return null;
});

//내역 리스트 반환
router.get('/', (req, res) => {
  History.find({})
    .exec((err, result) => {
      if(err){
        return res.status(500).json({ message : "내역 리스트 조회 오류 "});
      }
      return res.json({
        data: result,
      });
    });
});

//내역 반환
router.get('/:id', (req, res) => {
  History.findOne({ _id: req.params.id })
    .lean()
    .exec((err, result) => {
      if(err) {
        return res.status(500).json({ message: '내역 조회 오류'});
      }
      return res.json({
        data: result,
      });
    });
});

//내역 수정
router.put('/', (req, res) => {
  if(!req.body.data._id){
    return res.status(500).json({ message : '내역 수정 오류: _id가 전송되지 않았습니다.'});
  }

  const properties = [
    'customer',
    'product',
    'shop',
    'datetime',
  ];
  const update = { $set: {} };
  for (const property of properties){
    if(Object.prototype.hasOwnProperty.call(req.body.data, property)){
      update.$set[property] = req.body.data[property];
    }
  }
  History.findOneAndUpdate(
    { _id : req.body.data._id },
    update,
    (err, result) => {
      if(err) {
        return res.status(500).json({ message: "내역 수정 오류 "});
      }
      return res.json({
        data: result,
      });
    },
  );
  return null;
});

//내역 삭제
/*
router.delete('/', (req, res) => {
  if (!req.body.data._id) {
    return res.status(500).json({ message: '내역 삭제 오류: _id가 전송되지 않았습니다.' });
  }
  History.findOneAndRemove(
    { _id: req.body.data._id },
    (err, result) =>
      res.json({
        data: result,
      }),
  );
  return null;
});
*/

//내역 여러개 삭제
router.delete('/', (req, res) => {
  if(Array.isArray(req.body.data)) {
    const _ids = req.body.data.map(o => o._id);
    History.deleteMany({_id: { $in: _ids } }, (err) => {
      if (err) {
        return res.status(500).json({message: '계정 삭제 오류: DB 삭제에 문제가 있습니다.'});
      }
      res.json({
        data: { message: '삭제완료' },
      });
    });
  }
  else {
    if (!req.body.data._id) {
      return res.status(500).json({message: '계정 삭제 오류: _id가 전송되지 않았습니다.'});
    }
    History.findOneAndRemove(
      { _id: req.body.data._id },
      (err, result) =>
        res.json({
          data: result,
        }),
    );
  }
  return null;
});


// 내역 전체 삭제
router.delete('/all', (req, res) => {
  History.deleteMany(
    {},
    (err) => {
      if (err) {
        return res.status(500).json({ message: '내역 삭제 오류: DB 삭제에 문제가 있습니다.' });
      }
      res.json({
        message: '삭제완료',
      });
    },
  );
  return null;
});


export default router;