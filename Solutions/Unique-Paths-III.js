/**
 * @param {number[][]} grid
 * @return {number}
 */
var uniquePathsIII = function (grid) {
  const ROWS = grid.length,
    COLS = grid[0].length;

  // initialize conditions for backtracking
  let nonObstacles = 0;
  let [startR, startC] = [0, 0];

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c] >= 0) nonObstacles++;
      if (grid[r][c] === 1) [startR, startC] = [r, c];
    }
  }

  let count = 0;

  function dfs(r, c, remain) {
    // base cases
    // out of bounds
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
    // obstacle
    if (grid[r][c] < 0) return;

    // successfully reach end
    if (grid[r][c] === 2 && remain === 1) {
      count++;
      return;
    }

    // mark cell visited
    let temp = grid[r][c];
    grid[r][c] = -10;
    remain--;

    // explore 4 adjacent cells
    dfs(r + 1, c, remain);
    dfs(r - 1, c, remain);
    dfs(r, c + 1, remain);
    dfs(r, c - 1, remain);

    // unmark cell
    grid[r][c] = temp;
  }

  dfs(startR, startC, nonObstacles);

  return count;
};

// Time: O(3^n) each cell has 3 options for traversal (after the first cell which has 4)
// Space: O(n) for recursion in the function call stack
