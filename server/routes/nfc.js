import express from 'express';

import {
  Nfc,
} from '../models';

const router = express.Router();

/*
  name: String,
  shop: {
    id: {type: Schema.Types.ObjectId, ref: 'shop'},
    name: String,
  },
  url: String,
 */


//nfc 생성
router.post('/', (req, res) => {
  const nfcTemp = {
    name: req.body.data.name,
    shop: req.body.data.shop,
    url: req.body.data.url,
  };

  const nfc = new Nfc(nfcTemp);
  nfc.save((err,result) => {
    if(err){
      return res.status(500).json({ message : 'nfc 생성 오류:'});
    }
    return res.json({
      data: result,
    });
  });

  return null;
});

//nfc 리스트 조회
router.get('/', (req, res) => {
  Nfc.find({})
    .exec((err, result) => {
      if(err){
        return res.status(500).json({ message : "nfc 리스트 조회 오류 "});
      }
      return res.json({
        data: result,
      });
    });
});

//nfc 단일 조회
router.get('/:id', (req, res) => {
  Nfc.findOne({ _id: req.params.id })
    .lean()
    .exec((err, result) => {
      if(err) {
        return res.status(500).json({ message: 'nfc 조회 오류'});
      }
      return res.json({
        data: result,
      });
    });
});

//nfc 수정
router.put('/:_id', (req, res) => {
  if(!req.params._id){
    return res.status(500).json({ message : 'nfc 수정 오류: _id가 전송되지 않았습니다.'});
  }

  const properties = [
    'name',
    'shop',
    'url',
  ];
  const update = { $set: {} };
  for (const property of properties){
    if(Object.prototype.hasOwnProperty.call(req.body.data, property)){
      update.$set[property] = req.body.data[property];
    }
  }
  Nfc.findOneAndUpdate(
    { _id : req.params._id },
    update,
    (err, result) => {
      if(err) {
        return res.status(500).json({ message: "nfc 수정 오류 "});
      }
      return res.json({
        data: result,
      });
    },
  );
  return null;
});

//nfc 삭제
/*
router.delete('/:_id', (req, res) => {
  if (!req.params._id) {
    return res.status(500).json({ message: 'nfc 삭제 오류: _id가 전송되지 않았습니다.' });
  }
  Nfc.findOneAndRemove(
    { _id: req.params._id },
    (err, result) =>
      res.json({
        data: result,
      }),
  );
  return null;
});
*/


//nfc 여러개 삭제
router.delete('/', (req, res) => {
  if(Array.isArray(req.body.data)) {
    const _ids = req.body.data.map(o => o._id);
    Nfc.deleteMany({_id: { $in: _ids } }, (err) => {
      if (err) {
        return res.status(500).json({message: 'nfc 삭제 오류: DB 삭제에 문제가 있습니다.'});
      }
      res.json({
        data: { message: '삭제완료' },
      });
    });
  }
  else {
    if (!req.body.data._id) {
      return res.status(500).json({message: 'nfc 삭제 오류: _id가 전송되지 않았습니다.'});
    }
    Nfc.findOneAndRemove(
      { _id: req.body.data._id },
      (err, result) =>
        res.json({
          data: result,
        }),
    );
  }
  return null;
});

// nfc 전체 삭제
router.delete('/all', (req, res) => {
  Nfc.deleteMany(
    {},
    (err) => {
      if (err) {
        return res.status(500).json({ message: 'nfc 삭제 오류: DB 삭제에 문제가 있습니다.' });
      }
      res.json({
        message: '삭제완료',
      });
    },
  );
  return null;
});


export default router;