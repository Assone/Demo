export default class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    this.init();
  }

  init() {
    this.exec();
    this.bindEvent();
  }

  exec() {}
  bindEvent() {}
}
