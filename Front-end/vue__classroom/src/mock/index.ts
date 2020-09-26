// const Mock = require('mockjs');
import Mock from 'mockjs';
import { nav } from './data/app';
import { banner, classCloud, market, notice } from './data/home';

Mock.mock('/app', {
  nav,
});

Mock.mock('/api/home', {
  banner,
  classCloud,
  market,
  notice,
});
