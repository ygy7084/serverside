import express from 'express';

import {
  Product,
} from '../models';

const router = express.Router();
/*
  name: String,
  pictures: [String],
  price: Number,
  description: String,
  shop : {
    id : { type: Schema.Types.ObjectId, ref:'shop' },
    name : String
  },
  nutrients: [
    {
      name: String,
      value: String,
    }
  ],
  options: [
    {
      name: String,
      selections: [
        {
          name: String,
          price: Number,
          canBeMany: Boolean,
        }
      ],
    }
  ],
 */
//상품 생성
router.post('/', (req, res) => {
  const productTemp = {
    name: req.body.data.name,
    pictures: req.body.data.pictures,
    price: req.body.data.price,
    description: req.body.data.description,
    shop: req.body.data.shop,
    nutrients: req.body.data.nutrients,
    options : req.body.data.options,
  };

  const product = new Product(productTemp);
  product.save((err,result) => {
    if(err){
      return res.status(500).json({ message : '상품 생성 오류:'});
    }
    return res.json({
      data: result,
    });
  });

  return null;
});

//상품 리스트 반환
router.get('/', (req, res) => {
  Product.find({})
    .exec((err, result) => {
      if(err){
        return res.status(500).json({ message : "상품 리스트 조회 오류 "});
      }
      return res.json({
        data: result,
      });
    });
});

//상품 반환
router.get('/:_id', (req, res) => {
  Product.findOne({ _id: req.params._id })
    .lean()
    .exec((err, result) => {
      if(err) {
        return res.status(500).json({ message: '상품 조회 오류'});
      }
      return res.json({
        data: result,
      });
    });
});

//상품 수정
router.put('/:_id', (req, res) => {
  if(!req.body.data._id){
    return res.status(500).json({ message : '상품 수정 오류: _id가 전송되지 않았습니다.'});
  }

  const properties = [
    'name',
    'price',
    'pictures',
    'shop',
    'description',
  ];
  const update = { $set: {} };
  for (const property of properties){
    if(Object.prototype.hasOwnProperty.call(req.body.data, property)){
      update.$set[property] = req.body.data[property];
    }
  }
  Product.findOneAndUpdate(
    { _id : req.body.data._id },
    update,
    (err, result) => {
      if(err) {
        return res.status(500).json({ message: "상품 수정 오류 "});
      }
      return res.json({
        data: result,
      });
    },
  );
  return null;
});

//상품 삭제
/*
router.delete('/:_id', (req, res) => {
  if (!req.params._id) {
    return res.status(500).json({ message: '상품 삭제 오류: _id가 전송되지 않았습니다.' });
  }
  Product.findOneAndRemove(
    { _id: req.params._id },
    (err, result) =>
      res.json({
        data: result,
      }),
  );
  return null;
});
*/
// 상품 여러개 삭제
router.delete('/', (req, res) => {
  if(Array.isArray(req.body.data)) {
    const _ids = req.body.data.map(o => o._id);
    Product.deleteMany({_id: { $in: _ids } }, (err) => {
      if (err) {
        return res.status(500).json({message: 'product 삭제 오류: DB 삭제에 문제가 있습니다.'});
      }
      res.json({
        data: { message: '삭제완료' },
      });
    });
  }
  else {
    if (!req.body.data._id) {
      return res.status(500).json({message: 'product 삭제 오류: _id가 전송되지 않았습니다.'});
    }
    Product.findOneAndRemove(
      { _id: req.body.data._id },
      (err, result) =>
        res.json({
          data: result,
        }),
    );
  }
  return null;
});

// 상품 전체 삭제
router.delete('/all', (req, res) => {
  Product.deleteMany(
    {},
    (err) => {
      if (err) {
        return res.status(500).json({ message: '상품 삭제 오류: DB 삭제에 문제가 있습니다.' });
      }
      res.json({
        message: '삭제완료',
      });
    },
  );
  return null;
});


export default router;