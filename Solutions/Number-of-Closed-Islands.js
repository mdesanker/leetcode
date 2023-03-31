/**
 * @param {number[][]} grid
 * @return {number}
 */
var closedIsland = function (grid) {
  const ROWS = grid.length,
    COLS = grid[0].length;

  function dfs(r, c) {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
    if (grid[r][c] !== 0) return;

    grid[r][c] = 1;

    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
    return true;
  }

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (
        (r === 0 || r === ROWS - 1 || c === 0 || c === COLS - 1) &&
        grid[r][c] === 0
      ) {
        dfs(r, c);
      }
    }
  }

  let count = 0;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c] === 0) {
        count++;
        dfs(r, c);
      }
    }
  }
  return count;
};

// Time: O(r * c) two passes iterating over every cell
// Space: O(r * c) if everything except borders is giant island, recursive stack is size of grid
