/**
 * @param {number[][]} grid
 * @return {number}
 */
var numEnclaves = function (grid) {
  const ROWS = grid.length,
    COLS = grid[0].length;

  // use dfs to find the size of an enclave
  function dfs(r, c) {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return 0;
    if (grid[r][c] !== 1) return 0;

    grid[r][c] = 0;
    return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1);
  }

  // first pass: convert all bordering enclaves into water
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (
        (r === 0 || r === ROWS - 1 || c === 0 || c === COLS - 1) &&
        grid[r][c] === 1
      )
        dfs(r, c);
    }
  }

  // second pass: count size of all internal enclaves
  let count = 0;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c] === 1) {
        count += dfs(r, c);
      }
    }
  }
  return count;
};

// Time: O(r * c) first and second pass nested for-loops, both n^2 complexity
// Space: O(r * c) worst case scenario, everything except borders is land, so almost entire grid is in recursive stack
