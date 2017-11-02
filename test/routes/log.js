import chai from 'chai';
import chaiHttp from 'chai-http';
import configure from '../../server/configure';
import{
  Log,
} from '../../server/models';

const should = chai.should();
const server = `http://localhost:${configure.PORT}`;

chai.use(chaiHttp);

/*
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
 */

export default function(){
  let tempId;

  // log 추가 테스트
  it('should save a log', (done) => {
    chai.request(server)
      .post('/api/log')
      .send({
        data:{
          username: 'dohun log',
          ip: 'dohun ip',
          httpMethod: 'GET',
          url: '/api/dohun',
          userAgent: 'IE6',
          dataFromClient: {
            data: 'dohun',
            value: 'ddhh'
          },
          error : '404',
          httpCode: '500',
          message: 'dh message'
        },
      })
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('username').eql('dohun log');
        res.body.data.should.have.property('url').eql('/api/dohun');
        //tempId = res.body.data._id;
        done();
      });
  });

  it('should return a log list', (done) => {
    chai.request(server)
      .get('/api/log/')
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        res.body.data[0].should.have.property('username');
        res.body.data[0].should.have.property('url');
        //res.body.size.should.eql(1);
        tempId = res.body.data[0]._id;
        //console.log(tempId);
        done();
      });
  });



  it('should remove a log', (done) => {
    chai.request(server)
      .delete(`/api/log/${tempId}`)
      .send({
        data: {
          _id : tempId
        },
      })
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        chai.request(server)
          .get(`/api/log/${tempId}`)
          .end((err, res) => {
            should.exist(res.body);
            res.should.have.status(200);
            res.body.should.be.a('object');
            should.equal(res.body.data, null);
            done();
          })
      });
  })
}