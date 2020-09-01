const _ = {
  createElement() {
    if (
      arguments.length === 2 &&
      typeof arguments[0] === 'string' &&
      typeof arguments[1] === 'number'
    ) {
      const arr = [];

      for (let i = 0; i < arguments[1]; i++) {
        arr.push(document.createElement(arguments[0]));
      }

      return arr;
    } else {
      return [...arguments].map(name => document.createElement(name));
    }
  },
  insertNode(...list) {
    function appendChild(item) {
      const [target, ...insertItem] = item;
      insertItem.forEach(node => target.appendChild(node));
      return target;
    }

    return arguments[0] instanceof Array
      ? list.map(item => this.isArray(item) && appendChild(item))
      : appendChild(arguments);
  },
  setID(...list) {
    for (const item of list) {
      this.isArray(item);

      if (item.length === 2) {
        const [node, id] = item;
        node.id = id;
      } else {
        throw new Error('There should be only two parameters');
      }
    }

    return list;
  },
  textContent() {
    if (arguments[0] instanceof Array) {
      for (const [node, content] of arguments) {
        node.textContent = content;
      }
    } else {
      if (arguments.length !== 2)
        throw new Error('There must be two parameters');
      return (arguments[0].textContent = arguments[1]);
    }
  },
  createArray(count, value) {
    const arr = [];
    arr.length = count;
    return arr.fill(value);
  },
  shuffle(arr) {
    return arr.sort(() => 0.5 - Math.random());
  },
  arrayUpDimension(arr, limit) {
    const temp = [];

    for (let i = 0; i < arr.length; i += limit) {
      temp.push(arr.slice(i, i + limit));
    }

    return temp;
  },
  isArray(target) {
    if (!Array.isArray(target)) {
      throw new Error('argument must is a array');
    } else {
      return true;
    }
  },
  addClass() {
    if (arguments[0] instanceof Array) {
      for (const item of arguments) {
        const [node, ...className] = item;
        node.classList.add(...className);
      }
    } else {
      const [node, ...className] = arguments;
      node.classList.add(...className);
    }
  },
};

class Info {
  constructor(value, description) {
    this.description = description;
    this.value = value;
  }

  render() {
    const [container, data, description] = _.createElement('li', 'div', 'div');
    data.id = `data__${this.description.toLocaleLowerCase()}`;
    _.addClass([data, 'data'], [description, 'description']);
    _.textContent([data, this.value], [description, this.description]);
    _.insertNode(container, data, description);

    this._component = data;

    return container;
  }

  update(value) {
    this._component.textContent = value;
  }
}

class Game {
  constructor(options) {
    this._el = document.querySelector(options.el || '#app');
    this._options = options;
    this.size = options.size || [10, 10];
    this.emoji = {
      empty: options.emoji.empty || '🐣',
      bomb: options.emoji.bomb || '💣',
      flag: options.emoji.flag || '🚧',
      starter: options.emoji.starter || '◻️',
      nor: options.emoji.nor || '😀',
      win: options.emoji.win || '😎',
      loser: options.emoji.lose || '😵',
      numbers: ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣'],
    };
    this.count = {
      steps: 0,
      flag: options.bombs || 10,
      bombs: options.bombs || 10,
      time: 0,
      grid: 0,
      allGrid: this.size[0] * this.size[1] - options.bombs,
    };
    this.isWin = null;

    this.init();
  }

  init() {
    this.createApp();
    this.createContainer();
    this.bindEvent();
  }

  reset() {
    new Game(this._options);
  }

  createApp() {
    if (this._el === null) {
      this._el = document.createElement('div');
      this._el.id = 'app';

      document.body.app(this._el);
    }

    this._el.innerHTML = '';

    const [result, container, info] = _.createElement('p', 'table', 'ul');
    _.setID(
      [result, 'app__result'],
      [container, 'app__container'],
      [info, 'app__info']
    );

    _.textContent(result, this.emoji.nor);

    const bombs = new Info(`${this.count.flag}/${this.count.bombs}`, 'BOMBS');
    const steps = new Info(this.count.steps, 'STEPS');
    const time = new Info(this.count.time, 'TIME');

    _.insertNode(info, bombs.render(), steps.render(), time.render());
    _.insertNode(this._el, result, container, info);

    this._component = {
      result,
      container,
      info: {
        bombs,
        steps,
        time,
      },
    };
  }

