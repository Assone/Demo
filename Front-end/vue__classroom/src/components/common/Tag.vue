<template>
  <button class="x-tag">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class XTag extends Vue {}
</script>

<style lang="scss" scoped>
.x-tag {
  cursor: pointer;

  padding: 0 10px;
  border: 0;
  border-radius: 12px;
  outline: 0;

  line-height: 24px;

  &:hover {
    box-shadow: 0px 0px 0px 1px $color__active;
  }
}
</style>
