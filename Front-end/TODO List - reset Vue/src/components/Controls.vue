<template>
  <div id="controls">
    <div id="controls-info">
      <time v-bind:datetime="date">{{time}}</time>
      <div id="switch-view">
        <button
          id="view-incomplete"
          @click="switchView"
          :class="{active: isIncomplete}"
        >Incomplete Tasks</button>
        <button
          id="view-completed"
          @click="switchView"
          :class="{active: !isIncomplete}"
        >Completed Tasks</button>
      </div>
    </div>
    <div id="controls-tasks-count">{{activeTaskCount}} Active Tasks</div>
    <div id="controls-box">
      <input
        id="controls-box_input"
        v-model="currentValue"
        @keydown="addTask"
        type="text"
        placeholder="Enter a task..."
      />
      <button id="controls-box_submit" @click="addTask">Add Task</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Controls",
  props: {
    activeTaskCount: Number,
    isIncomplete: Boolean
  },
  data() {
    return {
      time: new Date().toLocaleString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric"
      }),
      date: new Date().toLocaleDateString().replace(/\//g, "-"),
      currentValue: ""
    };
  },
  methods: {
    addTask(evt) {
      if (
        (evt.type === "keydown" && evt.keyCode === 13) ||
        evt.type === "click"
      ) {
        if (this.currentValue !== "") {
          this.$emit("addTask", this.currentValue);
          this.currentValue = "";
        }
      }
    },
    switchView() {
      this.$emit("switchView");
    }
  }
};
</script>

<style lang="stylus" scoped>
#controls {
  border-bottom: 1px solid var(--color_decoration);
}

#controls-info {
  display: flex;
}

#controls-info time {
  flex-grow: 1;
  color: #FFF;
}

#switch-view button {
  border: 0;
  color: var(--switch-view_button_color);
  background-color: transparent;
}

#controls-info [data-task='incomplete'] {
  margin-right: calc((var(--app_width) / 40));
}

#controls-tasks-count {
  font-size: 12px;
  color: var(--tasks-count_color);
}

#controls-box {
  margin-top: 3%;
  margin-bottom: 5%;
}

#controls-box_input {
  width: var(--controls_input-box_width);
  height: var(--controls_component_height);
  padding: 10px;
  border: 0;
  border-radius: calc(var(--app_border-radius) - 2px);
  margin-right: 5px;
}

#controls-box_input::placeholder {
  color: var(--color_decoration);
}

#controls-box_submit {
  height: var(--controls_component_height);
  padding: var(--controls_submit_padding);
  border: 0;
  border-radius: calc(var(--app_border-radius) - 2px);
  color: var(--controls_submit_color);
  background-color: var(--controls_submit_background-color);
}
</style>