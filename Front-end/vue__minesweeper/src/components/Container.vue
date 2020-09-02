<template>
  <table
    id="app__container"
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
import { Component, Vue, Watch } from 'vue-property-decorator';
import { namespace, State, Action, Mutation } from 'vuex-class';

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
  @Config.State emoji;
  @State status;
  @State grid;
  @Mutation('getGrid') start;
  @Action changeFlagCount;
  // @Prop() list;

  list = [];

  @Watch('grid')
  test(value) {
    this.list.splice(0, ...value);
  }

  triggerFlag({ target }) {
    if (!this.status.isWin) {
      if (!target.isReveal || target.isFlag) {
        if (target.isFlag) {
          target.textContent = this.emoji.starter;
          target.isFlag = false;
          this.changeFlagCount(1);
        } else {
          target.textContent = this.emoji.flag;
          target.isFlag = true;
          this.changeFlagCount(-1);
        }

        target.isReveal = !target.isReveal;
      }
    }
  }

  reveal({ target }) {
    if (target.tagName.toLowerCase() === 'button') {
      const { isBomb } = target;

      if (isBomb) {
        this.flipGridAll();
      } else {
        this.flipGrid(target);
      }
    }
  }

  flipGrid(target, inspect) {
    const { isBomb, bombsCount, isReveal, neighbours } = target;

    if (inspect || !isReveal) {
      target.isReveal = true;
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
      const itemList = Array.from(table.querySelectorAll('button')).filter(
        item => !item.isBomb
      );
      itemList.forEach(item => {
        item.neighbours = item.neighbours.map(([y, x]) => {
          return table.children[y].children[x].firstElementChild;
        });
      });
    });
  }
}
</script>

<style></style>
