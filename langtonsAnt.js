/**
 * At a white square:
 *  turn 90° right
 *  flip the color of the square
 *  move forward one unit
 * 
 * At a black square:
 *  turn 90° left
 *  flip the color of the square
 *  move forward one unit.
 */

/**
 * The 'board' will be represented as a map where the keys are coordinates
 * with values containing cells.
 */

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let options = {
  white,
  black,
  width: 500,
  height: 500,
  pixelSize: 4,
  speed: 100,
  steps: 10000
};

let directions = {
  up,
  down,
  left,
  right
};

const renderGrid = grid =>
  grid.map((row, rowIndex) => {
    row.map((cell, cellIndex) => {
      canvas.fillStyle = cell === 1 ? black : white;
      canvas.fillRect(
        rowIndex * pixelSize,
        cellIndex * pixelSize,
        pixelSize,
        pixelSize
      );
    });
  });

// moveAnt :: (Matrix, Object) -> [Matrix, Object]


// Recursively update the grid on each step
const updateGrid = (grid, ant, steps) => {
  { speed, steps } = options;
  [grid, ant] = moveAnt(grid, ant);
  renderGrid(grid);

  if (steps > 0) {
    setTimeout(updateGrid, speed, grid, ant, --steps)
  }
}
