<template>
  <main>
    <Todo v-for="todo of list" :key="todo" :todo="todo" />
  </main>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Todo from "@/components/Todo/Index";

@Component({
  components: {
    Todo
  }
})
export default class List extends Vue {
  list = this.$store.state.list;
  a = this.$route.params.view;
}
</script>

<style></style>
