import View from './View';

export default class NoticeView extends View{
  constructor(el, template) {
    super(el, template);
  }

  getComponent() {
    this._component.welcome = this._el.querySelector('#welcome');
  }
}