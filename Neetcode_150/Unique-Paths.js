/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
// Recursion
var uniquePaths = function (m, n) {
  function dp(r, c) {
    // base cases
    if (r === 0) return 1;
    if (c === 0) return 1;

    // recurrence relation
    return dp(r - 1, c) + dp(r, c - 1);
  }
  return dp(m - 1, n - 1);
};

// Time: O(2^(n * m))
// Space: O(n * m)

// Recursion + memoization
var uniquePaths = function (m, n) {
  const memo = {};

  function dp(r, c) {
    // check cache
    const key = `${r}#${c}`;
    if (key in memo) return memo[key];

    // base cases
    if (r === 0) return 1;
    if (c === 0) return 1;

    // recurrence relation
    return (memo[key] = dp(r - 1, c) + dp(r, c - 1));
  }
  return dp(m - 1, n - 1);
};

// Time: O(n * m)
// Space: O(n * m)

// Tabulation
var uniquePaths = function (m, n) {
  const dp = [];
  for (let i = 0; i < m; i++) {
    dp.push(new Array(n).fill(1));
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  return dp[m - 1][n - 1];
};

// Time: O(n * m)
// Space: O(n * m)

// Tabulation - Optimization
var uniquePaths = function (m, n) {
  // only store the previous row
  let dp = new Array(n).fill(1);

  for (let i = 1; i < m; i++) {
    let temp = new Array(n).fill(1);
    for (let j = 1; j < n; j++) {
      temp[j] = dp[j] + temp[j - 1];
    }
    dp = temp;
  }
  return dp[n - 1];
};

// Time: O(n * m)
// Space: O(m)
