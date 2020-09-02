<template>
  <p id="app__result">{{ result }}</p>
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
    if (this.status.gameOver) {
      return this.status.isWin ? this.emoji.win : this.emoji.loser;
    }

    return this.emoji.nor;
  }
}
</script>

<style></style>
