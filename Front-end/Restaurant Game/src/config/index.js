const DEFAULT_DATA = {
  time: {
    week: 1,
    day: 1,
  },
  staff: [],
  cost: 200,
};

const CONFIG_INFO = {
  el: "#restaurant-info",
  reactiveHash: {
    week: "time.week",
    day: "time.day",
    cost: "cost",
  },
};

const CONFIG_NOTICE = {
  el: "#notice",
};

export { DEFAULT_DATA, CONFIG_INFO, CONFIG_NOTICE };
