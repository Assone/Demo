import App from "./controller/App.js";
import View from "./view/View.js";
import Model from "./Model/Model.js";

import Storage from "./tools/Storage.js";

const view = new View("#app");
const model = new Model();

if (Storage.get() !== null) {
  model.data = Storage.get();
} else {
  model.addTodo("or change its state");
  model.addTodo("You can delete it");
  model.addTodo("This is the first Todo");
}

const app = new App(view, model);

window.addEventListener("beforeunload", evt => {
  Storage.set(model.data);
});

window.app = app;
