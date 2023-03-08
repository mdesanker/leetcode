/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
// Recursion
var uniquePathsWithObstacles = function (obstacleGrid) {
  const ROWS = obstacleGrid.length,
    COLS = obstacleGrid[0].length;

  function dp(r, c) {
    if (r >= 0 && c >= 0 && obstacleGrid[r][c] === 1) return 0;

    if (r === 0 && c === 0) return 1;
    if (r < 0 || c < 0) return 0;

    return dp(r - 1, c) + dp(r, c - 1);
  }
  return dp(ROWS - 1, COLS - 1);
};

// Time: O(2^(r * c))
// Space: O(r * c)

// Recursion + memoization
var uniquePathsWithObstacles = function (obstacleGrid) {
  const ROWS = obstacleGrid.length,
    COLS = obstacleGrid[0].length;

  const memo = {};

  function dp(r, c) {
    const key = `${r}#${c}`;
    if (key in memo) return memo[key];

    if (r >= 0 && c >= 0 && obstacleGrid[r][c] === 1) return 0;

    if (r === 0 && c === 0) return 1;
    if (r < 0 || c < 0) return 0;

    return (memo[key] = dp(r - 1, c) + dp(r, c - 1));
  }
  return dp(ROWS - 1, COLS - 1);
};

// Time: O(r * c)
// Space: O(r * c)

// Tabulation
var uniquePathsWithObstacles = function (obstacleGrid) {
  const ROWS = obstacleGrid.length,
    COLS = obstacleGrid[0].length;

  const dp = [];
  for (let r = 0; r < ROWS; r++) {
    dp.push(new Array(COLS).fill(0));
  }
  dp[0][0] = 1;

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      // r and c are guaranteed to be greater than 0
      if (obstacleGrid[r][c] === 1) dp[r][c] = 0;
      else if (r === 0 && c === 0) dp[r][c] = 1;
      else {
        let left = 0,
          up = 0;
        if (r - 1 >= 0) up = dp[r - 1][c];
        if (c - 1 >= 0) left = dp[r][c - 1];
        dp[r][c] = left + up;
      }
    }
  }
  return dp[ROWS - 1][COLS - 1];
};

// Time: O(r * c)
// Space: O(r * c)

// Tabulation - Optimized
var uniquePathsWithObstacles = function (obstacleGrid) {
  const ROWS = obstacleGrid.length,
    COLS = obstacleGrid[0].length;

  // only store previous row
  let dp = new Array(COLS).fill(0);

  for (let r = 0; r < ROWS; r++) {
    let temp = new Array(COLS).fill(0);
    for (let c = 0; c < COLS; c++) {
      // r and c are guaranteed to be greater than 0
      if (obstacleGrid[r][c] === 1) temp[c] = 0;
      else if (r === 0 && c === 0) temp[c] = 1;
      else {
        let left = 0,
          up = 0;
        if (r - 1 >= 0) up = dp[c];
        if (c - 1 >= 0) left = temp[c - 1];
        temp[c] = left + up;
      }
    }
    dp = temp;
  }
  return dp[COLS - 1];
};

// Time: O(r * c)
// Space: O(c)
