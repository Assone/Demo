import OBServer from "../tools/OBServer.js";
import NoticeHub from "../tools/NoticeHub.js";

const Notice = new NoticeHub();

export default class DataModel {
  constructor() {
    this.data = {
      todo: [],
      currentValue: "",
    };
    this.state = {
      isIncompleteView: true,
    };
    this.notice = Notice;
  }

  init() {
    new OBServer(this, this.data, this.state);
    this.methods.updateTime();
  }

  content(...controller) {
    for (const control of controller) {
      control.model = this;
      control.notice = this.notice;
    }
  }

  get methods() {
    const _this = this;

    return {
      getTime() {
        return _this.time;
      },
      updateTime() {
        _this.time = {
          now: new Date().toLocaleString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          }),
          date: new Date().toLocaleDateString().replace(/\//g, "-"),
        };
      },
      updateCurrentValue(value) {
        _this.currentValue = value || "";
      },
      updateView() {
        _this.isIncompleteView = !_this.isIncompleteView;
      },
      add(content) {
        _this.todo.push({
          content,
          completed: false,
          timestamp: Date.now(),
        });
      },
      getActiveTaskCount() {
        return _this.todo.filter((task) => task.completed === false).length;
      },
      getViewHiddenList() {
        return _this.todo.filter(
          (task) => task.completed === _this.isIncompleteView
        );
      },
      getViewShowList() {
        return _this.todo.filter(
          (task) => task.completed !== _this.isIncompleteView
        );
      },
    };
  }
}
