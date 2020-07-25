/* eslint-disable object-curly-spacing */
import './assets/style/main.scss';

import { DEFAULT_DATA } from './config/index';
import RestaurantModel from './model/Restaurant';
import AppController from './controller/App';

const restaurant = new RestaurantModel(DEFAULT_DATA);
const app = new AppController(null, restaurant);
app.init();

window.app = app;
