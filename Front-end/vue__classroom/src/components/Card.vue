<template>
  <div class="card">
    <a :href="href">
      <div
        class="card__cover"
        :style="{ backgroundPositionY: `${-offsetYIndex * baseHeight}px` }"
      ></div>
    </a>
    <div class="card__container">
      <div class="card__content">
        <a :href="href">
          <h3 class="card__title">{{ title }}</h3>
        </a>
        <div class="card__info" v-if="author && school">
          <div class="card__info__creater">
            <span><i class="i-author"></i>{{ author }}</span>
            <span><i class="i-school"></i>{{ school }}</span>
          </div>
          <div class="card__info__time" v-if="time">{{ time }}小时</div>
        </div>
      </div>
      <div class="card__description">{{ description }}</div>
      <div class="card__extra">
        <slot></slot>
        <div class="card__star" v-if="star">{{ star }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Card extends Vue {
  @Prop({ type: String, required: true }) href!: string;
  @Prop({ type: String, required: true }) title!: string;
  @Prop({ type: String }) author?: string;
  @Prop({ type: String }) school?: string;
  @Prop({ type: Number }) time?: string;
  @Prop({ type: String }) description!: string;
  @Prop({ type: String }) star?: string;
  @Prop({ type: Number }) offsetYIndex!: number;

  baseHeight = 200;
}
</script>

<style lang="scss" scoped>
.card {
  border-radius: 12px;

  box-shadow: 0 2.7px 5.3px rgba(0, 0, 0, 0.02),
    0 8.9px 17.9px rgba(0, 0, 0, 0.03), 0 40px 80px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 16px 20px 0 rgba(124, 142, 227, 0.24);
    transform: translateY(-6px);
  }

  &__cover {
    display: block;

    width: 100%;
    height: 200px;
    border-radius: 12px 12px 0 0;

    background-image: var(--source-class);
    cursor: pointer;
  }

  &__container {
    overflow: auto;
    padding: 16px 20px;
  }

  &__title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }

  &__info {
    display: flex;
    justify-content: space-between;

    margin-top: 6px;
    margin-bottom: 8px;

    font-size: 12px;

    &__creater {
      display: flex;
      align-items: center;
      flex-grow: 1;

      & * {
        display: inline-block;
        overflow: hidden;

        margin-right: 4px;
        max-width: calc(100% / 2);

        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 16px;
      }

      span {
        margin-right: 8px;
      }
    }

    &__time {
      float: right;

      padding: 2px 8px;
      border: 1px solid #eee;
      border-radius: 12px;
    }
  }

  &__description {
    display: -webkit-box;
    position: relative;
    overflow: hidden;

    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    padding-bottom: 5px;

    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-height: 24px;
    text-overflow: ellipsis;
  }

  &__star {
    float: right;
    padding: 2px 4px;
    border-radius: 2px;
    margin-top: 15px;
    color: #e41f2b;
    background-color: rgba(228, 31, 43, 0.1);
  }
}
</style>
