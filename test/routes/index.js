import account from './account';
import shop from './shop';
import nfc from './nfc';
import log from './log';
import order from './order';
import customer from './customer';
import product from './product';
import history from './history';
import picture from './picture';

export default function(){
  describe('Account Routes', account);
  describe('Shop Routes', shop);
  describe('Nfc Routes', nfc);
  describe('Log Routes', log);
  describe('Order Routes', order);
  describe('Picture Routes', picture);
  describe('Customer Routes', customer);
  describe('Product Routes', product);
  //describe('History Routes', history);
  //describe('data settings', dataSetting);
}