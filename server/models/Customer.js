import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const Customer = new Schema({
  phone: String,
  name : String,
  birth : Date,
  memo : String,
  point : Number,
});

Customer.index({ phone: 1 }, { unique: true });

const model = mongoose.model('customer', Customer);

export default model;

