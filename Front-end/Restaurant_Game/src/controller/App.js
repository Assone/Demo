import Controller from './Controller';

import InfoController from './Info';
import InfoView from '../view/Info';
import NoticeController from './Notice';
import NoticeView from '../view/Notice';
import { CONFIG_INFO, CONFIG_NOTICE } from '../config';

/**
 * App控制器
 * @extends Controller
 */
export default class AppController extends Controller {
  /** @inheritdoc */
  constructor(view, model) {
    super(view, model);
  }

  /** @inheritdoc */
  init() {
    new InfoController(InfoView, this.model).init(CONFIG_INFO);
    new NoticeController(NoticeView, this.model).init(CONFIG_NOTICE);
  }
}
