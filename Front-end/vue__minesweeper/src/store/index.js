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
      startTimer: false,
    },
    count: {
      flag: 10,
      steps: 0,
    },
    selectIndex: 0,
  },
  mutations: {
    setSize({ config, count }, { type, value }) {
      config[type] = Number(value);
      type === 'bombs' && (count.flag = Number(value));
    },
    changeSelectIndex(state, num) {
      state.selectIndex = Number(num);
    },
    changeFlagCount({ count }, num) {
      count.flag += num;
    },
    addSteps({ count }) {
      count.steps++;
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
    triggerTimer({ status }, state) {
      !status.gameOver && (status.startTimer = state);
    },
    resetGame({ status, count, config }) {
      status.isWin = false;
      status.gameOver = false;
      status.startTimer = false;
      count.flag = config.bombs;
      count.steps = 0;
    },
    endGame({ status }, isWin) {
      status.isWin = isWin;
      status.gameOver = true;
      status.startTimer = false;
    },
    settingEmoji({ config }, emoji) {
      config.emoji = emoji;
    },
  },
  actions: {
    setSize({ commit }, options) {
      commit('setSize', options);
    },
    changeSelectIndex({ commit }, num) {
      commit('changeSelectIndex', num);
    },
    changeFlagCount({ commit }, num) {
      commit('changeFlagCount', num);
    },
    addSteps({ commit }) {
      commit('addSteps');
    },
    settingGame({ dispatch, commit }, options) {
      dispatch('setSize', options.row);
      dispatch('setSize', options.col);
      dispatch('setSize', options.bombs);
      commit('settingEmoji', options.emoji);
    },
    endGame({ commit }, isWin) {
      commit('triggerTimer', false);
      commit('endGame', isWin);
    },
  },
  modules: {
    config,
  },
});
