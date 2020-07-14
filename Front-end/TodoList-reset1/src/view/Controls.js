import View from "./View.js";

export default class ControlsView extends View {
  constructor(el, template) {
    super(el, template);
  }

  run() {
    this.getComponent();
    this.bindEvent();
    this.render();
  }

  getComponent() {
    this.component.time = this.el.querySelector("time");
    this.component.switchView = this.el.querySelector("#switch-view");
    this.component.incompleteView = this.el.querySelector("#view-incomplete");
    this.component.completeView = this.el.querySelector("#view-completed");
    this.component.taskCount = this.el.querySelector("#controls-tasks-count");
    this.component.input = this.el.querySelector("#controls-box_input");
    this.component.submit = this.el.querySelector("#controls-box_submit");
  }

  bindEvent() {
    const _this = this;

    this.component.switchView.addEventListener("click", (evt) => {
      const target = evt.target;

      if (target.tagName === "BUTTON") {
        if (_this.methods.isActive(target)) return;

        _this.model.methods.updateView();
        _this.notice.trigger("updateView");
      }
    });

    this.component.input.addEventListener("input", function (evt) {
      _this.model.methods.updateCurrentValue(evt.target.value);
      _this.notice.trigger(
        "updateActiveCount",
        _this.model.methods.getActiveTaskCount
      );
    });

    this.component.input.addEventListener("keydown", function (evt) {
      if (evt.keyCode === 13) {
        if (this.value) _this.model.methods.add(this.value);
        _this.methods.updateDate();
      }
    });

    this.component.submit.addEventListener("click", (evt) => {
      if (this.model.currentValue) {
        _this.model.methods.add(_this.model.currentValue);
        _this.methods.updateDate();
      }
    });
  }

  get methods() {
    const _this = this;

    return {
      isActive(target) {
        return target.classList.contains("active");
      },

      updateDate() {
        _this.model.methods.updateCurrentValue();
        _this.notice.trigger(
          "updateActiveCount",
          _this.model.methods.getActiveTaskCount
        );

        if (_this.model.isIncompleteView) _this.notice.trigger("updateView");
      },
    };
  }

  render() {
    this.update.time();
    this.update.activeTaskCount();
  }

  get update() {
    const _this = this;
    return {
      time() {
        const time = _this.model.methods.getTime();
        _this.component.time.textContent = time.now;
        _this.el.setAttribute("datatime", time.date);
      },
      switchView(data) {
        const btn_incomplete = _this.component.incompleteView;
        const btn_complete = _this.component.completeView;

        if (data) {
          btn_incomplete.classList.add("active");
          btn_complete.classList.remove("active");
        } else {
          btn_incomplete.classList.remove("active");
          btn_complete.classList.add("active");
        }
      },
      activeTaskCount() {
        const count = _this.model.methods.getActiveTaskCount();
        _this.component.taskCount.textContent = `${count} Active Tasks`;
      },
      input(data) {
        _this.component.input.value = data;
      },
    };
  }
}
