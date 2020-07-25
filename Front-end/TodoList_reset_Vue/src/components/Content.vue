<template>
  <div id="container">
    <ul id="content">
      <li v-for="task in list" :key="task.timestamp" :data-timestamp="task.timestamp">
        <a
          href="#"
          data-dir="tick"
          @click="operationTask"
          class="content-click"
          :class="{active: !isIncomplete}"
        ></a>
        <p class="content">{{task.content}}</p>
        <a href="#" data-dir="delete" @click="operationTask" class="content-delete"></a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Content",
  props: {
    list: Array,
    isIncomplete: Boolean
  },
  methods: {
    operationTask(evt) {
      const timestamp = evt.target.parentElement.dataset.timestamp;
      if (evt.target.dataset.dir === "tick") {
        this.$emit("switchTask", timestamp);
      } else {
        this.$emit("deleteTask", timestamp);
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
#container {
  overflow: auto;
  height: 75%;
}

#content li {
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--color_decoration);
}

.content {
  flex-grow: 1;
  line-height: 20px;
  color: var(--color_active);
}

.content-click, .content-delete {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: var(--color_decoration);
}

.content-click {
  margin-right: 20px;
  -webkit-mask: var(--logo_check) 0 / 100%;
  mask: var(--logo_check) 0 / 100%;
}

.content-click.active {
  background-color: #00FF00;
}

.content-delete {
  -webkit-mask: var(--logo_delete) 0 / 100%;
  mask: var(--logo_delete);
}
</style>