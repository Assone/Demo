<template>
  <div id="app">
    <Controls
      @addTask="addTask"
      @switchView="switchView"
      :activeTaskCount="activeTaskCount"
      :isIncomplete="isIncompleteView"
    />
    <Content
      @deleteTask="deleteTask"
      :isIncomplete="isIncompleteView"
      @switchTask="switchTask"
      :list="filterList"
    />
  </div>
</template>

<script>
import Controls from "./components/Controls.vue";
import Content from "./components/Content.vue";

export default {
  name: "App",
  components: {
    Controls,
    Content
  },
  data() {
    return {
      isIncompleteView: true,
      todo: []
    };
  },
  methods: {
    addTask(value) {
      this.todo.push({
        content: value,
        completed: false,
        timestamp: Date.now()
      });
    },
    switchView() {
      this.isIncompleteView = !this.isIncompleteView;
    },
    switchTask(timestamp) {
      const task = this.todo.find(task => task.timestamp == timestamp);
      task.completed = !task.completed;
    },
    deleteTask(timestamp) {
      const taskIndex = this.todo.findIndex(
        task => task.timestamp == timestamp
      );
      this.todo.splice(taskIndex, 1);
    }
  },
  computed: {
    activeTaskCount() {
      return this.todo.filter(task => task.completed === false).length;
    },
    filterList() {
      return this.todo.filter(task => task.completed !== this.isIncompleteView).reverse();
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

body,
ul {
  padding: 0;
  margin: 0;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;

  font-family: Helvetica, sans-serif;
}

ul {
  list-style-type: none;
}

button {
  cursor: pointer;
}

.active {
  color: var(--switch-view_button_color-active) !important;
}

#app {
  --color_decoration: #bdbdbd;
  --color_active: #f6f6f6;

  --app_width: 800px;
  --app_height: 550px;
  --app_border-radius: 5px;
  --app_background-color: #3c3c4c;

  --switch-view_button_color: var(--color_decoration);
  --switch-view_button_color-active: var(--color_active);

  --tasks-count_color: #54bfdc;

  --controls_input-box_width: calc(var(--app_width) * 0.4);
  --controls_submit_padding: 0 10px;
  --controls_submit_color: #fff;
  --controls_submit_background-color: #62d9f9;
  --controls_component_height: 30px;

  --logo_check: url(./assets/icon-tick.svg);
  --logo_delete: url(./assets/icon-delete.svg);
}

#app {
  max-width: var(--app_width);
  width: 100%;
  height: var(--app_height);
  padding: 3%;
  border-radius: var(--app_border-radius);

  color: var(--color_decoration);
  background-color: var(--app_background-color);
}
</style>
