class View {
  constructor(el, template) {
    this.options = {
      el,
      template,
    };
    this.el = document.querySelector(el);
    this.component = {};
    this.container = {};
  }

  getElement(namespace, key, selector, isAll) {
    this[namespace][key] = isAll
      ? this.el.querySelectorAll(selector)
      : this.el.querySelector(selector);
  }

  getComponent(name, options, isAll) {
    if (options) {
      for (const key in options) {
        if (options.hasOwnProperty(key)) {
          this.getElement(name, key, options[key], isAll);
        }
      }
    }
  }

  init(options) {
    this.model = options.model;

    if (options.component)
      this.getComponent('component', options.component, true);
    if (options.container) this.getComponent('container', options.container);

    this.reactiveDate();
    this.bindEvent();
  }

  reactiveDate() {
    for (const key in this.component) {
      if (this.component.hasOwnProperty(key)) {
        this.component[key].forEach(element => {
          element.dataset.name = key;
          Notice.watch(this.model, key, element);
        });
      }
    }
  }

  bindEvent() {
    const _this = this;

    this.container.controls.addEventListener('input', ({ target }) => {
      const key = target.dataset.name;

      this.model.data[key] = target.value;
      this.model.data[
        'code'
      ] = `box-shadow: ${this.model.methods.translateData()}`;

      this.update.code(`
        box-shadow: ${this.model.methods.translateData()}
      `);
      this.update.boxShadow(this.model.methods.translateData());
      this.update.background(this.model.data.color);
    });

    this.container.code.addEventListener('click', function (evt) {
      const result = _this.component.code[0].value;
      navigator.clipboard.writeText(result);
      this.classList.add('active');
    });

    this.container.code.addEventListener('animationend', function (evt) {
      this.classList.remove('active');
    });
  }

  get update() {
    const _this = this;

    return {
      code(content) {
        _this.container.code.textContent = content;
      },
      boxShadow(value) {
        _this.container.shadowBox.style.boxShadow = value;
      },
      background(value) {
        _this.container.shadowBox.style.background = value;
      },
    };
  }
}
