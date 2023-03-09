/**
 * @param {number[][]} grid
 * @return {number}
 */
// Recursion
var cherryPickup = function (grid) {
  const ROWS = grid.length,
    COLS = grid[0].length;

  function dp(r, c1, c2) {
    // out of bounds base case
    if (c1 < 0 || c1 >= COLS || c2 < 0 || c2 >= COLS) return 0;
    // destination base case
    if (r === ROWS - 1) {
      if (c1 == c2) return grid[r][c1];
      else return grid[r][c1] + grid[r][c2];
    }

    let max = -Infinity;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let val = 0;
        if (c1 === c2) val = grid[r][c1];
        else val = grid[r][c1] + grid[r][c2];

        val += dp(r + 1, c1 + i, c2 + j);
        max = Math.max(max, val);
      }
    }
    return max;
  }
  return dp(0, 0, COLS - 1);
};

// Time: O(3^r * 3^r) both alice and bob have 3 options at every step
// Space: O(r) recursive stack will be number of rows (distance of path)

// Recursion + Memoization
var cherryPickup = function (grid) {
  const ROWS = grid.length,
    COLS = grid[0].length;
  const memo = {};

  function dp(r, c1, c2) {
    // check cache
    const key = `${r}#${c1}#${c2}`;
    if (key in memo) return memo[key];

    // out of bounds base case
    if (c1 < 0 || c1 >= COLS || c2 < 0 || c2 >= COLS) return 0;
    // destination base case
    if (r === ROWS - 1) {
      if (c1 == c2) return grid[r][c1];
      else return grid[r][c1] + grid[r][c2];
    }

    let max = -Infinity;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let val = 0;
        if (c1 === c2) val = grid[r][c1];
        else val = grid[r][c1] + grid[r][c2];

        val += dp(r + 1, c1 + i, c2 + j);
        max = Math.max(max, val);
      }
    }
    return (memo[key] = max);
  }
  return dp(0, 0, COLS - 1);
};

// Time: O(9 * r * c * c) time complexity is the number of states and for every step there are 9 possible states
//    (combinations of steps Alice and Bob can take)
// Space: O(r * c * c) for the number of combinations of r, c1, and c2 in the cache

// Tabulation
var cherryPickup = function (grid) {
  const ROWS = grid.length,
    COLS = grid[0].length;
  const memo = {};

  // build 3D dp array
  const dp = [...new Array(ROWS)].map((x) =>
    [...new Array(COLS)].map((y) => new Array(COLS).fill(0))
  );

  // base cases
  for (let c1 = 0; c1 < COLS; c1++) {
    for (let c2 = 0; c2 < COLS; c2++) {
      dp[ROWS - 1][c1][c2] = grid[ROWS - 1][c1];
      if (c1 !== c2) dp[ROWS - 1][c1][c2] += grid[ROWS - 1][c2];
    }
  }

  // recurrence relation
  for (let r = ROWS - 2; r >= 0; r--) {
    for (let c1 = 0; c1 < COLS; c1++) {
      for (let c2 = 0; c2 < COLS; c2++) {
        let max = -Infinity;
        for (let i = -1; i < 2; i++) {
          for (let j = -1; j < 2; j++) {
            let val = grid[r][c1];
            if (c1 !== c2) val += grid[r][c2];

            if (c1 + i >= 0 && c1 + i < COLS && c2 + j >= 0 && c2 + j < COLS) {
              val += dp[r + 1][c1 + i][c2 + j];
            } else val += -Infinity;
            max = Math.max(max, val);
          }
        }
        dp[r][c1][c2] = max;
      }
    }
  }
  return dp[0][0][COLS - 1];
};

// Time: O(r * c * c) for 3 nested for-loops
// Space: O(r * c * c) for 3D dp array
