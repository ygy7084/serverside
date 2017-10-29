import express from 'express';

import account from './account';
import shop from './shop';
import customer from './customer';
import product from './product';
import history from './history';
import test1 from './test1';

const router = express.Router();

router.use('/account', account);
router.use('/shop', shop);
router.use('/customer', customer);
router.use('/product', product);
router.use('/history', history);
router.use('/test1', test1);

export default router;