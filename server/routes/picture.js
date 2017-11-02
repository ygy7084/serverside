import express from 'express';

import {
  Picture,
} from '../models';

const router = express.Router();
/*
fileName: String,
  fileDir: String,
  shopId : {type: Schema.Types.ObjectId, ref:'shop'},
  size: String,
 */

//사진 생성
router.post('/', (req, res) => {
  const pictureTemp = {
    fileName: req.body.data.fileName,
    fileDir: req.body.data.fileDir,
    shopId : req.body.data.shopId,
    size : req.body.data.size,
  };

  const picture = new Picture(pictureTemp);
  picture.save((err,result) => {
    if(err){
      return res.status(500).json({ message : '사진 생성 오류:'});
    }
    return res.json({
      data: result,
    });
  });

  return null;
});

//사진 다중 생성
router.post('/many', (req, res) => {
  const picturesTemp = [];
  for(let k in req.body.data) {
    picturesTemp.push({
      fileName: req.body.data[k].fileName,
      fileDir: req.body.data[k].fileDir,
      shopId: req.body.data[k].shopId,
      size: req.body.data[k].size,
    })
  }

  Picture.insertMany(picturesTemp, (err,result) => {
    if(err){
      return res.status(500).json({ message : '사진 다중 생성 오류:'});
    }
    return res.json({
      data: result,
    });

  });

  return null;
});





//사진 리스트 조회
router.get('/', (req, res) => {
  Picture.find({})
    .exec((err, result) => {
      if(err){
        return res.status(500).json({ message : "사진 리스트 조회 오류 "});
      }
      return res.json({
        data: result,
      });
    });
});

//사진 개별 조회
router.get('/:id', (req, res) => {
  Picture.findOne({ _id: req.params.id })
    .lean()
    .exec((err, result) => {
      if(err) {
        return res.status(500).json({ message: '사진 조회 오류'});
      }
      return res.json({
        data: result,
      });
    });
});

//사진 개별 삭제
router.delete('/:_id', (req, res) => {
  if (!req.params._id) {
    return res.status(500).json({ message: '사진 삭제 오류: _id가 전송되지 않았습니다.' });
  }
  Picture.findOneAndRemove(
    { _id: req.params._id },
    (err, result) =>
      res.json({
        data: result,
      }),
  );
  return null;
});

// 사진 전체 삭제
router.delete('/', (req, res) => {
  Picture.deleteMany(
    {},
    (err) => {
      if (err) {
        return res.status(500).json({ message: '사진 삭제 오류: DB 삭제에 문제가 있습니다.' });
      }
      res.json({
        message: '삭제완료',
      });
    },
  );
  return null;
});


export default router;