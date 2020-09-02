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
        v-model="bomb"
      />
    </div>
    <select name="emoji" id="menu__emoji">
      <option value="🐣 💣 🚧 ◻️">🐣 💣 🚧 ◻️</option>
    </select>
    <button @click="startGame">start game</button>
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
  @Action('setSize') adjustSize;

  get row() {
    return this.staterow;
  }

  set row(value) {
    this.adjustSize({
      type: 'row',
      value,
    });
  }

  get col() {
    return this.statecol;
  }

  set col(value) {
    this.adjustSize({
      type: 'col',
      value,
    });
  }

  get bomb() {
    return this.stateBombs;
  }

  set bomb(value) {
    this.adjustSize({
      type: 'bombs',
      value,
    });
  }

  get bombsMax() {
    return this.staterow * this.statecol - 1;
  }

  startGame() {
    if (this.stateBombs < this.bombsMax) {
      console.log('start game');
    }
  }
}
</script>

<style></style>
