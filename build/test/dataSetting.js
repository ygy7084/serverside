'use strict';

var mongoose = require('mongoose');

var Account = require('../models').Account;
var Shop = require('../models/').Shop;

var MONGO_URL = 'mongodb://localhost:27017/';

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URL, {
  useMongoClient: true
});
var db = mongoose.connection;

db.on('error', console.error);
db.on('open', function () {
  console.log('MongoDb is connected : ' + MONGO_URL);

  // shop 추가
  var shop1 = new Shop({
    name: 'shop1',
    phone: '1111'
  });

  var shop2 = new Shop({
    name: 'shop2',
    phone: '2222'
  });

  var shop3 = new Shop({
    name: 'shop3',
    phone: '3333'
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
  var account1 = new Account({
    username: 'user1',
    password: 'pw1111',
    connectedShops: [shop1, shop2],
    level: 'manager'
  });

  for (var i = 0; i < 2; i++) {
    if (i === 0) {
      shop1.save(function (err) {
        if (err) {
          return;
        }
        console.log('shop1 추가함');
      });

      shop2.save(function (err) {
        if (err) {
          return;
        }
        console.log('shop2 추가함');
      });

      shop3.save(function (err) {
        if (err) {
          return;
        }
        console.log('shop3 추가함');
      });
    }
    if (i === 1) {
      account1.save(function (err) {
        if (err) {
          return;
        }
        console.log('account1 추가함');
      });
    }
  }
});