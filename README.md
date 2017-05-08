# langtons-ant

## Overview

From [wikipedia](https://en.wikipedia.org/wiki/Langton%27s_ant):
> **Langton's ant** is a two-dimensional universal Turing machine with a very simple set of rules but complex emergent behavior. It was invented by Chris Langton in 1986 and runs on a square lattice of black and white cells.

## Rules

1. Start the ant on a random point in the grid.
2. On each move, check the color of the square the ant is currently on and do the following:

    3. Depending on the current square's color, turn the ant **90 degrees to the right** or turn the ant **90 degrees to the left**.
    4. Change the color of the current square from white to black.
    5. Move ant forward **one square**, in the **direction it is facing**.

## Features

- start the simulation on command
- pause/resume the iterator

## License

MIT
