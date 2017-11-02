import chai from 'chai';
import chaiHttp from 'chai-http';
import configure from '../../server/configure';
import{
  Nfc,
} from '../../server/models';

const should = chai.should();
const server = `http://localhost:${configure.PORT}`;

chai.use(chaiHttp);

/*
  name: String,
  shop: {
    id: {type: Schema.Types.ObjectId, ref: 'shop'},
    name: String,
  },
  url: String,
 */

export default function(){
  let tempId;

  // nfc 추가 테스트
  it('should save a nfc', (done) => {
    chai.request(server)
      .post('/api/nfc')
      .send({
        data:{
          name : 'dohun nfc',
          url : 'nfc.nfcnfc.com',
        },
      })
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('name').eql('dohun nfc');
        res.body.data.should.have.property('url').eql('nfc.nfcnfc.com');
        //tempId = res.body.data._id;
        done();
      });
  });

  it('should return a nfc list', (done) => {
    chai.request(server)
      .get('/api/nfc/')
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        res.body.data[0].should.have.property('name');
        res.body.data[0].should.have.property('url');
        //res.body.size.should.eql(1);
        tempId = res.body.data[0]._id;
        //console.log(tempId);
        done();
      });
  });

  it('should modify the nfc identified by _id', (done) => {
    chai.request(server)
      .put(`/api/nfc/${tempId}`)
      .send({
        data: {
          name : 'nfc1',
          url: 'www.naver.com'
        },
      })
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        //console.log(res.body.data);
        res.body.data.should.have.property('name');
        res.body.data.should.have.property('url');
        done();
      });
  });

  it('should remove a nfc', (done) => {
    chai.request(server)
      .delete(`/api/nfc/${tempId}`)
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
          .get(`/api/nfc/${tempId}`)
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