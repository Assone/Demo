import {OBServer} from '../tools/DataProcess';

export default class Model {
  constructor(data) {
    this._data = data;

    new OBServer(this, this._data); // 数据劫持
  }
}