class NoticeHub {
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

const Notice = new NoticeHub();

const time = {
  now: new Date().toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }),
  date: new Date().toLocaleDateString().replace(/\//g, "-"),
};

const componentTime = document.querySelector("time");
componentTime.textContent = time.now;
componentTime.setAttribute("datetime", time.date);

const componentSwitch = document.querySelector("#switch-view");
componentSwitch.addEventListener("click", function (evt) {
  const target = evt.target;

  if (target.tagName == "BUTTON") {
    if (target.classList.contains("active")) return;

    this.querySelector(".active").classList.remove("active");
    target.classList.add("active");

    state.isIncompleteView = target.id.slice(5) === 'incomplete';
    renderContent();
  }
});

const TodoList = [];
const state = {
  isIncompleteView: true
}

const componentInput = document.querySelector("#controls-box_input");
componentInput.addEventListener("keydown", (evt) => {
  const target = evt.target;

  if (evt.keyCode === 13) {
    if (target.value) {
      TodoList.push({
        content: target.value,
        completed: false,
      });
      target.value = "";

      Notice.trigger("updateActiveCount", TodoList.filter(task => task.completed === false).length);
      if (state.isIncompleteView) renderContent();
    }
  }
});

const componentSubmit = document.querySelector("#controls-box_submit");
componentSubmit.addEventListener("click", (evt) => {
  const value = componentInput.value;

  if (value) {
    TodoList.push({
      content: value,
      completed: false,
    });
    componentInput.value = "";

    Notice.trigger("updateActiveCount", TodoList.filter(task => task.completed === false).length);
    if (state.isIncompleteView) renderContent();
  }
});

const componentContent = document.querySelector("#content");
componentContent.addEventListener("click", function (evt) {
  evt.preventDefault();
  const target = evt.target;

  if (target.tagName === "A") {
    let container = target.parentElement;
    let content = container.querySelector(".content").textContent;

    if (target.dataset.dir === "completed") {
      for (const task of TodoList) {
        if (task.content === content) {
          task.completed = !task.completed;
        }
      }
    } else {
      let contentIndex = null;

      TodoList.forEach((task, index) => {
        if (task.content === content) contentIndex = index;
      });

      TodoList.splice(contentIndex, 1);
    }

    Notice.trigger("updateActiveCount", TodoList.filter(task => task.completed === false).length);
    this.removeChild(container);
  }
});

const componentCount = document.querySelector("#controls-tasks-count");
componentCount.textContent = '0 Active Tasks'
Notice.on("updateActiveCount", (data) => {
  componentCount.textContent = `${data} Active Tasks`;
});

function renderContent() {
  const completed = state.isIncompleteView ? false : true;
  const list = TodoList.filter(task => task.completed === completed);

  const fragment = document.createDocumentFragment();
  for (const task of list) {
    const li = document.createElement('li');
    const btn_click = document.createElement('a');
    const btn_delete = document.createElement('a');
    const container = document.createElement('p');

    btn_click.classList.add('content-click');
    btn_click.dataset.dir = 'completed';
    if (!state.isIncompleteView) {
      btn_click.classList.add('active');
    }
    btn_delete.classList.add('content-delete');
    btn_delete.dataset.dir = 'delete';
    container.classList.add('content');
    container.textContent = task.content;

    li.appendChild(btn_click);
    li.appendChild(container);
    li.appendChild(btn_delete);

    fragment.appendChild(li)
  }

  componentContent.innerHTML = '';
  componentContent.appendChild(fragment);
}