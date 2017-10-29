import express from 'express';

const router = express.Router();

let foods = [];
foods.push({id:1,
  subject:'토피 넛 크런치 라떼',
  content:'카라멜과 아몬드에서 느껴지는 고소한' +
  '달콤함과 은은한 버터 풍미가 에스프레소 샷과 어우리진 ' +
  '토피 넛 크런치 라떼가 크리스마스 시즌을 맞이해 돌아왔습니다.',
  spec:{
    size:'Tall(톨)',
    vol:'355ml (12floz)',
  },
  nutrient: {
    kcal:'290',
    Na:'230',
    Pohwa:'9',
    dang:'29',
    protein:'9',
    coffein:'75'
  },
  image_url:'/image1.jpg'
});

foods.push({id:2,
  subject:'바닐라 크림 콜드 브루',
  content:'콜드 브루에 더해진 바닐라 크림으로 깔끔하면서 달콤한' +
          '콜드 브루를 새롭게 즐길 수 있습니다.',
  spec:{
    size:'Tall(톨)',
    vol:'355ml (12floz)',
  },
  nutrient: {
    kcal:'125',
    Na:'58',
    Pohwa:'6',
    dang:'11',
    protein:'3',
    coffein:'125'
  },
  image_url:'/image2.jpg'
});





router.get('/', (req,res) => {



  res.json(foods);

});

router.get('/:subject', (req,res) =>{
  for(const food of foods){
    if(food.subject===req.params.subject){
      res.json(food);
    }
  }
});



export default router;