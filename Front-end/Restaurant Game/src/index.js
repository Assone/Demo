import "./assets/style/main.scss";

import { DEFAULT_DATA } from "./config/index";
import RestaurantModel from "./model/Restaurant";
import AppController from "./controller/App";

let restaurant = new RestaurantModel(DEFAULT_DATA);

let app = new AppController(null, restaurant);
app.init();

window.app = app;
