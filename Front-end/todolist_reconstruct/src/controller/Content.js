import Controller from "./Controller.js";

export default class ControllerContent extends Controller {
  constructor(view, model) {
    super(view, model);
  }

  exec() {
    this.view.render(this.model.getTodoList());
  }

  bindEvent() {
    this.model.eventHub.on("updateContent", data => {
      this.view.render(data);
      this.view.triggerActive(!this.model.isIncomplete);
    });
    this.view._el.addEventListener("click", ({ target }) => {
      if (target.tagName === "I") {
        const dir = target.dataset.dir;
        const timestamp = target.parentElement.dataset.timestamp;

        if (dir === "delete") {
          this.model.deleteTodo(timestamp);
        } else {
          this.model.triggerTodo(timestamp);
        }

        this.model.eventHub.trigger("updateContent", this.model.getTodoList());
        this.model.eventHub.trigger(
          "updateActiveCount",
          this.model.getActiveTodo()
        );
      }
    });
  }
}
