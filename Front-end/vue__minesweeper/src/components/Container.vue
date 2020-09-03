<template>
  <table
    id="container__grid"
    ref="table"
    @click="reveal"
    @contextmenu.prevent="triggerFlag"
  >
    <tr v-for="(item, y) in list" :key="y">
      <td v-for="(isBomb, x) in item" :key="x">
        <button v-DOMAttr="{ info: getInfo(y, x), isBomb }">
          {{ emoji.starter }}
        </button>
      </td>
    </tr>
  </table>
</template>

<script>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { namespace, State, Mutation, Action } from 'vuex-class';

const Config = namespace('config');

@Component({
  directives: {
    DOMAttr(
      el,
      {
        value: {
          info: { bombsCount, neighbours },
          isBomb,
        },
      }
    ) {
      el.isBomb = isBomb;
      el.isReveal = false;
      el.bombsCount = bombsCount;
      el.neighbours = neighbours;
    },
  },
})
export default class Container extends Vue {
  @State status;
  @State('grid') list;
  @Config.State emoji;
  @Mutation('getGrid') start;
  @Action changeFlagCount;
  @Action addSteps;
  @Action endGame;
  @Prop(Number) count;

  filpCount = 0;
  bombList = [];

  @Watch('filpCount')
  isWin(filpCount) {
    if (filpCount === this.count) {
      this.endGame(true);
      this.bombList.forEach(bomb => this.revealFlag(bomb, true));
    }
  }

  triggerFlag({ target }) {
    if (target.tagName.toLowerCase() === 'button' && !this.status.isWin) {
      this.revealFlag(target);
    }
  }

  reveal({ target }) {
    if (target.tagName.toLowerCase() === 'button' && !target.isFlag) {
      const { isBomb } = target;

      if (isBomb) {
        this.flipGridAll();
        this.endGame();
      } else {
        this.flipGrid(target);
      }

      !this.status.gameOver && this.addSteps();
    }
  }

  revealFlag(target, inspect) {
    if (!target.isReveal || target.isFlag) {
      if (target.isFlag && !inspect) {
        target.textContent = this.emoji.starter;
        target.isFlag = false;
        !inspect && this.changeFlagCount(1);
      } else {
        target.textContent = this.emoji.flag;
        target.isFlag = true;
        !inspect && this.changeFlagCount(-1);
      }

      target.isReveal = !target.isReveal;
    }
  }

  flipGrid(target, inspect) {
    const { isBomb, bombsCount, isReveal, neighbours } = target;

    if (inspect || !isReveal) {
      target.isReveal = true;
      this.filpCount++;

      if (isBomb) {
        target.textContent = this.emoji.bomb;
      } else if (bombsCount) {
        target.textContent = this.emoji.numbers[bombsCount - 1];
      } else {
        target.textContent = this.emoji.empty;
        neighbours.forEach(neighbour => {
          this.flipGrid(neighbour);
        });
      }
    }
  }

  flipGridAll() {
    const itemList = this.$refs.table.querySelectorAll('button');
    Array.from(itemList).forEach(item => this.flipGrid(item, true));
  }

  getInfo(y, x) {
    const neighboursList = [
      [y, x - 1],
      [y, x + 1],
      [y - 1, x - 1],
      [y - 1, x],
      [y - 1, x + 1],
      [y + 1, x - 1],
      [y + 1, x],
      [y + 1, x + 1],
    ];

    const list = neighboursList
      .map(([y1, x1]) => {
        if (this.list[y1] && this.list[y1][x1] !== undefined) {
          return this.list[y1][x1] ? this.list[y1][x1] : [y1, x1];
        }
      })
      .filter(position => position !== undefined);

    return {
      bombsCount: list.filter(isBomb => isBomb === true).length,
      neighbours: list.filter(isBomb => isBomb !== true),
    };
  }

  created() {
    this.start();
  }

  mounted() {
    this.$nextTick(() => {
      const table = this.$refs.table;
      const itemList = Array.from(
        table.querySelectorAll('button')
      ).filter(item => (!item.isBomb ? item : this.bombList.push(item)));
      itemList.forEach(item => {
        item.neighbours = item.neighbours.map(([y, x]) => {
          return table.children[y].children[x].firstElementChild;
        });
      });
    });
  }
}
</script>

<style lang="scss" scoped>
#container__grid {
  width: 100%;

  td {
    width: var(--lattice-size);
    height: var(--lattice-size);
    padding: 0;
  }

  button {
    width: 100%;
    height: 100%;
    padding: 0;
    border: 0;

    font-size: 1.3rem;
    line-height: 1em;

    background: transparent;
    cursor: pointer;
  }
}
</style>
