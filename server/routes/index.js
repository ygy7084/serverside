import express from 'express';

import account from './account';
import shop from './shop';
import customer from './customer';
import product from './product';
import history from './history';

const router = express.Router();

router.use('/account', account);
router.use('/shop', shop);
router.use('/customer', customer);
router.use('/product', product);
router.use('/history', history);

export default router;