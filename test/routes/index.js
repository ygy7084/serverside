import account from './account';
import shop from './shop';
import customer from './customer';
import product from './product';
import history from './history';

export default function(){
  describe('Account Routes', account);
  describe('Shop Routes', shop);
  describe('Customer Routes', customer);
  describe('Product Routes', product);
  describe('History Routes', history);
}