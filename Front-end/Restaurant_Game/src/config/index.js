const DEFAULT_DATA = {
  time: {
    week: 1,
    day: 1,
  },
  config: {
    cook: {
      id: 0,
      wage: 140,
    },
  },
  staff: [],
  cost: 200,
};

const CONFIG_VIEW = {
  info: {
    el: '#restaurant-info',
    reactiveHash: {
      week: 'time.week',
      day: 'time.day',
      cost: 'cost',
    },
  },
  staff: {
    el: '#restaurant-staff',
  },
  notice: {
    el: '#notice',
  },
};

export { DEFAULT_DATA, CONFIG_VIEW };
