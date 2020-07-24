import DataModel from "./model/Data.js";
import ControlsController from "./controller/Controls.js";
import ControlsView from "./view/Controls.js";
import ContentController from "./controller/Content.js";
import ContentView from "./view/Content.js";

const Controls = new ControlsController(ControlsView);
const Content = new ContentController(ContentView);
const Data = new DataModel();

Data.init();
Data.content(Controls, Content);

Controls.init({
  el: "#controls",
});
Content.init({
  el: "#content",
  template: `
    <li>
      <a href="#" class="content-click" data-dir="tick"></a>
      <p class="content"></p>
      <a href="#" class="content-delete" data-dir="delete"></a>
    </li>
  `,
});
