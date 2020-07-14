import View from "./View.js";

export default class ContentView extends View {
  constructor(el, template) {
    super(el, template);
  }

  run() {
    this.bindEvent();
    this.render();
  }

  render() {
    this.update.view();
  }

  bindEvent() {
    const _this = this;

    this.el.addEventListener("click", function (evt) {
      evt.preventDefault();

      if (evt.target.tagName === "A") {
        let container = evt.target.parentElement;

        if (evt.target.dataset.dir === "tick") {
          let task = _this.model.todo.find(
            (task) => task.timestamp == container.dataset.timestamp
          );
          task.completed = !task.completed;
        } else {
          let contentIndex = _this.model.todo.findIndex(
            (task) => task.timestamp == container.dataset.timestamp
          );
          contentIndex && _this.model.todo.splice(contentIndex, 1);
        }

        this.removeChild(container);
        _this.notice.trigger(
          "updateActiveCount",
          _this.model.methods.getActiveTaskCount()
        );
      }
    });
  }

  get update() {
    const _this = this;

    return {
      view() {
        const fragment = document.createDocumentFragment();
        const temp = document.createDocumentFragment();
        let child = null;

        while ((child = _this.el.firstChild)) {
          temp.appendChild(child);
        }

        const showList = _this.model.methods.getViewShowList().reverse();

        for (const message of showList) {
          const container = document.createElement("div");

          container.innerHTML = _this.template;
          container.querySelector(".content").textContent = message.content;
          container.children[0].dataset.timestamp = message.timestamp;
          fragment.appendChild(container.children[0]);
        }

        if (!_this.model.isIncompleteView) {
          fragment
            .querySelectorAll(".content-click")
            .forEach((node) => node.classList.add("active"));
        }

        _this.el.appendChild(fragment);
      },
    };
  }
}
