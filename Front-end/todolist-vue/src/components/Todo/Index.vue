<template>
  <li>
    <Icon class="click" />
    <p>{{ todo.content }}</p>
    <Icon class="delete" />
  </li>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Icon from "./Icon";

@Component({
  components: {
    Icon
  }
})
export default class Todo extends Vue {
  @Prop() todo!: object;
}
</script>

<style lang="scss">
li {
  border: {
    bottom: 1px solid get($app, color, decoration);
  }
}
</style>
