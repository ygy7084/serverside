
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import path from 'path';
import mongoose from 'mongoose';
import cors from 'cors';
import configure from './configure';

// 서버사이드 ajax를 위한 fetch
import 'isomorphic-fetch';

// 인증
//import auth from './routes/auth';

// api 라우트 로드
import api from './routes';

// 초기 계정
//import { Account } from './models';

// 서버와 포트 초기화
const app = express();
const port = configure.PORT;

// 몽고디비 연결 설정
const db = mongoose.connection;
mongoose.connect(configure.MONGO_URL, {
  useMongoClient: true,
});

// Mongoose 모듈의 Promise 변경 - 모듈 권고사항 (deprecated)
mongoose.Promise = global.Promise;

// 몽고디비 연결
db.on('error', console.error);
db.once('open', () => {
  console.log(`[MONGO DB URL] : ${configure.MONGO_URL}`);
});

// 정적 파일 라우트
app.use('/', express.static(path.join(__dirname, './../public')));

const whitelist = ['http://localhost:3000', 'http://localhost', 'http://172.30.1.32:3000'];

/*
const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
*/
app.post('/auth/login', (req, res) => {
  return res.json({
    data: {
      username: 'username',
      name: 'name',
      level: '관리자',
      shop: 'tempshop',
    },
  });
});
app.get('/auth', (req, res) => {
  return res.json({
    data: {
      username: 'username',
      name: 'name',
      level: '관리자',
      shop: 'tempshop',
    },
  });
});

// 쿠키 사용
app.use(cookieParser());

// POST 연결을 위한 설정
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(bodyParser.json({ limit: '5mb' }));
app.enable('trust proxy');

/*
// 인증
const sessionConfig = {
  secret: configure.SECRET,
  resave: false,
  saveUninitialized: false,
};
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use(auth);
*/
// API 라우트
app.use('/api', api);
app.post('/login', (req, res) => {
  console.log(req.body.data);
  if(req.body.data.username==='abc') {
    res.json({ data: { success: true } });
  } else {
    res.status(500).send({message:'gg'})
  }
})
// 404 에러
app.use((req, res) => {
  res.status(404).send('NOT FOUND');
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is listening on this port : ${port}`);
});



