/**
 * @param {number[][]} grid
 * @return {number}
 */
// Recursion
var cherryPickup = function (grid) {
  const ROWS = grid.length,
    COLS = grid[0].length;

  function dp(r1, c1, r2, c2) {
    // out of bounds base case
    // return -Inf instead of 0, so that paths that go out of bounds or hit barriers are not considered valid
    if (r1 >= ROWS || c1 >= COLS || r2 >= ROWS || c2 >= COLS) return -Infinity;
    if (grid[r1][c1] === -1 || grid[r2][c2] === -1) return -Infinity;
    // destination base case
    if (r1 === ROWS - 1 && c1 === COLS - 1) {
      return grid[r1][c1];
    }

    // recurrence relation
    // get the counts of cherries at both positions
    let val = grid[r1][c1];
    if (c1 !== c2) val += grid[r2][c2];

    // four possible combinations of two moves for each path
    // return the max path
    val += Math.max(
      dp(r1, c1 + 1, r2, c2 + 1),
      dp(r1, c1 + 1, r2 + 1, c2),
      dp(r1 + 1, c1, r2, c2 + 1),
      dp(r1 + 1, c1, r2 + 1, c2)
    );
    return val;
  }
  //paths that high barriers will be -Inf, so return max of res and 0
  return Math.max(0, dp(0, 0, 0, 0));
};

// Time: O(2^n * 2^n) two possible paths at each step
// Space: O(n) path length is 2n which simplifies to n

// Recursion + Memoization
var cherryPickup = function (grid) {
  const ROWS = grid.length,
    COLS = grid[0].length;
  const memo = {};

  function dp(r1, c1, r2, c2) {
    // check cache
    const key = `${r1}#${c1}#${r2}#${c2}`;
    if (key in memo) return memo[key];

    // out of bounds base case
    // return -Inf instead of 0, so that paths that go out of bounds or hit barriers are not considered valid
    if (r1 >= ROWS || c1 >= COLS || r2 >= ROWS || c2 >= COLS) return -Infinity;
    if (grid[r1][c1] === -1 || grid[r2][c2] === -1) return -Infinity;
    // destination base case
    if (r1 === ROWS - 1 && c1 === COLS - 1) {
      return grid[r1][c1];
    }

    // recurrence relation
    // get the counts of cherries at both positions
    let val = grid[r1][c1];
    if (c1 !== c2) val += grid[r2][c2];

    // four possible combinations of two moves for each path
    // return the max path
    val += Math.max(
      dp(r1, c1 + 1, r2, c2 + 1),
      dp(r1, c1 + 1, r2 + 1, c2),
      dp(r1 + 1, c1, r2, c2 + 1),
      dp(r1 + 1, c1, r2 + 1, c2)
    );
    return (memo[key] = val);
  }
  //paths that high barriers will be -Inf, so return max of res and 0
  return Math.max(0, dp(0, 0, 0, 0));
};

// Time: O(2^n * 2^n) two possible paths at each step
// Space: O(n) path length is 2n which simplifies to n
