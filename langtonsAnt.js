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

const canvas = document.getElementById('canvas').getContext('2d');
// const ctx = canvas.getContext('2d');

let options = {
  white: 'white',
  black: 'black',
  width: 400,
  height: 400,
  gridSize: 400,
  pixelSize: 2,
  speed: 5,
  steps: 10000
};

// ctx.canvas.width = options.width * options.pixelSize;
// ctx.canvas.height = options.height * options.pixelSize;

/**
 * up: 0,
 * right: 1,
 * down: 2,
 * left: 3
 */
let directions = [0, 1, 2, 3];

var bw = 800;
var bh = 800;
//padding around grid
var p = 0;
//size of canvas
var cw = bw + 10;
var ch = bh + 10;

// var context = canvas.get(0).getContext("2d");

function drawBoard(){
    for (let x = 0; x <= bw; x += 5) {
        canvas.moveTo(0.5 + x + p, p);
        canvas.lineTo(0.5 + x + p, bh + p);
    }
    for (let x = 0; x <= bh; x += 5) {
        canvas.moveTo(p, 0.5 + x + p);
        canvas.lineTo(bw + p, 0.5 + x + p);
    }
    canvas.strokeStyle = "black";
    canvas.stroke();
}

let newBoard = drawBoard();

function buildMatrix(options) {
  let { gridSize } = options;
  let newGrid = [];
  for (let x = 0; x < gridSize; x++) {
    newGrid[x] = [];
    for (let y = 0; y < gridSize; y++) {
      newGrid[x][y] = 0;
    }
  }
  return newGrid;
}

const display = board =>
  board.map((row, rowIndex) => {
    row.map((cell, cellIndex) => {
      canvas.fillStyle = cell === 1 ? 'black' : 'white';
      canvas.fillRect(
        rowIndex * options.pixelSize,
        cellIndex * options.pixelSize,
        options.pixelSize,
        options.pixelSize
      );
    });
  });

let twoDArray = Array.fill(0)
// let newMatrix = buildMatrix(options);
let renderedGrid = display(newMatrix);

// moveAnt :: (Matrix, Object) -> [Matrix, Object]
function moveAnt(newMatrix, ant) {
  newMatrix[ant.x][ant.y] = newMatrix[ant.x][ant.y] === 1 ? 0 : -1;
  ant.currentDirection =
    directions[
      (4 + ant.currentDirection + (newMatrix[ant.x][ant.y] === 0 ? 1 : -1)) % 4
    ];

  switch (ant.currentDirection) {
    case directions[0]:
      ant.y -= 1;
      break;
    case directions[1]:
      ant.x -= 1;
      break;
    case directions[2]:
      ant.y += 1;
      break;
    case directions[3]:
      ant.x += 1;
      break;
  }

  return [newMatrix, ant];
}

// Recursively update the grid on each step
function updateGrid(newMatrix, ant, options) {
  let { speed, steps } = options;
  [newMatrix, ant] = moveAnt(newMatrix, ant);
  display(newMatrix);

  if (steps > 0) {
    setTimeout(updateGrid(newMatrix, ant, steps), --steps);
  }
}

let ant = {
  x: options.width / 2,
  y: options.height / 2,
  currentDirection: directions[0]
};

updateGrid(newMatrix, ant, options);
