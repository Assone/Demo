export default class NoticeHub {
  constructor() {
    this.subscription = {};
  }

  on(evt, func) {
    if (this.subscription[evt]) {
      this.subscription[evt].push(func);
    } else {
      this.subscription[evt] = [func];
    }
  }

  trigger(evt, data) {
    if (this.subscription[evt]) {
      for (const func of this.subscription[evt]) {
        func.call(null, data);
      }
    } else {
      console.error(`Not ${evt} Event be Subscription`);
    }
  }
}
