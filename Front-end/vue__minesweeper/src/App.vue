<template>
  <div id="app">
    <button id="app__setting"></button>
    <Menu />
    <div id="app__container">
      <Result />
      <Container :list="list" />
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
  @State('grid') list;
  @Mutation('getGrid') start;

  created() {
    this.start();
  }
}
</script>

<style lang="scss"></style>
