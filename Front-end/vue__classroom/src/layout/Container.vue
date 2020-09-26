<template>
  <div class="container">
    <router-view></router-view>
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
