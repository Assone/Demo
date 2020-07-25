import Model from './Model';

/**
 * 餐厅数据模型
 * @extends Model
 */
export default class RestaurantModel extends Model {
  /**
   * 实例化参数
   * @param {object} data 模型数据
   */
  constructor(data) {
    super(data);
  }

  /**
   * 更新模型的方法
   */
  get update() {
    const _this = this;

    return {
      // 更新日期
      date() {
        _this.time.day++;

        // 如果当前天数大于7则重新调整为1，周数加1
        _this.time.day > 7 && ((_this.time.day = 1), _this.time.week++);
      },

      /**
       * 更新餐厅金额
       * @param {number} value 对当前金额相加或相减的数字
       */
      cost(value) {
        if (typeof value !== 'number') throw new Error('Value must a number');

        // 传入的如果是负数则取绝对值再相减，为正数则相加
        String(value).indexOf('-') === -1
          ? (_this.cost += value)
          : (_this.cost -= Math.abs(value));
      },
    };
  }
}
