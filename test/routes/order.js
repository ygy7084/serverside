import chai from 'chai';
import chaiHttp from 'chai-http';
import configure from '../../server/configure';
import{
  Order,
} from '../../server/models';

const should = chai.should();
const server = `http://localhost:${configure.PORT}`;

chai.use(chaiHttp);

export default function(){
  let tempId;
/*
    shop: req.body.data.shop,
    products : req.body.data.products,
    customer : req.body.data.customer,
    nfc : req.body.data.nfc,
    place : req.body.data.place,
    orderedWay : req.body.data.place,
    datetime : req.body.data.datetime,
    payment : req.body.data.payment,
    message : req.body.data.message,
    status : req.body.data.status,
 */


  // order 추가 테스트
  it('should save a order', (done) => {
    chai.request(server)
      .post('/api/order')
      .send({
        data:{
          place : 'suwon',
          orderedWay : 'cash',
          payment : {
            name : 'cash',
            value : 10000,
          },
          message : 'hihihi',
          status : 1,
        },
      })
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('place').eql('suwon');
        res.body.data.should.have.property('status').eql(1);
        //tempId = res.body.data._id;
        done();
      });
  });

  it('should return a order list', (done) => {
    chai.request(server)
      .get('/api/order')
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        res.body.data[0].should.have.property('place');
        res.body.data[0].should.have.property('status');
        //res.body.size.should.eql(1);
        tempId = res.body.data[0]._id;
        //console.log(tempId);
        done();
      });
  });

  it('should modify the order identified by _id', (done) => {
    chai.request(server)
      .put(`/api/order/${tempId}`)
      .send({
        data: {
          _id : tempId,
          place : 'seoul',
          message : 'byebye',
        },
      })
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        //console.log(res.body.data);
        res.body.data.should.have.property('place');
        res.body.data.should.have.property('message');
        done();
      });
  });

  it('should remove a order', (done) => {
    chai.request(server)
      .delete(`/api/order/${tempId}`)
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
          .get(`/api/product/${tempId}`)
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