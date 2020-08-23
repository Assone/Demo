<template>
  <div id="task-input">
    <Input placeholder="Enter a task..." />
    <Button content="Add Task" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Input from "./Input.vue";
import Button from "./Button.vue";

@Component({
  components: {
    Input,
    Button
  }
})
export default class TaskInput extends Vue {}
</script>

<style lang="scss">
#task-input {
  height: get($app-controls, height);
  margin: {
    top: 3%;
    bottom: 5%;
  }
}
</style>
