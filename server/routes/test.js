
import express from 'express';

import {
  Shop,
  Account,
  Product,
  Order,
  Customer,
} from '../models';

const router = express.Router();
// shop 추가
let shop1 = new Shop({
  name : 'temp',
  phone : '1111',
});
//Account 추가
let account1 = new Account({
  username : 'temp',
  password : '0',
  shop : {
    _id: shop1._id,
    name: shop1.name,
  },
  level : 'manager',
});
// customer 추가
let cus1 = new Customer({
  name: '도훈',
});

//product 추가
let pro1 = new Product({
  name : '음식1',
  price : 4000,
  shop :{
    _id: shop1._id,
    name: shop1.name,
  },
  options: [
    {
      name: '옵션1',
      selections: [
        {
          name: 'selection1',
          price : 1000,
        },
        {
          name: 'selection2',
          price: 2000,
        }
      ]
    },
    {
      name: '옵션2',
      selections: [
        {
          name: '옵션2의 sel1',
          price:3000,
        }
      ]
    }
  ]
});

//order 추가
let order1 = new Order({
  message: 'temp', //label 이랑 비슷한거 같음 일단 놔둠
  label: 'test',
  //orderList: [ String ],
  status: 0,  // 0 : 주문중, 1: 배송완료 2: 주문취소

  shop: {
    _id: shop1._id,
    name: shop1.name,
  },
  products: [
    {
      name: pro1.name,
      _id: pro1._id,
      price: pro1.price,
      options: [
        {
          name: '옵션1',
          selections: [
            {
              name: 'selection1',
              price: 1000,
            }
          ],
        }
      ],
    }
  ],
  customer: {
    _id: cus1._id,
    name: cus1.name,
  },
});

router.get('/', (req,res) => {

  shop1.save((err) => {
    if(err) {
      return;
    }
    console.log('shop1 추가함');
  });

  account1.save((err) => {
    if(err){
      return;
    }
    console.log('acc1 추가');
  });
  cus1.save((err) => {
    if(err){
      return;
    }
    console.log('cus1 추가');
  });
  pro1.save((err) => {
    if(err){
      return;
    }
    console.log('pro1 추가');
  });
  order1.save((err) => {
    if(err){
      return;
    }
    console.log('order1 추가');
  });
});




export default router;
