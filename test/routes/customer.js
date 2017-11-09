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
          phone: '01011112222',
          name: 'dhtest',
          rewards: [
            {
              shop :{
                //id : '59fac3161d1f8d216c9ae423',
              },
              name : 'shop3',
              value : 1,
            },
          ]
        },
      })
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('phone').eql('01011112222');
        //tempId = res.body.data._id;
        done();
      });
  });

  it('should return a customer list', (done) => {
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
        //console.dir(res.body.data[0].rewards);
        //console.log(tempId);
        done();
      });
  });
/*
  it('should find and save point by shop_id and phone', (done) =>{
    chai.request(server)
      .post('/api/customer/findandsave')
      .send({
        data:{
          phone: '01011112222',
          name: 'dhtest',
          rewards: [
            {
              shop :{
                id : '59faa29ccaec781d54338c0e',
                name : 'shop3'
              },
              name : 'shop3',
              value : 1,
            },
          ]

        }
      })
      .end((err, res) =>{
        should.exist(res.body);
        console.log(res.body);
        done();
      })
  });
*/

  it('should modify the customer identified by _id', (done) => {
    chai.request(server)
      .put(`/api/customer/${tempId}`)
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
/*
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
  });*/



  it('should remove a customer', (done) => {
    chai.request(server)
      .delete(`/api/customer/${tempId}`)
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

}