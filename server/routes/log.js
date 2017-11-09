import express from 'express';

import {
  Log,
} from '../models';

const router = express.Router();


/*
  username: String,
  ip: String,
  httpMethod: String,
  url: String,
  userAgent: String,
  dataFromClient: {
    data: String,
    value: String
  },
  datetime: Date,
  error : String,
  httpCode: String,
  message: String
 */

//log 생성
router.post('/', (req, res) => {
  const logTemp = {
    username: req.body.data.username,
    ip: req.body.data.ip,
    httpMethod : req.body.data.httpMethod,
    url : req.body.data.url,
    userAgent: req.body.data.userAgent,
    dataFromClient: req.body.data.dataFromClient,
    datetime: req.body.data.datetime,
    error : req.body.data.error,
    httpCode : req.body.data.httpCode,
    message: req.body.data.message,
  };

  const log = new Log(logTemp);
  log.save((err,result) => {
    if(err){
      return res.status(500).json({ message : 'log 생성 오류:'});
    }
    return res.json({
      data: result,
    });
  });

  return null;
});

//log 리스트 반환
router.get('/', (req, res) => {
  Log.find({})
    .exec((err, result) => {
      if(err){
        return res.status(500).json({ message : "log 리스트 조회 오류 "});
      }
      return res.json({
        data: result,
      });
    });
});

//log 반환
router.get('/:id', (req, res) => {
  Log.findOne({ _id: req.params.id })
    .lean()
    .exec((err, result) => {
      if(err) {
        return res.status(500).json({ message: 'log 조회 오류'});
      }
      return res.json({
        data: result,
      });
    });
});



//log 삭제
/*
router.delete('/:_id', (req, res) => {
  if (!req.params._id) {
    return res.status(500).json({ message: 'log 삭제 오류: _id가 전송되지 않았습니다.' });
  }
  Log.findOneAndRemove(
    { _id: req.params._id },
    (err, result) =>
      res.json({
        data: result,
      }),
  );
  return null;
});
*/

router.delete('/', (req, res) => {


  if (!req.body.data._id) {
    return res.status(500).json({ message: 'log 삭제 오류: _id가 전송되지 않았습니다.' });
  }
  if(Array.isArray(req.body.data._id)) {
    // id 배열이 들어오면
    Log.deleteMany({_id: req.body.data._id}, (err) => {
      if (err) {
        return res.status(500).json({message: 'log 삭제 오류: DB 삭제에 문제가 있습니다.'});
      }
      res.json({
        message: '삭제완료',
      });
    });
  }
  else{
    Log.findOneAndRemove(
      { _id: req.body.data._id },
      (err, result) =>
        res.json({
          data: result,
        }),
    );
  }
  return null;
});

// log 전체 삭제
router.delete('/all', (req, res) => {
  Log.deleteMany(
    {},
    (err) => {
      if (err) {
        return res.status(500).json({ message: 'log 전체 삭제 오류: DB 삭제에 문제가 있습니다.' });
      }
      res.json({
        message: '삭제완료',
      });
    },
  );
  return null;
});


export default router;