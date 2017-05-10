const directions = ['up', 'right', 'down', 'left'];
const pauseButton = document.getElementById('pause');
const initializeButton = document.getElementById('init');

function Grid() {
  const self = this;
  self.isRunning;
  self.canvas = document.getElementById('canvas');
  self.ctx = self.canvas.getContext('2d');
  self.cells = [];
  self.count = 0;
  self.timer;
  const resolution = 200;
  const w = 800;
  const h = w;
  const pixelSize = w / resolution;

  self.startPosition = resolution / 2;

  self.buildGrid = () => {
    for (let x = 0; x < resolution; x++) {
      const temp = [];
      for (let y = 0; y < resolution; y++) {
        temp.push(-1);
      }
      self.cells.push(temp);
    }
  };

  self.init = () => {
    self.start();
    self.ant = new Ant(self);
    self.iterator = setInterval(self.iterate, 10);
    self.buildGrid();
  };

  self.render = function() {
    let antPosition = self.ant.x + self.ant.y * h;
    if (antPosition > self.cells.length || antPosition < 0) {
      clearInterval(self.timer);
    }
    self.clearGrid();
    self.ctx.fillStyle = 'black';
    for (let x = 0; x < self.cells.length; x++) {
      for (let y = 0; y < self.cells[0].length; y++) {
        if (self.cells[x][y] === 1) {
          self.ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }
      }
    }

    self.ctx.fillStyle = 'blue';
    self.ctx.fillRect(
      self.ant.x * pixelSize,
      self.ant.y * pixelSize,
      pixelSize,
      pixelSize
    );
  };

  self.iterate = () => {
    if (!self.isRunning) {
      return;
    }
    const x = self.ant.x;
    const y = self.ant.y;
    self.ant.changeDirection(self.cells[x][y]);
    self.ant.move();
    self.swapCell(x, y);
    self.render();
    if (self.count % 10 === 0) {
      document.getElementById('count').innerHTML = `${self.count} steps`;
    }
    self.count++;
  };

  self.start = () => {
    self.isRunning = true;
    self.timer = setInterval(
      function() {
        for (let i = 0; i < self.count; i++) {
          if (self.render() === true) {
            self.isRunning = false;
            break;
          }
        }
      }.bind(self),
      0
    );
  };

  self.stop = () => {
    self.isRunning = false;
  };

  self.reset = () => {
    self.stop();
    self.cells = [];
    self.count = 0;
    self.ctx.canvas.width = self.ctx.canvas.width;
  };

  self.restart = () => {
    self.reset();
    self.start();
  };

  self.clearGrid = () => {
    self.ctx.fillStyle = 'white';
    self.ctx.fillRect(0, 0, w, w);
  };

  self.swapCell = (x, y) => {
    self.cells[x][y] = -self.cells[x][y];
  };
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

let app = new Grid();

if (app.isRunning) {
  initializeButton.disabled = false;
}

initializeButton.addEventListener('click', function(e) {
  e.preventDefault();
  initializeButton.disabled = true;
  app.init();
});

pauseButton.addEventListener('click', function(e) {
  if (!app.isRunning) {
    app.isRunning = true;
  } else {
    e.preventDefault();
    app.isRunning = false;
  }
});
