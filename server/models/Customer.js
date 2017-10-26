import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const Customer = new Schema({
  phone: String,
});

Customer.index({ phone: 1 }, { unique: true });

const model = mongoose.model('customer', Customer);

export default model;