import Controller from "./Controller.js";

export default class ControllerControl extends Controller {
  constructor(view, model) {
    super(view, model);
  }

  exec() {
    this.view.updateActiveCount(this.model.getActiveTodo());
  }

  bindEvent() {
    this.view._component.input.addEventListener(
      "input",
      ({ target: { value } }) => {
        this.model.updateCurrentInput(value);
      }
    );
    this.view._component.input.addEventListener("keydown", ({ keyCode }) => {
      if (keyCode === 13 && this.model.currentInput !== "") {
        this.method.submit();
      }
    });
    this.view._component.submit.addEventListener("click", evt => {
      if (this.model.currentInput !== "") {
        this.method.submit();
      }
    });
    this.view._component.switch.addEventListener("click", ({ target }) => {
      if (target.tagName === "A") {
        const path = target.href.split("#")[1];

        switch (path) {
          case "incomplete":
            this.model.isIncomplete = true;
            break;
          case "complete":
            this.model.isIncomplete = false;
            break;
        }

        this.view.activeSwitch(target);
        this.model.eventHub.trigger("updateContent", this.model.getTodoList());
      }
    });

    this.model.eventHub.on("updateActiveCount", data => {
      this.view.updateActiveCount(data);
    });
  }

  get method() {
    const _this = this;

    return {
      submit() {
        const model = _this.model;

        _this.view.resetInput();
        model.addTodo(model.currentInput);
        model.currentInput = "";
        model.eventHub.trigger("updateContent", _this.model.getTodoList());
        model.eventHub.trigger(
          "updateActiveCount",
          _this.model.getActiveTodo()
        );
      },
    };
  }
}
