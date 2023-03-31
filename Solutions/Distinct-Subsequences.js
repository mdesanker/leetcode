/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
// Recursion
var numDistinct = function (s, t) {
  const n = s.length,
    m = t.length;

  function dp(i, j) {
    // if j < 0, then t is exhaused
    if (j < 0) return 1;
    // if i < 0, then s is exhausted
    if (i < 0) return 0;

    if (s[i] === t[j]) {
      // chars match, can either take or not take
      return dp(i - 1, j - 1) + dp(i - 1, j);
    } else {
      // chars don't match, can only not take
      return dp(i - 1, j);
    }
  }
  return dp(n - 1, m - 1);
};

// Time: O(2^(n + m))
// Space: O(n + m)

// Recursion + Memoization
var numDistinct = function (s, t) {
  const n = s.length,
    m = t.length;
  const memo = {};

  function dp(i, j) {
    const key = `${i}#${j}`;
    if (key in memo) return memo[key];

    // if j < 0, then t is exhaused
    if (j < 0) return 1;
    // if i < 0, then s is exhausted
    if (i < 0) return 0;

    if (s[i] === t[j]) {
      // chars match, can either take or not take
      return (memo[key] = dp(i - 1, j - 1) + dp(i - 1, j));
    } else {
      // chars don't match, can only not take
      return (memo[key] = dp(i - 1, j));
    }
  }
  return dp(n - 1, m - 1);
};

// Time: O(n * m)
// Space: O(n * m)

// Tabulation
var numDistinct = function (s, t) {
  const n = s.length,
    m = t.length;

  const dp = [...new Array(n + 1)].map(() => new Array(m + 1).fill(0));

  // if j === 0, then string t is exhausted, we have matched all the chars
  for (let i = 0; i < n + 1; i++) dp[i][0] = 1;

  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < m + 1; j++) {
      if (s[i - 1] === t[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }
  return dp[n][m];
};

// Time: O(n * m)
// Space: O(n * m)

// Tabulation - Optimized
var numDistinct = function (s, t) {
  const n = s.length,
    m = t.length;

  let dp = new Array(m + 1).fill(0);
  dp[0] = 1;

  for (let i = 1; i < n + 1; i++) {
    let temp = new Array(m + 1).fill(0);
    temp[0] = 1;
    for (let j = 1; j < m + 1; j++) {
      if (s[i - 1] === t[j - 1]) {
        temp[j] = dp[j - 1] + dp[j];
      } else {
        temp[j] = dp[j];
      }
    }
    dp = temp;
  }
  return dp[m];
};

// Time: O(n * m)
// Space: O(m)

// Tabulation - Optimized
var numDistinct = function (s, t) {
  const n = s.length,
    m = t.length;

  let dp = new Array(m + 1).fill(0);
  dp[0] = 1;

  for (let i = 1; i < n + 1; i++) {
    for (let j = m; j > 0; j--) {
      if (s[i - 1] === t[j - 1]) {
        dp[j] += dp[j - 1];
      }
    }
  }
  return dp[m];
};

// Time: O(n * m)
// Space: O(m)
