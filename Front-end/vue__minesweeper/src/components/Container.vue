<template>
  <table id="app__container" ref="table">
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
import { Component, Vue, Prop } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

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
      el.bombsCount = bombsCount;
      el.neighbours = neighbours;
    },
  },
})
export default class Container extends Vue {
  @Config.State emoji;
  @Prop() list;

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
