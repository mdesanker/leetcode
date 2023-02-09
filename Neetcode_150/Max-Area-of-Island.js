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

/**
Very similar approach to number of islands, but instead of counting islands, we want to return the size of the island from the dfs function, so it can be compared against a max counter
We will iterate over every cell in the grid until we find land, then compare the size returned by the dfs function against result variable

DFS helper function
Parameters are the coordinates of the cell being checked (r, c)

Base cases:
If coordinates are out of bounds for the grid, return 0
If the cell contains water, return 0

Recursive case:
We convert the cell to water so that it isn't doubly counted
Then we return 1 for the count of the cell + dfs calls on the four adjacent spaces

TC: O(r * c) we traverse every cell in grid to find land
SC: O(r * c) in worst case scenario, entire grid will be land, so recursive stack will be size of grid
 */
