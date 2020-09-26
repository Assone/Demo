<template>
  <div class="section" :class="{ section__background: notWhite }">
    <slot name="section"></slot>
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
.section {
  &__background {
    background-color: #fafafa;
  }

  .content {
    padding: {
      bottom: 60px;
    }
  }
}

.section,
.content {
  position: relative;
}
</style>
