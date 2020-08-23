<template>
  <div id="app">
    <Controls />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Controls from "@/container/Controls.vue";

@Component({
  components: {
    Controls
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

body,
ul {
  padding: 0;
  margin: 0;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;

  font-family: Helvetica, sans-serif;
}

ul {
  list-style-type: none;
}

button {
  cursor: pointer;
}

.active {
  color: var(--switch-view_button_color-active) !important;
}

#app {
  --color_decoration: #bdbdbd;
  --color_active: #f6f6f6;

  --app_width: 800px;
  --app_height: 550px;
  --app_border-radius: 5px;
  --app_background-color: #3c3c4c;

  --switch-view_button_color: var(--color_decoration);
  --switch-view_button_color-active: var(--color_active);

  --tasks-count_color: #54bfdc;

  --controls_input-box_width: calc(var(--app_width) * 0.4);
  --controls_submit_padding: 0 10px;
  --controls_submit_color: #fff;
  --controls_submit_background-color: #62d9f9;
  --controls_component_height: 30px;

  --logo_check: url(./assets/icon-tick.svg);
  --logo_delete: url(./assets/icon-delete.svg);
}

#app {
  max-width: var(--app_width);
  width: 100%;
  height: var(--app_height);
  padding: 3%;
  border-radius: var(--app_border-radius);

  color: var(--color_decoration);
  background-color: var(--app_background-color);
}
</style>
