<template>
  <button>{{ content }}</button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Button extends Vue {
  @Prop() private content: string;
}
</script>

<style lang="scss" scoped>
button {
  height: 100%;
  padding: get($app-controls, task-submit, padding);
  border: 0;
  border-radius: calc(#{get($app, border, radius)} - 2px);

  color: get($app-controls, task-submit, color);
  background: {
    color: get($app-controls, task-submit, background-color);
  }
}
</style>
