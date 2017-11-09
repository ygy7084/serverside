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
          name : 'dohun shop',
          phone : '010-3026-1963',
        },
      })
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('name').eql('dohun shop');
        res.body.data.should.have.property('phone').eql('010-3026-1963');
        //tempId = res.body.data._id;
        done();
      });
  });

  it('should return a shop list', (done) => {
    chai.request(server)
      .get('/api/shop/')
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        res.body.data[0].should.have.property('name');
        res.body.data[0].should.have.property('phone');
        //res.body.size.should.eql(1);
        tempId = res.body.data[0]._id;
        //console.log(tempId);
        done();
      });
  });

  it('should modify the shop identified by _id', (done) => {
    chai.request(server)
      .put(`/api/shop/${tempId}`)
      .send({
        data: {
          name : 'shopshop',
          phone: '010-3333-4444'
        },
      })
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        //console.log(res.body.data);
        res.body.data.should.have.property('name');
        res.body.data.should.have.property('phone');
        done();
      });
  });

    it('should remove a shop', (done) => {
    chai.request(server)
      .delete(`/api/shop/${tempId}`)
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