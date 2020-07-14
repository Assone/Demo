export default class View {
  constructor(el, template) {
    this.el = document.querySelector(el);
    this.template = template || "";
    this.component = {};
  }

  init(model) {
    this.model = model;
    this.run();
  }
}
