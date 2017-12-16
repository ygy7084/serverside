import express from 'express';

import {
  Customer,
} from '../models';

const router = express.Router();
/*
  phone: String,
  name : String,
  rewards: [
    {
      shop: {
        id: {type: Schema.Types.ObjectId, ref: 'shop'},
        name: String,
      },
      name : String,
      value: Number,
    }
  ]
 */
//고객 생성
router.post('/', (req, res) => {
  let { phone, name, rewards } = req.body.data;
  if (!phone || phone === '') {
    phone = undefined;
  }
  if (!name || name === '') {
    name = undefined;
  }
  const customerTemp = {
    phone,
    name,
    rewards,
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
/*
router.post('/PointSave', (req, res) => {
  //let phone = req.body.data.phone;
  let id_check;
  Customer.findOne({
    phone : req.body.data.phone,
    rewards : {
      $elemMatch: {
        shop :
        {
          $elemMatch : {
            id: req.body.data.shop.id
          }
        }
      }
    }
  })
    .lean()
    .exec((err, result) => {
      if(err) {
        return res.status(500).json({ message: '고객 조회 오류'});
      }
      console.log(result);
      if(!result){
        console.log("등록된 고객이 아닙니다. 신규 등록후 포인트 적립 진행");
        const customerTemp ={
          phone: req.body.data.phone,
          point : 1,
        };
        const customer = new Customer(customerTemp);
        customer.save((err,resultc) => {
          if(err){
            return res.status(500).json({ message : '고객 생성 오류 '});
          }
          console.log(resultc);
          return res.json({
            data: resultc,
          });
        });
      }
      else{
        console.log('포인트 추가');
        Customer.findOneAndUpdate(
          {phone: req.body.data.phone},
          {$inc: {point: 1}},
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

    });
*/

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
  return null;
});*/

// shop.id, phone 가진 고객 검색
router.post('/findandsave', (req,res) =>{
  console.log(req.body.data.rewards[0].shop._id);
  Customer.findOne({
    phone : req.body.data.phone,
    /*rewards : {
      $elemMatch: {
        shop :
          {
            $elemMatch : {
              id: req.body.data.rewards[0].shop.id,
            }
          }
      }
    }*/
    "rewards.shop._id" : req.body.data.rewards[0].shop._id
  }).lean()
    .exec((err, result) => {
      if(err) {
        return res.status(500).json({ message: '고객 조회 오류'});
      }
      console.log(result);
      if(!result){
        console.log("등록된 고객이 아닙니다. 신규 등록후 포인트 적립 진행");


        Customer.update({phone:req.body.data.phone},{$push: {rewards: req.body.data.rewards[0]}})
          .exec((err,resultc) => {
          if(err){
            return res.status(500).json({ message : 'Shop에 고객 등록 오류 '});
          }
          console.log(resultc);
          return res.json({
            data: resultc,
          });
        });
      }
      else{
        console.log('포인트 추가');
      }
    });
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

//고객 단일
router.get('/:_id', (req, res) => {
  Customer.findOne({ _id: req.params._id })
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
    'name',
  ];
  const update = {
    $set: {},
    $unset: {},
  };
  for (const property of properties){
    if(Object.prototype.hasOwnProperty.call(req.body.data, property)){
      if (req.body.data[property] === '') {
        if (!'$unset' in update) {
          update.$unset = {};
        }
        update.$unset[property] = '';
      } else {
        if (!'$set' in update) {
          update.$set = {};
        }
        update.$set[property] = req.body.data[property];
      }
    }
  }
  Customer.findOneAndUpdate(
    { _id : req.body.data._id },
    update,
    (err, result) => {
      if(err) {
        console.error(err);
        return res.status(500).json({ message: "고객 수정 오류 "});
      }
      return res.json({
        data: result,
      });
    },
  );
  return null;
});


// Todo : rewards

// 리워드 생성
router.post('/reward', (req,res) => {

  let customer_id = req.body.data.customer_id;


});

// 리워드 수정
router.put('/reward/:id', (req,res) => {

  let customer_id = req.body.data.customer_id;

});

// 리워드 삭제
router.delete('/reward/:id', (req,res) => {

  let customer_id = req.body.data.customer_id;

});

// 리워드 전체 삭제
router.delete('/reward', (req, res) => {

  let customer_id = req.body.data.customer_id;

});




//고객 삭제
/*
router.delete('/:_id', (req, res) => {
  if (!req.params._id) {
    return res.status(500).json({ message: '고객 삭제 오류: _id가 전송되지 않았습니다.' });
  }
  Customer.findOneAndRemove(
    { _id: req.params._id },
    (err, result) =>
      res.json({
        data: result,
      }),
  );
  return null;
});*/

//고객 여러개 삭제
router.delete('/', (req, res) => {
  if(Array.isArray(req.body.data)) {
    const _ids = req.body.data.map(o => o._id);
    Customer.deleteMany({_id: { $in: _ids } }, (err) => {
      if (err) {
        return res.status(500).json({message: 'customer 삭제 오류: DB 삭제에 문제가 있습니다.'});
      }
      res.json({
        data: { message: '삭제완료' },
      });
    });
  }
  else {
    if (!req.body.data._id) {
      return res.status(500).json({message: 'customer 삭제 오류: _id가 전송되지 않았습니다.'});
    }
    Customer.findOneAndRemove(
      { _id: req.body.data._id },
      (err, result) =>
        res.json({
          data: result,
        }),
    );
  }
  return null;
});



// 고객 전체 삭제
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