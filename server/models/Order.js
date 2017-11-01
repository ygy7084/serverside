import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const Order = new Schema({
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
  messages: [{
      name: String,
      phone: String,
      kind: String,
      id : {type: Schema.Types.ObjectId, refPath: 'messages.kind'},
      message: String,
    }],
  unreadMessages:Number,
  status: Number,
});



const model = mongoose.model('order', Order);

export default model;