import Controller from "./Controller";

import InfoController from "./Info";
import InfoView from "../view/Info";
import NoticeController from './Notice';
import NoticeView from '../view/Notice';

export default class AppController extends Controller {
  constructor(view, model) {
    super(view, model)
  }

  init() {
    new InfoController(InfoView, this.model).init({
      el: '#restaurant-info',
      reactiveHash: {
        week: 'time.week',
        day: 'time.day',
        cost: 'cost'
      },
    });

    new NoticeController(NoticeView, this.model).init({
      el: '#notice'
    });
  }
}