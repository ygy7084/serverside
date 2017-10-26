import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const Product = new mongoose.Schema({
  name: String,
  price: String,
  shop: { type: Schema.Types.ObjectId, ref:'shop'},
  image: String,
});

const model = mongoose.model('product', Product);

export default model;