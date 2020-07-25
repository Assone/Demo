import { OBServer } from '../tools/DataProcess';

/**
 * 模型基类
 */
export default class Model {
  /**
   * 实例化参数
   * @param {object} data 传入数据
   */
  constructor(data) {
    this._data = data;

    new OBServer(this, this._data); // 数据劫持
  }
}
