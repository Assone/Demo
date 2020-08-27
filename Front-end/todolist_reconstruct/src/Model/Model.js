import EventHub from "../tools/EventHub.js";

export default class Model {
  constructor() {
    this.data = [];
    this.currentInput = "";
    this.isIncomplete = true;

    this.eventHub = new EventHub();
  }

  addTodo(content) {
    this.data.push({
      content,
      done: false,
      timestamp: Math.random(),
    });
  }

  deleteTodo(selectorTimestamp) {
    const index = this.data.findIndex(
      ({ timestamp }) => timestamp == selectorTimestamp
    );

    if (index !== -1) this.data.splice(index, 1);
  }

  triggerTodo(selectorTimestamp) {
    this.data.forEach(todo => {
      if (todo.timestamp == selectorTimestamp) {
        todo.done = !todo.done;
      }
    });
  }

  getTodoList() {
    return this.data.filter(todo => todo.done !== this.isIncomplete).reverse();
  }

  getActiveTodo() {
    return this.data.filter(todo => todo.done === false).length;
  }

  updateCurrentInput(value) {
    this.currentInput = value;
  }

  getCurrentInput() {
    return this.currentInput;
  }
}
