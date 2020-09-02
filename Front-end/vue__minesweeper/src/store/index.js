import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    row: 10,
    col: 10,
    bombs: 10,
  },
  getters: {},
  mutations: {
    setSize(state, { type, value }) {
      state[type] = Number(value);
    },
  },
  actions: {
    setSize({ commit }, options) {
      commit('setSize', options);
    },
  },
  modules: {},
});
