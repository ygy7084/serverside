import chai from 'chai';
import chaiHttp from 'chai-http';
import configure from '../../server/configure';
import{
  History,
} from '../../server/models';

const should = chai.should();
const server = `http://localhost:${configure.PORT}`;

chai.use(chaiHttp);

export default function(){
  let tempId;

  // history 추가 테스트
  it('should save a history', (done) => {
    chai.request(server)
      .post('/api/history')
      .send({
        data:{
          datetime : '200391272',
          //price : '10000',
          //image: 'url',
        },
      })
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('datetime').eql('1970-01-03T07:39:51.272Z');
        //res.body.data.should.have.property('image').eql('url');
        //tempId = res.body.data._id;
        done();
      });
  });

  it('should return a history and num_of_history', (done) => {
    chai.request(server)
      .get('/api/history')
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        res.body.data[0].should.have.property('datetime');
        //res.body.data[0].should.have.property('price');
        //res.body.size.should.eql(1);
        tempId = res.body.data[0]._id;
        //console.log(tempId);
        done();
      });
  });

  it('should modify the history identified by _id', (done) => {
    chai.request(server)
      .put('/api/history')
      .send({
        data: {
          _id : tempId,
          datetime : '29172927',
          //price : '30000',
        },
      })
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        //console.log(res.body.data);
        res.body.data.should.have.property('datetime');
        //res.body.data.should.have.property('price');
        done();
      });
  });

  it('should remove a history', (done) => {
    chai.request(server)
      .delete('/api/history')
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
          .get(`/api/history/${tempId}`)
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