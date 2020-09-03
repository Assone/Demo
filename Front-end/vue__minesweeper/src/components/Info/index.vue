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
  @State status;
  @State count;
  @Config.State bombs;

  time = 0;
  timeid = null;

  get flagAndBombs() {
    const { flag } = this.count;
    return `${flag}/${this.bombs}`;
  }

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
