<template>
  <header>
    <div id="info">
      <Time />
      <div id="switch-view">
        <router-link
          to="/list"
          :class="{ active: state.isIncomplete }"
          @click.native="switchView(true)"
          >Incomplete Tasks</router-link
        >
        <router-link
          to="/history"
          :class="{ active: !state.isIncomplete }"
          @click.native="switchView(false)"
          >Complete Tasks</router-link
        >
      </div>
    </div>
    <TaskCount :count="state.count" />
    <TaskInput />
  </header>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Time from "@/components/Time";
import TaskCount from "@/components/TaskCount";
import TaskInput from "@/components/TaskInput/Index";

@Component({
  components: {
    Time,
    TaskCount,
    TaskInput
  }
})
export default class Controls extends Vue {
  state = this.$store.state;
  commit = this.$store.commit;

  switchView(state: boolean) {
    this.commit("switchView", state);
  }
}
</script>

<style lang="scss" scoped>
header {
  border: {
    bottom: 1px solid get($app, color, decoration);
  }

  #info {
    display: flex;
    justify-content: space-between;

    #switch-view {
      & > * {
        margin-right: calc(#{get($app, width)} / 40);
      }

      & a {
        color: get($app, color, decoration);
        text-decoration: {
          line: none;
        }

        &.active {
          color: get($app, color, active);
        }
      }
    }
  }
}
</style>
