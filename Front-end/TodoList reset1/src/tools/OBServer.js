export default class OBServer {
  constructor(vm, ...data) {
    this.vm = vm;
    this.data = data;
    this.notice = vm.notice;

    for (const item of this.data) {
      this.init(item);
    }
  }

  init(data) {
    if (typeof data !== "object") return;

    Object.keys(data).forEach((key) => {
      this.defineReactive(this.vm, key, data[key], data);

      if (typeof data[key] === "object") this.init(data[key]);
    });
  }

  defineReactive(vm, key, value, slot) {
    const notice = this.notice;

    Object.defineProperty(vm, key, {
      get() {
        return value;
      },
      set(newValue) {
        if (value !== newValue) {
          value = newValue;
          slot[key] = newValue;
          notice.trigger(key, newValue);
        }
      },
    });
  }
}
