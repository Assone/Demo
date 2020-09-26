<template>
  <div class="section" :class="{ section__background: notWhite }">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Section extends Vue {
  @Prop({ type: Boolean }) notWhite?: boolean;
}
</script>

<style lang="scss" scoped>
.section__background {
  background-color: #fafafa;
}
</style>
