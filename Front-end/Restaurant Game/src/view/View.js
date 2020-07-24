import { Watcher } from "../tools/DataProcess";

export default class View {
  /**
   * 默认视图
   * @param {string} el 对应元素的css选择器
   * @param {string} template 要传入的模版
   */
  constructor(el, template) {
    this._options = {
      el,
      template: template || null,
    };
    this._el = document.querySelector(el);
    this._component = {};
  }

  /**
   * 初始化视图
   * @param {object} model 要绑定的模型
   * @param {objectHash}} reactiveHash 要绑定的映射表，绑定的值的键名要与组件表对应的组件的键名相等
   */
  init(model, reactiveHash) {
    this._model = model;
    this._reactiveTable = { ...reactiveHash } || {};
    this.getComponent();
    this.bindReactive();
  }

  // 获取子组件
  getComponent() {}

  // 绑定响应式
  bindReactive() {
    if (this._reactiveTable.valueOf() !== "{}") {
      // 如果映射表不为空则进行绑定
      for (const key in this._component) {
        // 循环组件表
        if (this._component.hasOwnProperty(key)) {
          new Watcher( // 开始绑定
            this._model,
            this._component[key],
            this._reactiveTable[key]
          );
        }
      }
    }
  }
}
