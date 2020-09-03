<template>
  <li class="info-item">
    <div class="info__data">{{ data }}</div>
    <div class="info__description">{{ label }}</div>
  </li>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class InfoItem extends Vue {
  @Prop([String, Number]) data;
  @Prop(String) label;
}
</script>

<style lang="scss" scoped>
.info__ {
  &data {
    font-size: 0.8em;
    font-family: none;
  }

  &description {
    color: #bbb;
  }
}
</style>
