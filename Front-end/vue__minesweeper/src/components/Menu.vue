<template>
  <div id="app__menu">
    <div id="menu__size">
      <input type="number" name="row" id="row" v-model="row" />
      <span>x</span>
      <input type="number" name="col" id="col" v-model="col" />
    </div>
    <div id="menu__bombs">
      <i>💣</i>
      <input
        type="number"
        name="bombs"
        id="bombs"
        :max="bombsMax"
        v-model="bombs"
      />
    </div>
    <select name="emoji" id="menu__emoji">
      <option value="🐣 💣 🚧 ◻️">🐣 💣 🚧 ◻️</option>
    </select>
    <button @click="settingGame">start game</button>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { Action, namespace } from 'vuex-class';

const Config = namespace('config');

@Component
export default class Menu extends Vue {
  @Config.State('row') staterow;
  @Config.State('col') statecol;
  @Config.State('bombs') stateBombs;
  @Action('settingGame') setting;

  row = null;
  col = null;
  bombs = null;

  get bombsMax() {
    return this.row * this.col - 1;
  }

  settingGame() {
    if (this.stateBombs < this.bombsMax) {
      this.setting({
        col: {
          type: 'col',
          value: this.col,
        },
        row: {
          type: 'row',
          value: this.row,
        },
        bombs: {
          type: 'bombs',
          value: this.bombs,
        },
      });

      this.$parent.resetGame();
    }
  }

  created() {
    this.row = this.staterow;
    this.col = this.statecol;
    this.bombs = this.stateBombs;
  }
}
</script>

<style></style>
