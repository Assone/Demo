<template>
  <ul id="container__info">
    <info-item label="BOMBS" :data="flagAndBombs" />
    <info-item label="STEPS" :data="count.steps" />
    <info-item
      label="TIME"
      :data="time.toFixed(2)"
      @click.native="triggerTimer"
    />
  </ul>
</template>

<script>
import { Component, Vue, Watch } from 'vue-property-decorator';
import { State, namespace } from 'vuex-class';
import InfoItem from './item.vue';

const Config = namespace('config');

@Component({
  components: {
    InfoItem,
  },
})
export default class Info extends Vue {
  @State status; // 游戏的状态
  @State count; // 游戏的一些计数信息
  @Config.State bombs; // 炸弹的数量

  time = 0;
  timeid = null;

  // 获取当前旗子和炸弹的数量
  get flagAndBombs() {
    const { flag } = this.count;
    return `${flag}/${this.bombs}`;
  }

  // 如果是计时的状态，则time变量也跟着变化在屏幕上显示。暂停时则清空计时器
  @Watch('status', { deep: true })
  startGame({ startTimer }) {
    if (startTimer) {
      this.timeid = setInterval(() => {
        this.time += 0.01;
      }, 10);
    } else {
      clearInterval(this.timeid);
    }
  }

  // count是个对象，所以要深度监听。当步数等于0且计时暂停时，重置时间
  @Watch('count', { deep: true })
  resetTimer({ steps }) {
    if (steps === 0 && !this.status.startTimer) {
      this.time = 0;
    }
  }
}
</script>

<style lang="scss" scoped>
#container__info {
  display: flex;
  padding: 0;
  margin: 0;

  .info-item {
    flex-grow: 1;
  }
}
</style>
