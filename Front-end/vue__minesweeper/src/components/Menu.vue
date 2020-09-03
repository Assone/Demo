<template>
  <div id="app__menu">
    <div id="menu__size" class="menu-item">
      <input type="number" name="row" id="row" v-model="row" />
      <span>x</span>
      <input type="number" name="col" id="col" v-model="col" />
    </div>
    <div id="menu__bombs" class="menu-item">
      <i>{{ emoji.bomb }}</i>
      <input
        type="number"
        name="bombs"
        id="bombs"
        :max="bombsMax"
        :class="{ error }"
        v-model="bombs"
      />
    </div>
    <select name="emoji" id="menu__emoji" class="menu-item" @change="modOption">
      <option value='["🐣","💣","🚧","◻️"]'>🐣 💣 🚧 ◻️</option>
      <option value='["⭕️","❌","⁉️","❓"]'>⭕️ ❌ ❗️ ✖️️</option>
      <option value='["☀","⚡","☔","☁️"]'>☀ ⚡ ☔ ☁️</option>
      <option value="Customize">Customize</option>
    </select>
    <ul id="menu__emoji" v-if="showMOD">
      <li>
        <label>empty:<input type="text" v-model="emoji.empty"/></label>
      </li>
      <li>
        <label>bomb:<input type="text" v-model="emoji.bomb"/></label>
      </li>
      <li>
        <label>flag:<input type="text" v-model="emoji.flag"/></label>
      </li>
      <li>
        <label>starter:<input type="text" v-model="emoji.starter"/></label>
      </li>
      <li>
        <label>nor:<input type="text" v-model="emoji.nor"/></label>
      </li>
      <li>
        <label>win:<input type="text" v-model="emoji.win"/></label>
      </li>
      <li>
        <label>loser:<input type="text" v-model="emoji.loser"/></label>
      </li>
    </ul>
    <button @click="settingGame" class="menu-item">start game</button>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { State, Action, namespace } from 'vuex-class';

const Config = namespace('config');

@Component
export default class Menu extends Vue {
  @State('selectIndex') index;
  @Config.State('row') staterow;
  @Config.State('col') statecol;
  @Config.State('bombs') stateBombs;
  @Config.State('emoji') stateEmoji;
  @Action('settingGame') setting;
  @Action('changeSelectIndex') changeIndex;

  row = null;
  col = null;
  bombs = null;
  emoji = {
    empty: '',
    bomb: '',
    flag: '',
    starter: '',
    nor: '',
    win: '',
    loser: '',
  };
  showMOD = false;

  get bombsMax() {
    return this.row * this.col - 1;
  }

  get error() {
    return this.bombs > this.bombsMax;
  }

  modOption({ target: { value, selectedIndex } }) {
    if (value === 'Customize') {
      this.showMOD = true;
    } else {
      [
        this.emoji.empty,
        this.emoji.bomb,
        this.emoji.flag,
        this.emoji.starter,
      ] = JSON.parse(value);

      this.showMOD = false;
    }

    this.changeIndex(selectedIndex);
  }

  settingGame() {
    if (this.bombs < this.bombsMax) {
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
        emoji: this.emoji,
      });

      this.$parent.showMenu = false;
      this.$parent.resetGame();
    }
  }

  created() {
    this.row = this.staterow;
    this.col = this.statecol;
    this.bombs = this.stateBombs;
    this.emoji = { ...this.stateEmoji };

    this.$nextTick(() => {
      const [options] = Array.from(this.$el.querySelectorAll('option')).filter(
        option => option.index === this.index
      );
      options && (options.selected = true);
    });
  }
}
</script>

<style lang="scss" scoped>
#app__menu {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding: 10px;

  background: #fff;

  input,
  select,
  button {
    border: 1px solid var(--color);
  }

  .menu-item {
    height: 2rem;
    width: 100%;
    margin: {
      top: 10px;
      bottom: 10px;
    }
  }

  #menu {
    &__size {
      display: flex;
      align-items: center;

      span {
        flex-basis: 10vw;
      }

      input {
        flex-grow: 1;

        width: 8em;
        height: 100%;
      }
    }

    &__bombs {
      position: relative;

      i {
        position: absolute;
        left: 10px;
        width: auto;

        font-style: normal;

        &::before {
          content: '';
          display: block;
          position: absolute;
          top: 0.35em;
          right: -10px;

          width: 0;
          height: 80%;
          border-right: 1px solid var(--color);
        }
      }

      input {
        width: 100%;
        height: 100%;
        padding-left: 45px;

        &.error {
          outline-color: red;
          border-color: red;
        }
      }
    }

    &__emoji {
      width: 100%;
      text-align: end;

      input {
        height: 1.5rem;
        width: 80%;
      }
    }
  }
}
</style>
