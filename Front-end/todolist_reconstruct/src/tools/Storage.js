export default class Storage {
  constructor() {}

  static set(data) {
    localStorage.setItem("data", JSON.stringify(data));
  }

  static get() {
    return JSON.parse(localStorage.getItem("data"));
  }
}
