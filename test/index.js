
import chai from 'chai';
import chaiHttp from 'chai-http';
//import server from '../server/server';
import configure from '../server/configure';
import routes from './routes'
//import { mysql } from '../../server/modules';
import mongoose from 'mongoose';

let should = chai.should();

const db = mongoose.connection;

chai.use(chaiHttp);

describe('Test', () => {
  console.log('mongoose open');
  before(() => {

    mongoose.connect(configure.MONGO_URL, {
      useMongoClient: true,
    });

    mongoose.Promise = global.Promise;

    db.on('error', console.error);
    db.once('open', () => {
      console.log(`MongoDB is connected : ${configure.MONGO_URL}`);
    });
  });
  /*after((done) => {
    db.db.dropDatabase()
      .then(() => {
        mongoose.disconnect(() => {
          done();
        });
      });
  });*/
  describe('API test', routes);
});
