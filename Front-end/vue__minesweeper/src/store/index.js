import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    row: 10,
    col: 10,
    bombs: 10,
    grid: [],
    status: {
      isWin: false,
      gameOver: false,
    },
    emoji: {
      nor: '😀',
      win: '😎',
      loser: '😵',
      empty: '🐣',
      bomb: '💣',
      flag: '🚧',
      starter: '◻️',
      numbers: ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣'],
    },
  },
  getters: {},
  mutations: {
    setSize(state, { type, value }) {
      state[type] = Number(value);
    },
    getGrid(state) {
      const { row, col, bombs } = state;

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
  },
  actions: {
    setSize({ commit }, options) {
      commit('setSize', options);
    },
  },
  modules: {},
});
