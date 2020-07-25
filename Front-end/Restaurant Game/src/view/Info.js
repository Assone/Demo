import View from './View';

/**
 * 餐厅信息视图
 * @extends View
 */
export default class InfoView extends View {
  /** @inheritdoc */
  constructor(el, template) {
    super(el, template);
  }

  /** @inheritdoc */
  getComponent() {
    this._component.week = this._el.querySelector('#time_week');
    this._component.day = this._el.querySelector('#time_day');
    this._component.cost = this._el.querySelector('#restaurant-info_cost');
  }
}
