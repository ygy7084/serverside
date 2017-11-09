const mongoose = require('mongoose');


const Account = require('../models').Account;
const Shop = require('../models/').Shop;


const MONGO_URL = 'mongodb://localhost:27017/';

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URL, {
  useMongoClient: true,
});
const db = mongoose.connection;

db.on('error', console.error);
db.on('open', () => {
  console.log(`MongoDb is connected : ${MONGO_URL}`);

  // shop 추가
  let shop1 = new Shop({
    name : 'dohuns shop',
    phone : '1111',
  });

  let shop2 = new Shop({
    name : 'shop2',
    phone : '2222',
  });

  let shop3 = new Shop({
    name : 'shop3',
    phone : '3333',
  });


  /*
  username: String,
  password: String,
  connectedShops: [
    {
      id: {type: Schema.Types.ObjectId, ref: 'shop'},
      name: String,
    }
  ],
  level : String,
   */
  //Account 추가
  let account1 = new Account({
    username : 'user1',
    password : 'pw1111',
    connectedShop : {
      id: shop1,
      name: shop1.name,
    },
    level : 'manager',
  });

  for( let i=0 ; i<2; i++){
    if(i===0){
      shop1.save((err) => {
        if(err) {
          return;
        }
        console.log('shop1 추가함');
      });

      shop2.save((err) => {
        if(err) {
          return;
        }
        console.log('shop2 추가함');
      });

      shop3.save((err) => {
        if(err) {
          return;
        }
        console.log('shop3 추가함');
      })
    }
    if(i===1){
      account1.save((err) => {
        if(err){
          return;
        }
        console.log('account1 추가함');
      })
    }
  }




});