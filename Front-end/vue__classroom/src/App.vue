<template>
  <div id="app">
    <Header :list="list" />
    <Container />
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Container from '@/layout/Container.vue';

@Component({
  components: {
    Header,
    Footer,
    Container,
  },
})
export default class App extends Vue {
  list = [];

  created() {
    this.$api.get<{ nav: [] }>('/app').then(({ nav }) => {
      this.list = nav;
    });
  }
}
</script>

<style lang="scss">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//   }
// }
</style>
