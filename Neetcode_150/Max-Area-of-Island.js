/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function (grid) {
  const ROWS = grid.length,
    COLS = grid[0].length;
  let max = 0;

  function dfs(r, c) {
    // return 0 if invalid grid space
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS || grid[r][c] === 0) return 0;

    // set grid space to 0 so don't recount
    grid[r][c] = 0;
    // add 1 to result from iterating over all adjacent spaces
    return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1);
  }

  // iterate through every grid space checking for islands
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c] === 1) {
        max = Math.max(max, dfs(r, c));
      }
    }
  }
  return max;
};

// Time: O(r * c) where r and c are rows and cols of grid
// Space: O(n) where n is size of largest island (for recursion call stack)
