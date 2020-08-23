<template>
  <time>{{ time }}</time>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Time extends Vue {
  data = new Date();

  get time() {
    return this.data.toLocaleString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric"
    });
  }
}
</script>

<style></style>
