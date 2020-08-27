import View from "./View.js";

export default class ViewContent extends View {
  constructor(view, template) {
    super(view, template);
  }

  render(data) {
    this._el.innerHTML = "";
    const regexp = /\{\{(.*)\}\}/g;
    let content = "";

    for (const todo of data) {
      content += this._template.replace(regexp, (match, key) => {
        return todo[key];
      });
    }

    this._el.innerHTML = content;
  }

  triggerActive(state) {
    state
      ? this._el.classList.add("active")
      : this._el.classList.remove("active");
  }
}
