function reactive(target) {
  const notice = new Notice();

  return new Proxy(target, {
    get(target, key, receiver) {
      if (typeof target[key] === 'object') return reactive(target[key]);

      Notice.target && notice.addSub(Notice.target);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      if (target[key] !== value) {
        const res = Reflect.set(target, key, value, receiver);

        notice.notify();

        return res;
      }
    },
  });
}

class Notice {
  constructor() {
    this.subscription = [];
  }

  addSub(watch) {
    this.subscription.push(watch);
  }

  notify() {
    this.subscription.forEach(sub => sub.update());
  }

  static watch(vm, key, element) {
    this.target = {
      vm,
      key,
      element,
      update() {
        const value = this.vm.data[this.key];
        if (this.element.nodeType === 1) {
          this.element.value = value;
        }
      },
    };

    this.target.update();
    this.target = null;
  }
}

class Model {
  constructor(data) {
    this.data = data;
    this.init();
  }

  init() {
    this.data = reactive(this.data);
  }

  get methods() {
    const _this = this;

    return {
      translateData() {
        return `${_this.data.xOffset}px ${_this.data.yOffset}px ${_this.data.blurRadius}px ${_this.data.spreadRadius}px ${_this.data.color}`;
      },
    };
  }
}
