/**
 * 控制器基类
 */
export default class Controller {
  /**
   * 实例化参数
   * @param {view} view - 要绑定的视图
   * @param {model} model - 要绑定的模型
   */
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  /**
   * 控制器初始化
   * @method
   * @param {object} options - 参数
   * @param {string} options.el - 视图的选择器
   * @param {string} options.template - 视图的模版
   * @param {object} options.reactiveHash - 视图的数据映射表
   * @param {object} options.data - 模型的数据
   */
  init(options) {
    if (typeof this.model === 'function') {
      this.model = new this.model(options.data) || null;
    }

    if (typeof this.view === 'function') {
      this.view = new this.view(options.el, options.template);
      this.view.init(this.model, options.reactiveHash);
    }
  }
}
