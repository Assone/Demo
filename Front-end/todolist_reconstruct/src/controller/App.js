import Controller from "./Controller.js";
import View from "../view/View.js";

import ViewControl from "../view/Control.js";
import ControllerControl from "./Control.js";
import ViewContent from "../view/Content.js";
import ControllerContent from "./Content.js";

export default class App extends Controller {
  constructor(view, model) {
    super(view, model);
  }

  exec() {
    const time = this.method.getNowTime();
    const componentTime = new View("time");
    componentTime._el.textContent = time.now;
    componentTime._el.setAttribute("datetime", time.date);

    const componentControl = new ViewControl("#app__controls");
    const controllerControl = new ControllerControl(
      componentControl,
      this.model
    );

    const componentContent = new ViewContent(
      "#app__content",
      `
        <li data-timestamp={{timestamp}}>
          <i data-dir="tick" class="icon-tick"></i>
          <p class="content">{{content}}</p>
          <i data-dir="delete" class="icon-delete"></i>
        </li>
      `
    );
    const controllerContent = new ControllerContent(
      componentContent,
      this.model
    );
  }

  get method() {
    const _this = this;

    return {
      getNowTime() {
        return {
          now: new Date().toLocaleString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          }),
          date: new Date().toLocaleDateString().replace(/\//g, "-"),
        };
      },
    };
  }
}
