<template>
  <input type="text" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Input extends Vue {}
</script>

<style lang="scss">
input {
  width: get($app-controls, task-input, width);
  height: 100%;
  padding: 10px;
  border: 0;
  border-radius: calc(#{get($app, border, radius)} - 2px);
  margin: {
    right: 5px;
  }

  &::placeholder {
    color: get($app, color, decoration);
  }
}
</style>
