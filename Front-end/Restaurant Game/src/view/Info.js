import View from "./View";

export default class InfoView extends View {
  constructor(el, template) {
    super(el, template);
  }

  getComponent() {
    this._component.week = this._el.querySelector("#time_week");
    this._component.day = this._el.querySelector("#time_day");
    this._component.cost = this._el.querySelector("#restaurant-info_cost");
  }
}
