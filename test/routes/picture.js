import chai from 'chai';
import chaiHttp from 'chai-http';
import configure from '../../server/configure';
import{
  Picture,
} from '../../server/models';

const should = chai.should();
const server = `http://localhost:${configure.PORT}`;

chai.use(chaiHttp);

export default function(){
  let tempId;

  /*
  fileName: String,
  fileDir: String,
  shopId : {type: Schema.Types.ObjectId, ref:'shop'},
  size: String,
   */


  // picture 추가 테스트
  it('should save many pictures', (done) => {
    chai.request(server)
      .post('/api/picture/many')
      .send({
        data:[
          {
            fileName : 'pic1',
            fileDir : 'picpic1',
            size : '100*100',
          },
          {
            fileName : 'pic2',
            fileDir : 'picpic2',
            size : '200*200',
          },
          {
            fileName : 'pic3',
            fileDir : 'picpic3',
            size : '300*300',
          }
        ],
      })
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        res.body.data[0].should.have.property('fileName').eql('pic1');
        res.body.data[0].should.have.property('fileDir').eql('picpic1');
        res.body.data[0].should.have.property('size').eql('100*100');
        //tempId = res.body.data._id;
        done();
      });
  });

  it('should return a picture list', (done) => {
    chai.request(server)
      .get('/api/picture/')
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        res.body.data[0].should.have.property('fileName');
        res.body.data[0].should.have.property('fileDir');
        res.body.data[0].should.have.property('size');
        // res.body.size.should.eql(1);
        tempId = res.body.data[0]._id;
        //console.log(tempId);
        done();
      });
  });





  it('should remove a picture', (done) => {
    chai.request(server)
      .delete(`/api/picture/${tempId}`)
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
          .get(`/api/picture/${tempId}`)
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