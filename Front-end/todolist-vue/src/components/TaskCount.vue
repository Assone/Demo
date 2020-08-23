<template>
  <div id="task-count">{{ count }} Active Tasks</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class TaskCount extends Vue {
  @Prop() private count!: number;
}
</script>

<style lang="scss">
#task-count {
  font-size: 12px;
  color: get($app-controls, task-count, color);
}
</style>
