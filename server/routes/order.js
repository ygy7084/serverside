import express from 'express';

import {
  Order,
} from '../models';

const router = express.Router();
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
router.post('/', (req, res) => {
  const orderTemp = {
    shop: req.body.data.shop,
    products : req.body.data.products,
    customer : req.body.data.customer,
    nfc : req.body.data.nfc,
    place : req.body.data.place,
    orderedWay : req.body.data.place,
    datetime : req.body.data.datetime,
    payment : req.body.data.payment,
    message : req.body.data.message,
    status : req.body.data.status,
  };

  const order = new Order(orderTemp);
  order.save((err,result) => {
    if(err){
      return res.status(500).json({ message : '주문 생성 오류:'});
    }
    return res.json({
      data: result,
    });
  });

  return null;
});

//order 리스트 조회
router.get('/', (req, res) => {
  Order.find({})
    .exec((err, result) => {
      if(err){
        return res.status(500).json({ message : "주문 리스트 조회 오류 "});
      }
      return res.json({
        data: result,
      });
    });
});

//order 조회
router.get('/:id', (req, res) => {
  Order.findOne({ _id: req.params.id })
    .lean()
    .exec((err, result) => {
      if(err) {
        return res.status(500).json({ message: '주문 조회 오류'});
      }
      return res.json({
        data: result,
      });
    });
});

//주문 수정
router.put('/:_id', (req, res) => {
  if(!req.params._id){
    return res.status(500).json({ message : '주문 수정 오류: _id가 전송되지 않았습니다.'});
  }

  const properties = [
    'shop',
    'products',
    'customer',
    'nfc',
    'place',
    'orderedWay',
    'datetime',
    'payment',
    'message',
    'status',
  ];
  const update = { $set: {} };
  for (const property of properties){
    if(Object.prototype.hasOwnProperty.call(req.body.data, property)){
      update.$set[property] = req.body.data[property];
    }
  }
  Order.findOneAndUpdate(
    { _id : req.params._id },
    update,
    (err, result) => {
      if(err) {
        return res.status(500).json({ message: "주문 수정 오류 "});
      }
      return res.json({
        data: result,
      });
    },
  );
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
router.delete('/', (req, res) => {


  if (!req.body.data._id) {
    return res.status(500).json({ message: 'order 삭제 오류: _id가 전송되지 않았습니다.' });
  }
  if(Array.isArray(req.body.data._id)) {
    // id 배열이 들어오면
    Order.deleteMany({_id: req.body.data._id}, (err) => {
      if (err) {
        return res.status(500).json({message: 'order 삭제 오류: DB 삭제에 문제가 있습니다.'});
      }
      res.json({
        message: '삭제완료',
      });
    });
  }
  else{
    Order.findOneAndRemove(
      { _id: req.body.data._id },
      (err, result) =>
        res.json({
          data: result,
        }),
    );
  }
  return null;
});

// 주문 전체 삭제
router.delete('/all', (req, res) => {
  Order.deleteMany(
    {},
    (err) => {
      if (err) {
        return res.status(500).json({ message: '주문 삭제 오류: DB 삭제에 문제가 있습니다.' });
      }
      res.json({
        message: '삭제완료',
      });
    },
  );
  return null;
});


export default router;