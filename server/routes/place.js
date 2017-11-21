import express from 'express';
import {
  Place,
} from '../models';

const router = express.Router();
// 공간 생성
router.post('/', (req, res) => {
  const placeTemp = {
    name: req.body.data.name,
    shop: req.body.data.shop,
  };
  const place = new Place(placeTemp);
  place.save((err,result) => {
    if(err){
      return res.status(500).json({ message : '공간 생성 오류:'});
    }
    return res.json({
      data: result,
    });
  });
  return null;
});
// 공간 리스트 조회
router.get('/', (req, res) => {
  Place.find({})
    .exec((err, result) => {
      if(err){
        return res.status(500).json({ message : "공간 리스트 조회 오류 "});
      }
      return res.json({
        data: result,
      });
    });
});
// 공간 단일 조회
router.get('/:_id', (req, res) => {
  Place.findOne({ _id: req.params._id })
    .lean()
    .exec((err, result) => {
      if(err) {
        return res.status(500).json({ message: '공간 조회 오류'});
      }
      return res.json({
        data: result,
      });
    });
});
// 공간 수정
router.put('/', (req, res) => {
  if(!req.body.data._id){
    return res.status(500).json({ message : '공간 수정 오류: _id가 전송되지 않았습니다.'});
  }
  const properties = [
    'name',
    'shop',
  ];
  const update = { $set: {} };
  for (const property of properties){
    if(Object.prototype.hasOwnProperty.call(req.body.data, property)){
      update.$set[property] = req.body.data[property];
    }
  }
  Place.findOneAndUpdate(
    { _id : req.body.data._id },
    update,
    (err, result) => {
      if(err) {
        return res.status(500).json({ message: "공간 수정 오류 "});
      }
      return res.json({
        data: result,
      });
    },
  );
  return null;
});
// 공간 여러개 삭제
router.delete('/', (req, res) => {
  if(Array.isArray(req.body.data)) {
    const _ids = req.body.data.map(o => o._id);
    Place.deleteMany({_id: { $in: _ids } }, (err) => {
      if (err) {
        return res.status(500).json({message: '공간 삭제 오류: DB 삭제에 문제가 있습니다.'});
      }
      res.json({
        data: { message: '삭제완료' },
      });
    });
  }
  else {
    if (!req.body.data._id) {
      return res.status(500).json({message: '공간 삭제 오류: _id가 전송되지 않았습니다.'});
    }
    Place.findOneAndRemove(
      { _id: req.body.data._id },
      (err, result) =>
        res.json({
          data: result,
        }),
    );
  }
  return null;
});
// 공간 전체 삭제
router.delete('/all', (req, res) => {
  Place.deleteMany(
    {},
    (err) => {
      if (err) {
        return res.status(500).json({ message: '공간 삭제 오류: DB 삭제에 문제가 있습니다.' });
      }
      res.json({
        message: '삭제완료',
      });
    },
  );
  return null;
});

export default router;