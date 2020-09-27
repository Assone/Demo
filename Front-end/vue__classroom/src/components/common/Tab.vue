<template>
  <ul class="x-tab">
    <li
      class="x-tab-item"
      :class="{ isActive: activeIndex === index }"
      v-for="(content, index) in list"
      :key="content"
      @click="handleClick(index)"
    >
      <a>{{ content }}</a>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';

@Component
export default class XTab extends Vue {
  @Prop({ type: Array, required: true }) list!: Array<string>;

  activeIndex = 0;

  @Emit('click')
  handleClick(index: number) {
    this.activeIndex = index;

    return index;
  }
}
</script>

<style lang="scss" scoped>
.x-tab {
  display: flex;

  border-bottom: $tab__border;

  font-weight: 700;

  &-item {
    position: relative;
    cursor: pointer;

    margin-right: 35px;

    line-height: 30px;

    transition: all 0.3s ease-out;

    &::after {
      content: '';
      display: block;
      position: absolute;
      bottom: 0;
      height: 2px;
      width: 0;
      transition: all 0.3s ease-out;
    }
  }

  .isActive {
    &::after {
      width: 100%;
      background-color: $color__active;
    }

    * {
      color: $color__active;
    }
  }
}
</style>
