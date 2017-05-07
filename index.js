((() => {
  window.onload = () => {
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
            temp.push(-1)
          }
          cells.push(temp);
        }

        self.iterator = setInterval(self.iterate, 5);
        // document.getElementById('skip').onclick = () => {}
      };
      this.render = function() {
        clearGrid();
        this.ctx.fillStyle = 'black';
        for (let x = 0; x < cells.length; x++) {
          for (let y = 0; y < cells[0].length; y++) {
            if (cells[x][y] === 1) {
              self.ctx.fillRect(x * pixelSize, self.ant.y * pixelSize, pixelSize, pixelSize);
            }
          }
        }

        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(self.ant.x * pixelSize, self.ant.y * pixelSize, pixelSize, pixelSize);
      }

      this.iteratre = () => {
        const x = self.ant.x;
        const y = self.ant.y;
        self.ant.changeDirection(cells[x][y]);
        self.ant.move();
        flipCell(x,y);
        self.draw();
        if (count % 10 === 0) {
          document.getElementById('count').innerHTML = `${count} steps`;
        }
        count++
      };

      function clearGrid() {
        self.ctx.fillStyle = 'white';
        self.ctx.fillRect(0, 0, width, width);
      }

      function swapCell(x, y) {
        cells[x][y] = -cells[x][y];
      }
      init();
    }

    function Ant(grid, x, y, direction) {
      const self = this;
    }
  }
}))();
