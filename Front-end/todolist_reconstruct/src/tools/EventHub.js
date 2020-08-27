export default class EventHub {
  constructor() {
    this.subscription = {};
  }

  on(type, callback) {
    if (!this.subscription[type]) this.subscription[type] = [];

    this.subscription[type].push(callback);
  }

  trigger(type, data) {
    this.subscription[type] &&
      this.subscription[type].forEach(cb => {
        cb.call(null, data);
      });
  }
}
