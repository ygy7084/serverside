import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const History = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'product'},
  shop: { type:Schema.Types.ObjectId, ref: 'shop' },
  customer: {type: Schema.Types.ObjectId, ref: 'customer'},
  datetime: Date,
});

const model = mongoose.model('history', History);

export default model;