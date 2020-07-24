import './assets/style/reset.scss';
import './assets/style/main.scss'

import RestaurantModel from './model/Restaurant';
import InfoView from './view/Info';

let restaurant = new RestaurantModel({
  time: {
    week: 1,
    day: 1
  },
  staff: [],
  cost: 200
})

let infoComponent = new InfoView('#restaurant-info');
infoComponent.init(restaurant, {
  week: 'time.week',
  day: 'time.day',
  cost: 'cost'
});

window.infoComponent = infoComponent
window.restaurant = restaurant;