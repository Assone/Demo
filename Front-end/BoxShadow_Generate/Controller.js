class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  init() {
    this.view = new this.view('#app');
    this.model = new this.model({
      xOffset: 10,
      yOffset: 10,
      blurRadius: 10,
      spreadRadius: 50,
      color: '#fa0000',
      code: 'box-shadow: 10px 10px 10px 50px #fa0000',
      test: {
        a: 1,
        b: {
          c: 1
        }
      }
    });

    this.view.init({
      component: {
        xOffset: '[name=control_x-offset]',
        yOffset: '[name=control_y-offset]',
        blurRadius: '[name=control_blur-radius]',
        spreadRadius: '[name=control_spread-radius]',
        color: '[name=control_color-select]',
        code: '[name=control_code]',
      },
      container: {
        shadowBox: '#previewer-container',
        code: '#previewer-container__code',
        controls: '#controls-container',
      },
      model: this.model,
    });

    this.view.update.code(`
      box-shadow: ${this.model.methods.translateData()}
    `);
    this.view.update.boxShadow(this.model.methods.translateData());
    this.view.update.background(this.model.data.color);
  }
}
