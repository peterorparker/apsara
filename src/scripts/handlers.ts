function sudokuDisable(disabled: boolean[][], row: number, column: number) {
  for (let i = 0; i < disabled.length; i++) {
    for (let j = 0; j < disabled[i].length; j++) {
      if (i === row || j === column) {
        if (!(i === row && j === column)) {
          disabled[i][j] = true;
        }
      }
    }
  }
}

export function sudoku(selected: boolean[][], disabled: boolean[][]) {
  for (let i = 0; i < selected.length; i++) {
    for (let j = 0; j < selected[i].length; j++) {
      if (selected[i][j]) sudokuDisable(disabled, i, j);
    }
  }
}

function sudokuMegaDisable(disabled: boolean[][], row: number, column: number) {
  const size = disabled.length;
  const childSize = Math.sqrt(size);
  const grid = [0, 0, 0, 0];
  for (let i = 0; i < childSize; i++) {
    if (row >= i * childSize && row < (i + 1) * childSize) {
      grid[0] = i * childSize;
      grid[1] = (i + 1) * childSize;
    }

    if (column >= i * childSize && column < (i + 1) * childSize) {
      grid[2] = i * childSize;
      grid[3] = (i + 1) * childSize;
    }
  }

  for (let i = 0; i < disabled.length; i++) {
    for (let j = 0; j < disabled[i].length; j++) {
      console.log(i, j, grid);
      if (
        i === row ||
        j === column ||
        (i >= grid[0] && i < grid[1] && j >= grid[2] && j < grid[3])
      ) {
        if (!(i === row && j === column)) {
          disabled[i][j] = true;
        }
      }
    }
  }
}
export function sudokuMega(selected: boolean[][], disabled: boolean[][]) {
  const size = selected.length;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (selected[i][j]) {
        sudokuMegaDisable(disabled, i, j);
      }
    }
  }
}

export function diagonal(selected: boolean[][], disabled: boolean[][]) {
  for (let i = 0; i < selected.length - 1; i++) {
    if (selected[i].every((x) => !x)) {
      for (let j = 0; j < selected[i].length; j++) {
        disabled[i + 1][j] = true;
      }
    } else {
      for (let j = 0; j < selected[i].length; j++) {
        if (!selected[i][j]) disabled[i][j] = true;
        else {
          const ids = [j - 1, j, j + 1];
          for (let k = 0; k < selected[i].length; k++)
            if (!ids.includes(k)) {
              disabled[i + 1][k] = true;
            }
        }
      }
    }
  }
}

export function handleChoice(
  selected: boolean[][],
  handler?: (selected: boolean[][], disabled: boolean[][]) => void
) {
  const disabled = Array.from(Array(selected.length), () =>
    Array(selected[0].length).fill(false)
  );
  if (handler) handler(selected, disabled);
  return disabled;
}
