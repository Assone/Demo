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

  /** 模型上的一些方法 */
  get methods() {
    const _this = this;

    return {
      addCook() {
        const id = _this.config.cook.id++;

        _this.staff.push({
          id,
          workDays: 1,
          wage: _this.config.cook.wage,
        });
      },
      removeCook(cookId) {
        const index = _this.staff.findIndex(({ id }) => id === cookId);
        return _this.staff.splice(index, 1)[0];
      },
      addOneDay() {
        _this.time.day++;
      },
      addOneWeek() {
        _this.time.week++;
        return this;
      },
      resetDay() {
        _this.time.day = 1;
        return this;
      },
      getDays() {
        return _this.time.day;
      },
      increaseCost(value) {
        _this.cost += value;
      },
      decreaseCost(value) {
        _this.cost -= value;
      },
      sumWages() {
        return _this.staff
            .map(({ workDays, wage }) => Math.floor((workDays / 7) * wage))
            .reduce((acc, cur) => acc + cur);
      },
    };
  }

  /** 新模型的方法 */
  get update() {
    const _this = this;

    return {
      // 更新日期
      date() {
        _this.methods.addOneDay();

        // 如果当前天数大于7则重新调整为1，周数加1
        if (_this.methods.getDays() > 7) _this.methods.resetDay().addOneWeek();
      },

      /**
       * 更新餐厅金额
       * @param {number} value 对当前金额相加或相减的数字
       */
      cost(value) {
        if (arguments.length === 0) {
          const cost = _this.methods.sumWages();

          _this.methods.decreaseCost(cost);
        } else {
          if (typeof value !== 'number') throw new Error('Value must a number');

          // 传入的如果是负数则取绝对值再相减，为正数则相加
          String(value).indexOf('-') === -1
            ? _this.methods.increaseCost(value)
            : _this.methods.decreaseCost(Math.abs(value));
        }
      },
    };
  }
}
