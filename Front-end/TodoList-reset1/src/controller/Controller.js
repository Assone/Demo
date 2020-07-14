export default class Controller {
  constructor(view) {
    this.view = view;
  }

  init(options) {
    this.view = new this.view(options.el, options.template);
    this.view.notice = this.notice;
    this.subscription();
    this.view.init(this.model);
  }

  subscription() {}
}