  createContainer() {
    const list = this.getLattice();

    list.forEach((item, y) => {
      const tr = document.createElement('tr');
      item.forEach((isBomb, x) => {
        const [td, button] = _.createElement('td', 'button');
        button.dataset.x = x;
        button.dataset.y = y;
        button.textContent = this.emoji.starter;
        button.isReveal = false;

        if (!isBomb) {
          const neighborsList = [
            [y - 1, x - 1],
            [y - 1, x],
            [y - 1, x + 1],
            [y, x - 1],
            [y, x + 1],
            [y + 1, x - 1],
            [y + 1, x],
            [y + 1, x + 1],
          ];

          const neighbors = neighborsList.map(([y1, x1]) => {
            if (list[y1] && list[y1][x1] !== undefined) {
              return list[y1][x1] ? list[y1][x1] : [y1, x1];
            }
          });

          button.bombsCount = neighbors.filter(
            isBomb => isBomb === true
          ).length;
          button.neighbors = neighbors.filter(
            isBomb => isBomb !== true && isBomb !== undefined
          );
        } else {
          button.isBomb = true;
        }

        _.insertNode([td, button], [tr, td]);
      });
      this._component.container.appendChild(tr);
    });
  }

  bindEvent() {
    this._component.container.addEventListener(
      'click',
      ({ target }) => {
        if (this.method.isLattice(target)) {
          this.update().time();
        }
      },
      {
        once: true,
      }
    );
    this._component.container.addEventListener('click', ({ target }) => {
      if (this.method.isLattice(target) && !target.isReveal) {
        const { bombsCount, isBomb } = target;

        if (isBomb) {
          this.method.revealAll();
          this.update().time(true);
          this.isWin = false;
        } else if (bombsCount !== 0) {
          this.method.reveal(target);
        } else {
          this.method.empty(target);
        }

        this.update().steps();
        this.liquidate();
      }
    });
    this._component.container.addEventListener('contextmenu', evt => {
      evt.preventDefault();

      if (!this.isWin) {
        const { target } = evt;

        if (
          (this.method.isLattice(target) && !target.isReveal) ||
          target.isFlag
        ) {
          if (target.isFlag) {
            target.textContent = this.emoji.starter;
            delete target.isFlag;
            this.count.flag++;
          } else {
            target.textContent = this.emoji.flag;
            target.isFlag = true;
            this.count.flag--;
          }

          target.isReveal = !target.isReveal;
          this.update().bombs();
        }
      }
    });
    this._component.result.addEventListener('click', this.reset.bind(this));
  }

  liquidate() {
    if (this.count.grid === this.count.allGrid) this.isWin = true;

    if (this.isWin !== null) {
      if (this.isWin) {
        this.update().time(true);
        this._component.result.textContent = this.emoji.win;
        Array.from(this.method.filterBombs()).forEach(item => {
          item.textContent = this.emoji.flag;
        });
      } else {
        this._component.result.textContent = this.emoji.loser;
      }
    }
  }

  getLattice() {
    return _.arrayUpDimension(
      _.shuffle([
        ..._.createArray(this.count.bombs, true),
        ..._.createArray(
          this.size.reduce((acc, cur) => acc * cur) - this.count.bombs,
          false
        ),
      ]),
      this.size[1]
    );
  }

  get method() {
    const _this = this;

    return {
      isLattice(target) {
        return target.tagName === 'BUTTON';
      },
      getLattice(y, x) {
        return _this._component.container.children[y].children[x]
          .firstElementChild;
      },
      reveal(target, inspect) {
        const { isBomb, bombsCount, isReveal } = target;

        if (inspect || !isReveal) {
          if (isBomb) {
            target.textContent = _this.emoji.bomb;
          } else {
            bombsCount
              ? (target.textContent = _this.emoji.numbers[bombsCount - 1])
              : (target.textContent = _this.emoji.empty);
          }

          target.isReveal = true;
          _this.count.grid++;
        }
      },
      revealAll() {
        Array.from(_this._component.container.children).forEach(row => {
          Array.from(row.children).forEach(item => {
            this.reveal(item.firstElementChild, true);
          });
        });
      },
      filterBombs() {
        return Array.from(
          _this._component.container.querySelectorAll('button')
        ).filter(item => item.isBomb);
      },
      getNeighbors({ neighbors }) {
        return neighbors.map(([y, x]) => this.getLattice(y, x));
      },
      empty(target) {
        this.reveal(target);

        this.getNeighbors(target).forEach(neighbors => {
          if (!neighbors.isReveal && !neighbors.bombsCount)
            this.empty(neighbors);
          this.reveal(neighbors);
        });
      },
    };
  }

  update() {
    const _this = this;

    return {
      bombs() {
        _this._component.info.bombs.update(
          `${_this.count.flag}/${_this.count.bombs}`
        );
      },
      steps() {
        _this.count.steps += 1;
        _this._component.info.steps.update(_this.count.steps);
      },
      time: status => {
        this.update.timeid = this.update.timeid || null;

        if (status) {
          clearInterval(this.update.timeid);
        } else {
          this.update.timeid = setInterval(() => {
            _this._component.info.time.update(
              (_this.count.time += 0.01).toFixed(2)
            );
          }, 10);
        }
      },
    };
  }
}

const app = new Game({
  size: [10, 10],
  bombs: 10,
  emoji: {
    empty: '🐣',
    bomb: '💣',
    flag: '🚧',
    starter: '◻️',
  },
});

console.log(app);
