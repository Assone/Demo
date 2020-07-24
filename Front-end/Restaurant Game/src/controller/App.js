import Controller from "./Controller";

import InfoController from "./Info";
import InfoView from "../view/Info";
import NoticeController from "./Notice";
import NoticeView from "../view/Notice";
import { CONFIG_INFO, CONFIG_NOTICE } from "../config";

export default class AppController extends Controller {
  constructor(view, model) {
    super(view, model);
  }

  init() {
    new InfoController(InfoView, this.model).init(CONFIG_INFO);

    new NoticeController(NoticeView, this.model).init(CONFIG_NOTICE);
  }
}
