import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const Picture = new Schema({
  fileName: String,
  fileDir: String,
  path: String,
  accountId : {type: Schema.Types.ObjectId, ref:'account'},
  size: String,
});

const model = mongoose.model('picture', Picture);

export default model;