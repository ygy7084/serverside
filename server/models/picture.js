import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const Picture = new Schema({
  fileName: String,
  fileDir: String,
  shopId : {type: Schema.Types.ObjectId, ref:'shop'},
  size: String,
});

const model = mongoose.model('picture', Picture);

export default model;