<template>
  <ul class="bulletin">
    <li
      class="bulletin__item"
      v-for="({ href, title, publisher, time }, index) in list"
      :key="href"
    >
      <a
        :href="href"
        class="bulletin__cover"
        :style="{ backgroundPositionY: `${-index * baseHeight}px` }"
      ></a>
      <div class="bulletin__container">
        <a :href="href">
          <h3>{{ title }}</h3>
        </a>
        <p>{{ publisher }} | {{ time }}</p>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Bulletin extends Vue {
  @Prop({ type: Array }) list!: object[];

  baseHeight = 96;
}
</script>

<style lang="scss" scoped>
.bulletin {
  &__item {
    display: flex;
    padding-bottom: 30px;
    border-bottom: 1px solid #e3e5e9;
    margin-bottom: 30px;

    &:last-child {
      margin-bottom: 100px;
    }
  }

  &__cover {
    display: block;
    width: 160px;
    height: 96px;
    margin-right: 30px;
    background-image: $cover__notice;
  }

  &__container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}
</style>
