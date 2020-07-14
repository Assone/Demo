import Controller from "./Controller.js";

export default class ContentController extends Controller {
  constructor(view) {
    super(view);
  }

  subscription() {
    this.notice.on("updateView", this.view.update.view);
  }
}
