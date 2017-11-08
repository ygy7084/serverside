import chai from 'chai';
import chaiHttp from 'chai-http';
import configure from '../../server/configure';
import{
  Account,
} from '../../server/models';

const should = chai.should();
const server = `http://localhost:${configure.PORT}`;

chai.use(chaiHttp);

export default function(){
  let tempId;

  /*
    username: String,
  password: String,
  connectedShops: [
    {
      id: {type: Schema.Types.ObjectId, ref: 'shop'},
      name: String,
    }
  ],
  level : String,
   */


  // account 추가 테스트
  it('should save a account', (done) => {
    chai.request(server)
      .post('/api/account')
      .send({
        data:{
          username : 'dohun4',
          password : 'dhdhdh',
          level : 'manager',
        },
      })
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('username').eql('dohun4');
        res.body.data.should.have.property('password').eql('dhdhdh');
        res.body.data.should.have.property('level').eql('manager');
        //tempId = res.body.data._id;
        done();
      });
  });




  it('should return a account list', (done) => {
    chai.request(server)
      .get('/api/account/')
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        res.body.data[0].should.have.property('username');
        res.body.data[0].should.have.property('password');
        res.body.data[0].should.have.property('level');
       // res.body.size.should.eql(1);
        tempId = res.body.data[0]._id;
        //console.log(tempId);
        done();
      });
  });

  it('should modify the account identified by _id', (done) => {
    chai.request(server)
      .put(`/api/account/${tempId}`)
      .send({
        data: {
          _id : tempId,
          username : 'ehgns',
          password : 'rlaskgus',
          level : 'super'
        },
      })
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        //console.log(res.body.data);
        res.body.data.should.have.property('username');
        res.body.data.should.have.property('password');
        done();
      });
  });



  it('should remove a account', (done) => {
    chai.request(server)
      .delete(`/api/account/`)
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
          .get(`/api/account/${tempId}`)
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