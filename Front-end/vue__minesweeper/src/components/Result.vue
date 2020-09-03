<template>
  <p id="container__result">{{ result }}</p>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { State, namespace } from 'vuex-class';

const Config = namespace('config');

@Component
export default class Result extends Vue {
  @Config.State emoji;
  @State('status') status;

  get result() {
    // 如果游戏结束了判断是否获胜并返回对应的emoji
    if (this.status.gameOver) {
      return this.status.isWin ? this.emoji.win : this.emoji.loser;
    }

    // 否则返回默认的
    return this.emoji.nor;
  }
}
</script>

<style lang="scss" scoped>
#container__result {
  border: var(--border);
  border-radius: 2vw;
  margin: 0;
  margin-bottom: 1vw;

  line-height: 3rem;

  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
</style>
