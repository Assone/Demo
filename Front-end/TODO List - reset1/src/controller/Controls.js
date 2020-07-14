import Controller from "./Controller.js";

export default class ControlsController extends Controller {
  constructor(view) {
    super(view);
  }

  subscription() {
    this.notice.on("updateActiveCount", (data) => {
      this.view.update.activeTaskCount();
    });

    this.notice.on("isIncompleteView", (data) => {
      this.view.update.switchView(data);
    });

    this.notice.on("currentValue", (data) => {
      this.view.update.input(data);
    });
  }
}
