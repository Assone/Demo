export default {
  namespaced: true,
  state: {
    row: 10,
    col: 10,
    bombs: 10,
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
  getters: {
    notBombsGrid({ row, col, bombs }) {
      return row * col - bombs;
    },
  },
};
