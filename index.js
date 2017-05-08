const directions = ['up', 'right', 'down', 'left'];
const resetButton = document.getElementById('reset');

function Grid() {
  const self = this;
  self.canvas = document.getElementById('canvas');
  self.ctx = self.canvas.getContext('2d');
  let cells = [];
  let count = 0;

  const resolution = 100;
  const w = 500;
  const pixelSize = w / resolution;

  self.startPosition = resolution / 2;

  self.buildGrid = () => {
    for (let x = 0; x < resolution; x++) {
      const temp = [];
      for (let y = 0; y < resolution; y++) {
        temp.push(-1);
      }
      cells.push(temp);
    }
  };

  self.init = () => {
    self.ant = new Ant(self);
    self.iterator = setInterval(self.iterate, 10);
    self.buildGrid();
    // resetButton.addEventListener('click', function() {
    //   buildGrid()
    //   // self.ctx.clearRect(0, 0, w, w)
    //   // count = 0;
    //   // cells = [];
    //   // init()
    //   // self.ant = new Ant(self)
    // })
  };

  self.render = function() {
    self.clearGrid();
    self.ctx.fillStyle = 'black';
    for (let x = 0; x < cells.length; x++) {
      for (let y = 0; y < cells[0].length; y++) {
        if (cells[x][y] === 1) {
          self.ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }
      }
    }

    self.ctx.fillStyle = 'red';
    self.ctx.fillRect(
      self.ant.x * pixelSize,
      self.ant.y * pixelSize,
      pixelSize,
      pixelSize
    );
  };

  self.iterate = () => {
    const x = self.ant.x;
    const y = self.ant.y;
    self.ant.changeDirection(cells[x][y]);
    self.ant.move();
    self.swapCell(x, y);
    self.render();
    if (count % 10 === 0) {
      document.getElementById('count').innerHTML = `${count} steps`;
    }
    count++;
  };

  self.clearGrid = () => {
    self.ctx.fillStyle = 'white';
    self.ctx.fillRect(0, 0, w, w);
  };

  self.swapCell = (x, y) => {
    cells[x][y] = -cells[x][y];
  };

  self.init();
}

function Ant(grid) {
  const self = this;
  self.x = self.y = grid.startPosition;
  self.direction = 0;
  const gridSize = grid.startPosition * 2;

  self.move = () => {
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

  self.changeDirection = cellValue => {
    self.direction = (self.direction - cellValue) % 4;
    if (self.direction < 0) {
      self.direction = 4 + self.direction;
    }
  };
}
new Grid();
