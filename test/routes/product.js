import chai from 'chai';
import chaiHttp from 'chai-http';
import configure from '../../server/configure';
import{
  Product,
} from '../../server/models';

const should = chai.should();
const server = `http://localhost:${configure.PORT}`;

chai.use(chaiHttp);

export default function(){
  let tempId;

  // product 추가 테스트
  it('should save a product', (done) => {
    chai.request(server)
      .post('/api/product')
      .send({
        data:{
          name : 'pro1',
          price : '10000',
          image: 'url',
        },
      })
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('name').eql('pro1');
        res.body.data.should.have.property('image').eql('url');
        //tempId = res.body.data._id;
        done();
      });
  });

  it('should return a product and num_of_products', (done) => {
    chai.request(server)
      .get('/api/product')
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        res.body.data[0].should.have.property('name');
        res.body.data[0].should.have.property('price');
        //res.body.size.should.eql(1);
        tempId = res.body.data[0]._id;
        //console.log(tempId);
        done();
      });
  });

  it('should modify the product identified by _id', (done) => {
    chai.request(server)
      .put('/api/product')
      .send({
        data: {
          _id : tempId,
          name : 'ehgns0606',
          price : '30000',
        },
      })
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        //console.log(res.body.data);
        res.body.data.should.have.property('name');
        res.body.data.should.have.property('price');
        done();
      });
  });

  it('should remove a product', (done) => {
    chai.request(server)
      .delete('/api/product')
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