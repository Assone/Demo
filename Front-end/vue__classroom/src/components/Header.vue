<template>
  <header>
    <router-link to="/">
      <div id="logo"></div>
    </router-link>
    <nav>
      <ul id="nav">
        <li v-for="{ path, name, href } in list" :key="name">
          <router-link v-if="path" :to="path">{{ name }}</router-link>
          <a :href="href" v-else>{{ name }}</a>
        </li>
      </ul>
    </nav>
    <div class="site-options">
      <x-button>教学平台</x-button>
      <div class="site-options__join">
        <router-link to="login">登陆</router-link>
        |
        <router-link to="register">注册</router-link>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import XButton from '@/components/common/Button.vue';

@Component({
  components: {
    XButton,
  },
})
export default class Header extends Vue {
  @Prop({ type: Array }) list!: object[];
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 10;

  width: 100vw;
  height: 60px;
  padding: 10px 40px;
  border: 1px solid #eee;

  background-color: #fff;

  #logo {
    width: 120px;
    height: 40px;
    margin-right: 40px;
    background: $logo__side 0 / 100%;
  }

  nav {
    flex-grow: 1;
  }

  #nav {
    & li {
      display: inline-block;
      margin-right: 40px;

      & .router-link-exact-active {
        color: $color__active;
      }
    }
  }

  .site-options {
    display: flex;
    align-items: center;

    .x-button {
      margin-right: 40px;
    }
  }
}
</style>
