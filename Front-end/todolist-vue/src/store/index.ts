import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    isIncomplete: true,
    list: [
      {
        content: "first the todo list",
        isIncomplete: true
      },
      {
        content: "you can delete this is the message",
        isIncomplete: true
      },
      {
        content: "or change the message the state for completed",
        isIncomplete: true
      }
    ]
  },
  mutations: {
    switchView(state, currentState) {
      state.isIncomplete = currentState;
    }
  },
  actions: {},
  modules: {}
});
