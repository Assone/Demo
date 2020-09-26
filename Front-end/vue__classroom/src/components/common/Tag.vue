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

<style lang="scss" scoped></style>
