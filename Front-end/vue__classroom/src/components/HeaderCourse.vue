<template>
  <div
    class="course-header"
    :class="{ white: color }"
    :style="{ backgroundPositionY: `${offsetY * baseHeight}px` }"
  >
    <div class="content">
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class HeaderCourse extends Vue {
  @Prop({ type: String, required: true }) title!: string;
  @Prop({ type: String, required: true }) description!: string;
  @Prop({ type: Number, default: 0 }) offsetY?: number;
  @Prop({ type: Boolean }) color?: boolean;

  baseHeight = 180;
}
</script>

<style lang="scss" scoped>
.course-header {
  display: flex;

  height: 180px;

  background-image: $cover__course-header;

  h1 {
    font-size: 30px;
    margin-bottom: 20px;
  }
}
.white {
  color: #fff;
}
</style>
