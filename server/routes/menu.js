import express from 'express';

import {
  Menu,
} from '../models';

const router = express.Router();


//메뉴판 생성
router.post('/', (req, res) => {
  const menuTemp = {
    shop: req.body.data.shop,
    products: req.body.data.products,
  };

  const menu = new Menu(menuTemp);
  menu.save((err,result) => {
    if(err){
      return res.status(500).json({ message : '메뉴판 생성 오류:'});
    }
    return res.json({
      data: result,
    });
  });

  return null;
});

//메뉴판 조회(상점별)
router.post('/getMenu', (req, res) => {
  console.log('getMenu 상점별 조회 post 요청 들어옴');
  const shop_id = req.body.data.shop_id;
  Menu.find({'shop._id': shop_id})
    .exec((err, result) => {
      if(err){
        return res.status(500).json({message : "메뉴판 조회 오류 "});
      }
      return res.json({
        data: result,
      });
    });
});

//메뉴판 수정
router.put('/', (req, res) => {
  if(!req.body.data._id){
    return res.status(500).json({ message : '메뉴판 수정 오류: _id가 전송되지 않았습니다.'});
  }

  const properties = [
    'shop',
    'products',
  ];
  const update = { $set: {} };
  for (const property of properties){
    if(Object.prototype.hasOwnProperty.call(req.body.data, property)){
      update.$set[property] = req.body.data[property];
    }
  }
  Menu.findOneAndUpdate(
    { _id : req.body.data._id },
    update,
    (err, result) => {
      if(err) {
        return res.status(500).json({ message: "메뉴판 수정 오류 "});
      }
      return res.json({
        data: result,
      });
    },
  );
  return null;
});


// 메뉴판 상점별 삭제
router.delete('/', (req, res) => {
  Menu.deleteMany(
    {'shop._id':req.body.data.shop_id},
    (err) => {
      if (err) {
        return res.status(500).json({ message: '메뉴판 삭제 오류: DB 삭제에 문제가 있습니다.' });
      }
      res.json({
        message: '삭제완료',
      });
    },
  );
  return null;
});


export default router;