/**
Fixed starting point
Variable ending point

Must traverse both paths simultaneously because we cannot count overlapping cells
Use 3D DP
 */

const GRID = [
  [2, 3, 1, 2],
  [3, 4, 2, 2],
  [5, 6, 3, 5],
];

// Recursion
var maxChocolates = function (grid) {
  const ROWS = grid.length,
    COLS = grid[0].length;

  function dp(r, c1, c2) {
    // out of bounds base case
    // always put out of bounds first
    if (c1 < 0 || c1 >= COLS || c2 < 0 || c2 >= COLS) return -Infinity;
    // destination base case
    // fixed starting point, so move top to bottom in grid
    if (r === ROWS - 1) {
      if (c1 === c2) return grid[r][c1];
      return grid[r][c1] + grid[r][c2];
    }

    // recurrence relation
    let max = -Infinity;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let move = dp(r + 1, c1 + i, c2 + j);
        max = Math.max(max, move);
      }
    }
    if (c1 === c2) return grid[r][c1] + max;
    return grid[r][c1] + grid[r][c2] + max;
  }
  // Alice starts at [0, 0], Bob starts at [0, n - 1]
  return dp(0, 0, COLS - 1);
};

// Time: O(3^n * 3^n) Both Alice and Bob have 3 options at every step
// Space: O(r) the recursive stack will be the number of rows

// Recursion + Memoization
var maxChocolates = function (grid) {
  const ROWS = grid.length,
    COLS = grid[0].length;

  const memo = {};

  function dp(r, c1, c2) {
    // check cache
    const key = `${r}#${c1}#${c2}`;
    if (key in memo) return memo[key];

    // out of bounds base case
    // always put out of bounds first
    if (c1 < 0 || c1 >= COLS || c2 < 0 || c2 >= COLS) return -Infinity;
    // destination base case
    // fixed starting point, so move top to bottom in grid
    if (r === ROWS - 1) {
      if (c1 === c2) return grid[r][c1];
      return grid[r][c1] + grid[r][c2];
    }

    // recurrence relation
    let max = -Infinity;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let val = 0;

        // handle value from current cells
        if (c1 === c2) val = grid[r][c1];
        else val = grid[r][c1] + grid[r][c2];

        // handle values from next step
        val += dp(r + 1, c1 + i, c2 + j);
        max = Math.max(max, val);
      }
    }
    return max;
  }
  // Alice starts at [0, 0], Bob starts at [0, n - 1]
  return dp(0, 0, COLS - 1);
};

// Time: O(9 * r * c * c) time complexity is the number of states and for every step there are 9 possible states
//    (combinations of steps Alice and Bob can take)
// Space: O(r * c * c) for the number of combinations of r, c1, and c2 in the cache

// Tabulation
var maxChocolates = function (grid) {
  const ROWS = grid.length,
    COLS = grid[0].length;

  // build 3D dp array
  const dp = [...new Array(ROWS)].map((x) =>
    [...new Array(COLS)].map((y) => new Array(COLS).fill(0))
  );

  // base cases
  for (let c1 = 0; c1 < COLS; c1++) {
    for (let c2 = 0; c2 < COLS; c2++) {
      if (c1 == c2) dp[ROWS - 1][c1][c2] = grid[ROWS - 1][c1];
      else dp[ROWS - 1][c1][c2] = grid[ROWS - 1][c1] + grid[ROWS - 1][c2];
    }
  }

  // recurrence relation
  // start from second last row
  for (let r = ROWS - 2; r >= 0; r--) {
    for (let c1 = 0; c1 < COLS; c1++) {
      for (let c2 = 0; c2 < COLS; c2++) {
        let max = -Infinity;
        for (let i = -1; i < 2; i++) {
          for (let j = -1; j < 2; j++) {
            let val = 0;

            // handle value from current cells
            if (c1 === c2) val = grid[r][c1];
            else val = grid[r][c1] + grid[r][c2];

            // handle values from next step
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

// Time: O(r * c * c)
// Space: O(r * c * c)

// Tabulation - Optimized [DOESN'T WORK]
var maxChocolates = function (grid) {
  const ROWS = grid.length,
    COLS = grid[0].length;

  let front = [];
  let curr = [];
  for (let c = 0; c < COLS; c++) {
    front.push(new Array(COLS).fill(0));
    curr.push(new Array(COLS).fill(0));
  }

  // base cases
  for (let c1 = 0; c1 < COLS; c1++) {
    for (let c2 = 0; c2 < COLS; c2++) {
      if (c1 == c2) front[c1][c2] = grid[ROWS - 1][c1];
      else front[c1][c2] = grid[ROWS - 1][c1] + grid[ROWS - 1][c2];
    }
  }

  // recurrence relation
  // start from second last row
  for (let r = ROWS - 2; r >= 0; r--) {
    for (let c1 = 0; c1 < COLS; c1++) {
      for (let c2 = 0; c2 < COLS; c2++) {
        let max = -Infinity;
        for (let i = -1; i < 2; i++) {
          for (let j = -1; j < 2; j++) {
            let val = 0;

            // handle value from current cells
            if (c1 === c2) val = grid[r][c1];
            else val = grid[r][c1] + grid[r][c2];

            // handle values from next step
            if (c1 + i >= 0 && c1 + i < COLS && c2 + j >= 0 && c2 + j < COLS) {
              val += front[c1 + i][c2 + j];
            } else val += -Infinity;
            max = Math.max(max, val);
          }
        }
        curr[c1][c2] = max;
      }
    }
    front = curr;
  }
  return front[0][COLS - 1];
};

// Time: O(r * c * c)
// Space: O(c * c) - optimized to 2D dp array

console.log(maxChocolates(GRID));
