<template>
  <div class="box">
    <div class="box__info">
      <h2 class="box__title">{{ title }}</h2>
      <p class="box__description" v-if="description">{{ description }}</p>
    </div>
    <div class="box__content">
      <slot></slot>
    </div>
    <slot name="extra"></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Box extends Vue {
  @Prop({ type: String }) title!: string;
  @Prop({ type: String }) description?: string;
}
</script>

<style lang="scss" scoped>
.box {
  &__info {
    margin-top: 60px;
    margin-bottom: 40px;
    text-align: center;
  }

  &__title {
    margin-bottom: 16px;
  }
}
</style>
