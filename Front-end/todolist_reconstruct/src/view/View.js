export default class View {
  constructor(el, template) {
    this._options = {};
    this._el = document.querySelector(el);
    this._template = template || "";
    this._component = {};

    this.init();
  }

  init() {
    this.exec();
    this.getComponent(this._options.component);
  }

  exec() {}

  getComponent(hash) {
    if (typeof hash === "object") {
      for (const key in hash) {
        if (hash.hasOwnProperty(key)) {
          this._component[key] = this._el.querySelector(hash[key]);
        }
      }
    }
  }

  render() {}
}
