import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const Order = new Schema({
  shop: {
    _id: {type: Schema.Types.ObjectId, ref: 'shop'},
    name: String,
  },
  products:[
    {
      name: String,
      _id : { type: Schema.Types.ObjectId, ref: 'product' },
      price: Number,
      options: [
        {
          name: String,
          amount: Number,
        },
      ],
    }
  ],
  customer: {
    _id : { type: Schema.Types.ObjectId, ref:'customer' },
    name: String,
    phone: String,
  },
  nfc: {
    _id : { type: Schema.Types.ObjectId, ref:'nfc' },
    name: String,
  },
  place: {
    _id : { type: Schema.Types.ObjectId, ref:'place' },
    name: String,
  },
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
});



const model = mongoose.model('order', Order);

export default model;