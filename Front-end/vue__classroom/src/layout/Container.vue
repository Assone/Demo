<template>
  <div class="container">
    <keep-alive :exclude="['Error', 'Course']">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Container extends Vue {}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 60px;
}
</style>
