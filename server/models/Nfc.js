import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const Nfc = new Schema({
  name: String,
  shop: {
    id: {type: Schema.Types.ObjectId, ref: 'shop'},
    name: String,
  },
  url: String,
});

const model = mongoose.model('nfc', Nfc);

export default model;