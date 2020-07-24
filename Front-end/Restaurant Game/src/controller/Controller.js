export default class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  init(options) {
    if (typeof this.model === "function")
    this.model = new this.model(options.data) || null;
    
    if (typeof this.view === 'function') {
      this.view = new this.view(options.el, options.template);
      this.view.init(this.model, options.reactiveHash);
    } 
  }
}
