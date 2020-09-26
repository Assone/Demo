<template>
  <button :class="setClass">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class XButton extends Vue {
  @Prop({ type: String }) type?: string;

  get setClass() {
    const className: string[] = ['x-button'];

    switch (this.type) {
      case 'more':
        className.push('x-button--more');
        break;
      case 'primary':
        className.push('x-button--primary');
        break;
    }

    return className;
  }
}
</script>

<style lang="scss" scoped>
.x-button {
  display: block;
  padding: 6px 20px;
  border: 1px solid #e3e5e9;
  border-radius: 20px;
  font-size: 14px;
  background-color: #f9f9f9;
  cursor: pointer;

  &:hover {
    border-color: $color__active;
  }

  &--primary {
    flex-shrink: 0;
    margin-left: 40px;
    color: #fff;
    background-color: #5e7ce0;
    transition: all 0.5s;

    &:hover {
      background-color: #526ecc;
    }
  }

  &--more {
    margin: auto;
    margin-top: 30px;
    font-size: 16px;
  }
}
</style>
