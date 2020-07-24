let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let flag = false;
let clearState = false;
let lastPoint = {x: '', y: ''};

let colorConfig = ['#000000', '#FFFFFF', '#1978E4', '#FFEE00', '#FF0000', '#0000FF', '#00FF00'];
let color_container = document.querySelector('#color-container');
let color_pencil;

colorConfig.forEach((color, index) => {
  let li = document.createElement('li');
  li.style.background = color;
  li.dataset.color = color;

  if (index === 0) {
    li.classList.add('active');
    color_pencil = color
  }

  color_container.appendChild(li);
})

color_container.addEventListener('click', evt => {
  let target = evt.target;

  if (target.tagName.toLocaleLowerCase() === 'li') {
    let parentElement = target.parentElement;

    parentElement.querySelectorAll('li').forEach(element => {
      if (element.classList.contains('active')) {
        element.classList.remove('active');
      }
    })

    target.classList.add('active');

    color_pencil = target.dataset.color;
  }
});

let btn_control = document.querySelector('.control-btn');
btn_control.addEventListener('click', evt => {
  let target = evt.target;

  if (target.tagName.toLocaleLowerCase() === 'svg' || target.tagName.toLocaleLowerCase() === 'use') {
    btn_control.querySelectorAll('svg').forEach(element => {
      if (element.classList.contains('active')) element.classList.remove('active');
    });

    if (target.tagName.toLocaleLowerCase() === 'use') {
      tagName.parentElement.classList.add('active');
    } else {
      target.classList.add('active');
    }

    if (target.id === 'btn-eraser') {
      clearState = !clearState;
    } else {
      clearState = false;
    }

    if (target.id === 'btn-wastebasket') {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    } else if (target.id === 'btn-save') {
      let link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'Canvas';
      link.click();
    }

    // setActive(element, clearState);
  }
});

function setActive(element, state) {
  if (!state && element.id === 'btn-eraser') {
    element.classList.remove('active');
  } else {
    if (element.classList.contains('active')) {
      element.classList.remove('active');
    } else {
      element.classList.add('active');
    }
  }
}

function setCanvasWH() {
  canvas.setAttribute('width', window.innerWidth);
  canvas.setAttribute('height', window.innerHeight);
}

class Draw {
  constructor(ctx) {
    this.ctx = ctx;
  }

  line(x1, y1, x2, y2) {
    this.ctx.beginPath();
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = color_pencil;
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
    this.ctx.closePath();

    this.updateLastPoint(x2, y2);
  }

  arc(x, y, r) {
    this.ctx.beginPath();
    this.ctx.fillStyle = color_pencil;
    this.ctx.arc(x, y, r, 0, Math.PI * 2);
    this.ctx.fill();

    this.updateLastPoint(x, y);
  }

  eraser(x, y, width, height) {
    this.ctx.clearRect(x, y, width, height);
  }

  updateLastPoint(x, y) {
    lastPoint.x = x;
    lastPoint.y = y;
  }
}

class MT {
  constructor(evt) {
    this.evt = evt;
  }

  execute() {
    if (!this.evt.touches) {
      const X = this.evt.clientX, Y = this.evt.clientY;
      this.command(X, Y);
    } else {
      for (const touch of this.evt.touches) {
        const X = touch.clientX, Y = touch.clientY;
        this.command(X, Y);
      }
    }
  }
}

class MTDown extends MT {
  constructor(evt) {
    super(evt);
  }

  command(x, y) {
    flag = true;
  
    if (clearState) {
      draw.eraser(x - 5, y - 5, 10, 10);
    } else {
      draw.arc(x, y, 1);
    }
  }
}

class MTMove extends MT {
  constructor(evt) {
    super(evt);
  }

  command(x, y) {
    if (flag && !clearState) {
      draw.line(lastPoint.x, lastPoint.y, x, y);
    } else if (flag && clearState) {
      draw.eraser(x - 5, y - 5, 10, 10);
    }
  }
}

let draw = new Draw(ctx);
if (!('ontouchstart' in document)) {
  canvas.addEventListener('mousedown', evt => {
    let command = new MTDown(evt);
    command.execute();
  });
  
  canvas.addEventListener('mousemove', evt => {
    let command = new MTMove(evt);
    command.execute();
  });
  
  canvas.addEventListener('mouseup', evt => {
    flag = false;
  });

  window.addEventListener('resize', evt => {
    setCanvasWH();
  });
} else {
  canvas.addEventListener('touchstart', evt => {
    let command = new MTDown(evt);
    command.execute();
  });
  
  canvas.addEventListener('touchmove', evt => {
    evt.preventDefault();

    let command = new MTMove(evt);
    command.execute();
  });
  
  canvas.addEventListener('touchend', evt => {
    flag = false;
  });
}

window.addEventListener('load', evt => {
  setCanvasWH();
});