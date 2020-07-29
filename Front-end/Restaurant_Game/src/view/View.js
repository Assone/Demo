import { Watcher } from '../tools/DataProcess';

/** 视图基类 */
export default class View {
  /**
   * 实例化参数
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
   * @param {objectHash} reactiveHash 要绑定的映射表，绑定的值的键名要与组件表对应的组件的键名相等
   */
  init(model, reactiveHash) {
    this._model = model;
    this._reactiveTable = { ...reactiveHash } || {};
    this.getComponent();
    this.bindReactive();
    this.bindEvent();
    this.exec();
  }

  /**
   * 自定义执行
   */
  exec() {}

  /**
   * 获取组件
   */
  getComponent() {}

  /**
   * 绑定事件
   */
  bindEvent() {}

  /**
   * 绑定响应式
   */
  bindReactive() {
    if (JSON.stringify(this._reactiveTable) !== '{}') {
      // 如果映射表不为空则进行绑定
      for (const key in this._component) {
        // 循环组件表
        if (this._component.hasOwnProperty(key)) {
          // 开始绑定
          new Watcher(
              this._model,
              this._component[key],
              this._reactiveTable[key],
          );
        }
      }
    }
  }
}
