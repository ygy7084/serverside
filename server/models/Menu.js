import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const Menu = new Schema({
  shop: {
    _id: {type: Schema.Types.ObjectId, ref: 'shop'},
    name: String,
  },
  products: [
    {
      name: String,
      _id : { type: Schema.Types.ObjectId, ref: 'product' },
      price: Number,
    }
  ],
});

const model = mongoose.model('menu', Menu);

export default model;