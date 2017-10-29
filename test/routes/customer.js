import chai from 'chai';
import chaiHttp from 'chai-http';
import configure from '../../server/configure';
import{
  Customer,
} from '../../server/models';

const should = chai.should();
const server = `http://localhost:${configure.PORT}`;

chai.use(chaiHttp);

export default function(){
  let tempId;

  // customer 추가 테스트
  it('should save a customer', (done) => {
    chai.request(server)
      .post('/api/customer')
      .send({
        data:{
          phone : '01030261964',
        },
      })
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('phone').eql('01030261964');
        //tempId = res.body.data._id;
        done();
      });
  });

  it('should return a customer and num_of_accounts', (done) => {
    chai.request(server)
      .get('/api/customer/')
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        res.body.data[0].should.have.property('phone');
        //res.body.size.should.eql(1);
        tempId = res.body.data[0]._id;
        //console.log(tempId);
        done();
      });
  });

  it('should modify the customer identified by _id', (done) => {
    chai.request(server)
      .put('/api/customer')
      .send({
        data: {
          _id : tempId,
          phone : '01030261963',
        },
      })
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        //console.log(res.body.data);
        res.body.data.should.have.property('phone');
        done();
      });
  });

  it('should save a point for customer', (done) => {
    chai.request(server)
      .post('/api/customer/PointSave')
      .send({
        data: {
          phone : '01030261963'
        },
      })
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a(object);
        res.body.data.should.have.property('point').eql(1);
        done();
      });
  });


  /*
  it('should remove a customer', (done) => {
    chai.request(server)
      .delete('/api/customer')
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
          .get(`/api/customer/${tempId}`)
          .end((err, res) => {
            should.exist(res.body);
            res.should.have.status(200);
            res.body.should.be.a('object');
            should.equal(res.body.data, null);
            done();
          })
      });
  })
  */
}