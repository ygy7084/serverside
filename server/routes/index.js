import express from 'express';

import account from './account';
import shop from './shop';
import customer from './customer';
import product from './product';
import history from './history';
import picture from './picture';
import nfc from './nfc';
import log from './log';
import order from './order';
import place from './place';
import menu from './menu';

const router = express.Router();

router.use('/account', account);
router.use('/shop', shop);
router.use('/customer', customer);
router.use('/product', product);
router.use('/history', history);
router.use('/picture', picture);
router.use('/nfc',nfc);
router.use('/log',log);
router.use('/order', order);
router.use('/place', place);
router.use('/menu', menu);

export default router;