import express from 'express';
import async from 'async';
import mongoose from 'mongoose';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import {
  Picture,
} from '../models';

const imgPath = 'public/img';
const publicImagePath = '/img';
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, imgPath);
  },
  filename(req, file, cb) {
    cb(null, `${new Date().getTime()}${file.originalname}`);
  },
});
const upload = multer({ storage });

//사진 생성
router.post('/', upload.single('file'), (req, res) => {
  const data = JSON.parse(req.body.data);
  const file = req.file;
  if (!file) {
    return res.status(500).json({ message: '사진 생성 에러 - 파일 전송' });
  }
  const _id = mongoose.Types.ObjectId();
  const filePath = file.path;
  const newFileName = `${_id}${path.extname(filePath)}`;
  fs.rename(filePath, `${path.dirname(filePath)}/${newFileName}`, (err) => {
    if (err) {
      return res.status(500).json({ message: '사진 생성 에러 - 파일 재명명' });
    }
    const picture = new Picture({
      _id,
      fileName: newFileName,
      fileDir: file.destination,
      path: publicImagePath,
      size: file.size,
      accountId : data.accountId,
    });
    picture.save((err,result) => {
      if(err){
        console.error(err);
        return res.status(500).json({ message : '사진 생성 에러 - DB 저장', error: err });
      }
      return res.json({
        data: result,
      });
    });
  });
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
        return res.status(500).json({ message : "사진 리스트 조회 오류"});
      }
      return res.json({
        data: result,
      });
    });
});
//사진 개별 조회
router.get('/:_id', (req, res) => {
  Picture.findOne({ _id: req.params._id })
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
router.put('/', upload.single('file'), (req, res) => {
  const data = JSON.parse(req.body.data);
  const file = req.file;
  if (!data._id) {
    return res.status(500).json({ message: '_id가 전송되지 않았습니다.' });
  }
  if (file) {
    Picture.findOne({ _id: data._id }).lean().exec((err, result) => {
      const _id = data._id;
      const filePath = file.path;
      const newFileName = `${_id}${path.extname(filePath)}`;
      fs.unlink(`${result.fileDir}/${result.fileName}`, () => {
        fs.rename(filePath, `${path.dirname(filePath)}/${newFileName}`, (err) => {
          if (err) {
            return res.status(500).json({ message: '사진 생성 에러 - 파일 재명명' });
          }
          Picture.findOneAndUpdate(
            { _id: data._id },
            {
              fileName: newFileName,
              fileDir: file.destination,
              path: publicImagePath,
              size: file.size,
            }, () => {
              return res.json({
                data: true,
              });
            });
        });
      });
    });
  }
});

// 사진 여러개 삭제
router.delete('/', (req, res) => {
  if(Array.isArray(req.body.data)) {
    const _ids = req.body.data.map(o => o._id);
    Picture.find({_id: { $in: _ids } }).lean().exec((err, results) => {
      const pictures = results;
      if (err) {
        return res.status(500).json({ message: 'picture 삭제 오류: DB 조회에 문제가 있습니다.' });
      }
      Picture.deleteMany({_id: { $in: _ids } }, (err) => {
        if (err) {
          return res.status(500).json({message: 'picture 삭제 오류: DB 삭제에 문제가 있습니다.'});
        }
        async.map(pictures, (picture, cb) => {
          fs.unlink(`${picture.fileDir}/${picture.fileName}`, () => {
            cb();
          });
        }, () => {
          return res.json({
            data: { message: '삭제완료' },
          });
        });
      });
    });

  }
  else {
    if (!req.body.data._id) {
      return res.status(500).json({message: 'picture 삭제 오류: _id가 전송되지 않았습니다.'});
    }
    Picture.findOneAndRemove(
      { _id: req.body.data._id },
      (err, result) => {
        fs.unlink(`${result.fileDir}/${result.fileName}`, () => {
          return res.json({
            data: result,
          });
        });
      });
  }
  return null;
});

// 사진 전체 삭제
router.delete('/all', (req, res) => {
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