const directions = ['up', 'right', 'down', 'left'];

function Grid() {
  const self = this;
  this.canvas = document.getElementById('canvas');
  this.ctx = this.canvas.getContext('2d');
  let cells = [];
  let count = 0;

  const resolution = 100;
  const w = 500;
  const pixelSize = w / resolution;

  self.startPosition = resolution / 2;

  function init() {
    self.ant = new Ant(self);
    for (let x = 0; x < resolution; x++) {
      const temp = [];
      for (let y = 0; y < resolution; y++) {
        temp.push(-1);
      }
      cells.push(temp);
    }

    self.iterator = setInterval(self.iterate, 5);
    // document.getElementById('skip').onclick = () => {}
  }

  this.render = function() {
    clearGrid();
    this.ctx.fillStyle = 'black';
    for (let x = 0; x < cells.length; x++) {
      for (let y = 0; y < cells[0].length; y++) {
        if (cells[x][y] === 1) {
          self.ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }
      }
    }

    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(
      self.ant.x * pixelSize,
      self.ant.y * pixelSize,
      pixelSize,
      pixelSize
    );
  };

  this.iterate = () => {
    const x = self.ant.x;
    const y = self.ant.y;
    self.ant.changeDirection(cells[x][y]);
    self.ant.move();
    swapCell(x, y);
    self.render();
    if (count % 10 === 0) {
      document.getElementById('count').innerHTML = `${count} steps`;
    }
    count++;
  };

  function clearGrid() {
    self.ctx.fillStyle = 'white';
    self.ctx.fillRect(0, 0, w, w);
  }

  function swapCell(x, y) {
    cells[x][y] = -cells[x][y];
  }
  init();
}

function Ant(grid, x, y, direction) {
  const self = this;
  this.x = this.y = grid.startPosition;
  this.direction = 0;
  const gridSize = grid.startPosition * 2;

  this.move = () => {
    switch (directions[self.direction]) {
      case 'up':
        self.y = (self.y - 1) % gridSize;
        break;
      case 'down':
        self.y = (self.y + 1) % gridSize;
        break;
      case 'left':
        self.x = (self.x - 1) % gridSize;
        break;
      case 'right':
        self.x = (self.x + 1) % gridSize;
        break;
    }
    if (self.x < 0) {
      self.x = gridSize + self.x;
    }
    if (self.y < 0) {
      self.y = gridSize + self.y;
    }
  };

  this.changeDirection = cellValue => {
    self.direction = (self.direction - cellValue) % 4;
    if (self.direction < 0) {
      self.direction = 4 + self.direction;
    }
  };
}
new Grid();
