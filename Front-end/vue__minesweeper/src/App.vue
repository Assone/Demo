<template>
  <div id="app">
    <button id="app__setting" @click="triggerMenu"></button>
    <Menu v-if="showMenu" />
    <div id="app__container">
      {{ count.steps }}{{ count.flag }}
      <Result @click.native="resetGame" />
      <Container ref="container" :key="id" />
      <!-- <Info /> -->
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';

import Result from '@/components/Result.vue';
import Container from '@/components/Container.vue';
// import Info from '@/components/Info/index.vue';
import Menu from '@/components/Menu.vue';

@Component({
  components: {
    Result,
    Container,
    // Info,
    Menu,
  },
})
export default class App extends Vue {
  @State count;
  @Mutation('getGrid') start;

  id = 0;
  showMenu = false;

  triggerMenu() {
    this.showMenu = !this.showMenu;
  }

  resetGame() {
    this.start();
    this.id++;
  }
}
</script>

<style lang="scss"></style>
