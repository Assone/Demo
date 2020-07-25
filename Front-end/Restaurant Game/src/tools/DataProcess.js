/**
 * 数据分发者
 */
class Dep {
  /**
   * 直接实例化
   */
  constructor() {
    this.subscription = [];
  }

  /**
   * 添加订阅
   * @param {Watcher} target Watcher对象
   */
  add(target) {
    this.subscription.push(target);
  }

  /**
   * 通知订阅
   */
  notify() {
    this.subscription.map((watcher) => watcher.update());
  }
}

/**
 * 数据订阅者
 */
class Watcher {
  /**
   * 实例化参数
   * @param {model} model 要监听的模型
   * @param {elementNode} node 绑定的元素节点
   * @param {string} key 监听的数据的键名
   */
  constructor(model, node, key) {
    Dep.target = this;
    this.model = model;
    this.node = node;
    this.key = key;
    this.update();
    Dep.target = null;
  }

  /**
   * 更新节点数据
   */
  update() {
    this.value = this.get();
    if (this.node.nodeType === 1) {
      this.node.textContent = this.value;
    } else {
      this.node.nodeValue = this.value;
    }
  }

  /**
   * 获取model里对应的数据
   * @return {*} 返回模型里的数据
   */
  get() {
    let value = this.model;
    this.key.split('.').forEach((key) => {
      value = value[key];
    });
    return value;
  }
}

/**
 * 数据处理
 */
class OBServer {
  /**
   * 实例化参数
   * @param {this} vm 要劫持的数据模型
   * @param {object} data 模型的数据
   */
  constructor(vm, data) {
    this.vm = vm;
    this.data = data;

    this.dataHijacking(this.vm, this.data);
  }

  /**
   * 数据劫持
   * @param {this} vm 要劫持的数据所在的对象
   * @param {object} data 要劫持的数据
   */
  dataHijacking(vm, data) {
    if (typeof data !== 'object') return;

    Object.keys(data).map((key) => {
      this.defineReactive(vm, key, data[key]);

      if (typeof data[key] === 'object') this.dataHijacking(vm[key], data[key]);
    });
  }

  /**
   * 数据响应式处理
   * @param {this} vm 要处理的参数所在的对象
   * @param {string} key 要处理的属性的属性名
   * @param {*} value 要处理的属性的值
   */
  defineReactive(vm, key, value) {
    const dep = new Dep();

    Object.defineProperty(vm, key, {
      enumerable: true,
      configurable: true,
      get() {
        if (Dep.target) dep.add(Dep.target);
        return value;
      },
      set(newValue) {
        if (newValue !== value) {
          value = newValue;
          dep.notify();
        }
      },
    });
  }
}

export { Dep, Watcher, OBServer };
