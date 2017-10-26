import chai from 'chai';
import chaiHttp from 'chai-http';
import configure from '../../server/configure';
import{
  Shop,
} from '../../server/models';

const should = chai.should();
const server = `http://localhost:${configure.PORT}`;

chai.use(chaiHttp);

export default function(){
  let tempId;

  // shop 추가 테스트
  it('should save a shop', (done) => {
    chai.request(server)
      .post('/api/shop')
      .send({
        data:{
          name : 'dohuns shop',
        },
      })
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('name').eql('dohuns shop');
        //tempId = res.body.data._id;
        done();
      });
  });

  it('should return a shop and num_of_accounts', (done) => {
    chai.request(server)
      .get('/api/shop/')
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        res.body.data[0].should.have.property('name');
        //res.body.size.should.eql(1);
        tempId = res.body.data[0]._id;
        //console.log(tempId);
        done();
      });
  });

  it('should modify the shop identified by _id', (done) => {
    chai.request(server)
      .put('/api/shop')
      .send({
        data: {
          _id : tempId,
          name : 'shopshop',
        },
      })
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        //console.log(res.body.data);
        res.body.data.should.have.property('name');
        done();
      });
  });

  it('should remove a shop', (done) => {
    chai.request(server)
      .delete('/api/shop')
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
          .get(`/api/shop/${tempId}`)
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