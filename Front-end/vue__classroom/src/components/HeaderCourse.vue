<template>
  <div
    class="course-header"
    :style="{ backgroundPositionY: `${-offsetY * baseHeight}px` }"
  >
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class HeaderCourse extends Vue {
  @Prop({ type: String, required: true }) title!: string;
  @Prop({ type: String, required: true }) description!: string;
  @Prop({ type: Number, default: 0 }) offsetY?: number;

  baseHeight = 180;
}
</script>

<style lang="scss" scoped>
.course-header {
  background-image: $cover__course-header;
}
</style>
