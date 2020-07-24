class Dep {
  constructor() {
    this.subscription = [];
  }

  add(target) {
    this.subscription.push(target);
  }

  notify() {
    this.subscription.map((watcher) => watcher.update());
  }
}

class Watcher {
  constructor(model, node, key) {
    Dep.target = this;
    this.model = model;
    this.node = node;
    this.key = key;
    this.update();
    Dep.target = null;
  }

  update() {
    this.value = this.get();
    if (this.node.nodeType === 1) {
      this.node.textContent = this.value;
    } else {
      this.node.nodeValue = this.value;
    }
  }

  get() {
    let value = this.model;
    this.key.split(".").forEach((key) => {
      value = value[key];
    });
    return value;
  }
}

class OBServer {
  constructor(vm, data) {
    this.vm = vm;
    this.data = data;

    this.dataHijacking(this.vm, this.data);
  }

  dataHijacking(vm, data) {
    if (typeof data !== "object") return;

    Object.keys(data).map((key) => {
      this.defineReactive(vm, key, data[key]);

      if (typeof data[key] === "object") this.dataHijacking(vm[key], data[key]);
    });
  }

  defineReactive(vm, key, value) {
    let dep = new Dep();

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
