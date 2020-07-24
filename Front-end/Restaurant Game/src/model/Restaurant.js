import Model from "./Model";

export default class RestaurantModel extends Model {
  constructor(data) {
    super(data);
  }

  get update() {
    let _this = this;

    return {
      date() {
        _this.time.day++;
        _this.time.day > 7 && ((_this.time.day = 1), _this.time.week++); // 如果当前天数大于7则重新调整为1，周数加1
      },
      /**
       * 更新餐厅金额
       * @param {number} value 要对当前金额相加或相减的数字
       */
      cost(value) {
        if (typeof value !== "number") throw new Error("Value must a number");

        // 传入的如果是负数则取绝对值再相减，为正数则相加
        String(value).indexOf("-") === -1
          ? (_this.cost += value)
          : (_this.cost -= Math.abs(value));
      },
    };
  }
}
