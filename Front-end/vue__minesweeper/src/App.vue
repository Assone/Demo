<template>
  <div id="app">
    <div
      id="app__setting"
      @click="
        triggerMenu();
        setTimer(false);
      "
      :class="{ active: showMenu }"
    >
      ⚙️
    </div>
    <Menu v-if="showMenu" />
    <div id="app__container">
      <Result
        @click.native="
          resetGame();
          resetInfo();
          setTimer(false);
        "
      />
      <Container
        ref="container"
        :key="id"
        :count="notBombsGridCount"
        @click.native="setTimer(true)"
      />
      <Info />
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { State, Mutation, namespace } from 'vuex-class';

import Menu from '@/components/Menu.vue';
import Result from '@/components/Result.vue';
import Container from '@/components/Container.vue';
import Info from '@/components/Info/index.vue';

const Config = namespace('config');

@Component({
  components: {
    Result,
    Container,
    Info,
    Menu,
  },
})
export default class App extends Vue {
  @State count;
  @State status;
  @Config.Getter('notBombsGrid') notBombsGridCount; // 获取非炸弹的格子数
  @Mutation('getGrid') start; // 获取格子列表
  @Mutation('resetGame') resetInfo; // 重置游戏
  @Mutation('triggerTimer') setTimer; // 设置定时器

  id = 0;
  showMenu = false;

  // 修改菜单的显示状态
  triggerMenu() {
    this.showMenu = !this.showMenu;
  }

  // 重置游戏
  resetGame() {
    this.resetInfo();
    this.start();
    this.id++;
  }
}
</script>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

html,
body {
  height: 100vh;
  font-size: 1em;
}

body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
}

#app {
  --lattice-size: 1.55em;
  --color: #f4f4f4;
  --border: 1px solid var(--color);

  position: relative;
  display: inline-block;

  min-width: 320px;
  padding: 10px;
  border: 10px solid var(--color);
  border-radius: 2vw;
  margin-bottom: 10px;

  text-align: center;
  font-family: AppleColorEmoji, Arial, Helvetica, sans-serif;

  #app__setting {
    position: absolute;
    top: -1em;
    right: -1em;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 2.5em;
    height: 2.5em;
    border: 1vw solid #fff;
    border-radius: 100%;
    outline: none;

    cursor: pointer;

    background: var(--color);

    &.active {
      border: 1vw solid #ffd000;
    }
  }

  #container {
    &__info {
      padding: 1vw;
      border-radius: 2vw;
      margin-top: 1vw;

      background: var(--color);
    }
  }
}
</style>
