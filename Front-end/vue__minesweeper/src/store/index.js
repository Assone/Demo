import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import config from './modules/config';

export default new Vuex.Store({
  state: {
    grid: [],
    status: {
      isWin: false,
      gameOver: false,
    },
    count: {
      flag: 0,
      steps: 0,
      time: 0,
    },
  },
  getters: {},
  mutations: {
    setSize({ config }, { type, value }) {
      config[type] = Number(value);
    },
    getGrid(state) {
      const { row, col, bombs } = state.config;

      const temp = [
        ...new Array(row * col - bombs).fill(false),
        ...new Array(bombs).fill(true),
      ].sort(() => 0.5 - Math.random());
      const arr = [];

      for (let i = 0; i < temp.length; i += col) {
        arr.push(temp.slice(i, i + col));
      }

      state.grid = arr;
    },
    changeFlagCount({ count }, num) {
      console.log(count.flag, num, (count.flag += num));
      count.flag += num;
    },
  },
  actions: {
    setSize({ commit }, options) {
      commit('setSize', options);
    },
    changeFlagCount({ commit }, num) {
      commit('changeFlagCount', num);
    },
  },
  modules: {
    config,
  },
});
