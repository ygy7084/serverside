import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const Log = new Schema({
  username: String,
  ip: String,
  httpMethod: String,
  url: String,
  userAgent: String,
  dataFromClient: {
    data: String,
    value: String
  },
  datetime: Date,
  error : String,
  httpCode: String,
  message: String
});

const model = mongoose.model('log', Log);

export default model;