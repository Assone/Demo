import './assets/style/main.scss'

import RestaurantModel from './model/Restaurant';
import AppController from './controller/App';

let restaurant = new RestaurantModel({
  time: {
    week: 1,
    day: 1
  },
  staff: [],
  cost: 200
});

let app = new AppController(null, restaurant);
app.init();

window.app = app