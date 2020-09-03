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
      // 设置格子的相关信息
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

  // 判断是否赢了
  @Watch('filpCount')
  isWin(filpCount) {
    // 当当前翻开的格子数与出去炸弹的总格子数相同时游戏结束，并将所有炸弹替换成旗子
    if (filpCount === this.count) {
      this.endGame(true);
      this.bombList.forEach(bomb => this.revealFlag(bomb, true));
    }
  }

  // 设置旗子
  triggerFlag({ target }) {
    if (target.tagName.toLowerCase() === 'button' && !this.status.isWin) {
      this.revealFlag(target);
    }
  }

  // 揭开格子
  reveal({ target }) {
    // 如果是旗子的话不能揭开
    if (target.tagName.toLowerCase() === 'button' && !target.isFlag) {
      const { isBomb } = target;

      if (isBomb) {
        this.flipGridAll();
        this.endGame();
      } else {
        this.flipGrid(target);
      }

      // 游戏还没有结束的话步数加一·
      this.status.gameOver || this.addSteps();
    }
  }

  // 揭开旗子
  revealFlag(target, inspect) {
    // 当格子没翻开过或格子是旗子的时候
    if (!target.isReveal || target.isFlag) {
      // 如果是旗子且不检查的时候，旗子变成初始的格子，否则变成旗子。
      if (target.isFlag && !inspect) {
        target.textContent = this.emoji.starter;
        target.isFlag = false;
        !inspect && this.changeFlagCount(1);
      } else {
        target.textContent = this.emoji.flag;
        target.isFlag = true;
        !inspect && this.changeFlagCount(-1);
      }

      // 改变格子的翻转状态
      target.isReveal = !target.isReveal;
    }
  }

  // 翻转格子
  flipGrid(target, inspect) {
    const { isBomb, bombsCount, isReveal, neighbours } = target;

    // 当检查或未翻转的时候
    if (inspect || !isReveal) {
      target.isReveal = true; // 改变为已翻转的状态
      this.filpCount++; // 已翻转的格子+1

      if (isBomb) {
        // 是炸弹的时候
        target.textContent = this.emoji.bomb;
      } else if (bombsCount) {
        // 如果是周围有炸弹的格子
        target.textContent = this.emoji.numbers[bombsCount - 1];
      } else {
        // 周围没炸弹的时候
        target.textContent = this.emoji.empty;
        // 开始递归，将隔壁的格子也翻开
        neighbours.forEach(neighbour => {
          this.flipGrid(neighbour);
        });
      }
    }
  }

  // 翻开所有格子
  flipGridAll() {
    const itemList = this.$refs.table.querySelectorAll('button');
    Array.from(itemList).forEach(item => this.flipGrid(item, true));
  }

  // 获取当前格子周围的信息
  getInfo(y, x) {
    // 当前格子的上下左右八个格子的坐标
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
          // 如果坐标表在格子数据列表中存在
          return this.list[y1][x1] ? this.list[y1][x1] : [y1, x1]; //如果是炸弹则返回true，否则则返回坐标
        }
      })
      .filter(position => position !== undefined); // 过滤掉位置不存在的数据

    return {
      bombsCount: list.filter(isBomb => isBomb === true).length, // 周围炸弹的数量
      neighbours: list.filter(isBomb => isBomb !== true), // 周围的格子的坐标
    };
  }

  created() {
    this.start(); // 获取所有格子
  }

  mounted() {
    this.$nextTick(() => {
      const table = this.$refs.table;
      // 获取所有不是炸弹的格子
      const itemList = Array.from(
        table.querySelectorAll('button')
      ).filter(item => (!item.isBomb ? item : this.bombList.push(item)));
      // 将所有格子的周围格子的坐标信息转换成DOM节点
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
