import View from './View';

/**
 * 通知视图
 * @extends View
 */
export default class NoticeView extends View {
  /** @inheritdoc */
  constructor(el, template) {
    super(el, template);
  }

  /** @inheritdoc */
  getComponent() {
    this._component.welcome = this._el.querySelector('#welcome');
  }

  /** @inheritdoc */
  exec() {
    this.update.welcome();
  }

  /** @inheritdoc */
  bindEvent() {
    this._component.welcome.addEventListener('click', (evt) => {
      const dir = evt.target.dataset.dir;

      if (dir === 'start') {
        this.update.welcome(); // 隐藏欢迎页面
        localStorage.setItem('showWelcome', false); // 设置下次不展示欢迎页面
      }
    });
  }

  /** 方法 */
  get methods() {
    return {
      switchClass(node, className) {
        node.classList.contains(className)
          ? node.classList.remove(className)
          : node.classList.add(className);
      },
    };
  }

  /** 更新视图 */
  get update() {
    const _this = this;

    return {
      welcome() {
        const state = localStorage.getItem('showWelcome');

        // 如果之前显示过了欢迎页面则不再显示
        if (state === 'false') return;

        // 切换notice和welcome的样式
        _this.methods.switchClass(_this._el, 'show');
        _this.methods.switchClass(_this._component.welcome, 'show');
      },
    };
  }
}
