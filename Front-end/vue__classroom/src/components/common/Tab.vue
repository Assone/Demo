<template>
  <ul class="x-tab">
    <li
      v-for="(content, index) in list"
      :key="content"
      @click="handleClick(index)"
    >
      {{ content }}
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';

@Component
export default class XTab extends Vue {
  @Prop({ type: Array, required: true }) list!: Array<string>;

  @Emit('click')
  handleClick(index: number) {
    return index;
  }
}
</script>

<style lang="scss" scoped></style>
