// const Mock = require('mockjs');
import Mock from 'mockjs';
import { nav } from './data/app';
import { banner, classCloud, market, notice } from './data/home';
import { mooc, lab, trainingCertification } from './data/course';

Mock.mock('/app', {
  nav,
});

Mock.mock('/api/home', {
  banner,
  classCloud,
  market,
  notice,
});

Mock.mock('/api/mooc', mooc);
Mock.mock('/api/lab', lab);
Mock.mock('/api/tc', trainingCertification);
