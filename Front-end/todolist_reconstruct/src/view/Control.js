import View from "./View.js";

export default class ViewControl extends View {
  constructor(view, template) {
    super(view, template);
  }

  exec() {
    this._options.component = {
      input: "input",
      submit: "button",
      count: "#controls-tasks-count",
      switch: "#switch-view",
    };
  }

  resetInput() {
    this._component.input.value = "";
  }

  activeSwitch(target) {
    Array.from(this._component.switch.children).forEach(element => {
      element.classList.remove("active");
    });

    target.classList.add("active");
  }

  updateActiveCount(value) {
    this._component.count.textContent = `${value} Active Task`;
  }
}
