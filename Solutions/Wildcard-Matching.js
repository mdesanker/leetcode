/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
// Recursion
var isMatch = function (s, p) {
  const n = s.length,
    m = p.length;

  function dp(i, j) {
    if (i < 0 && j < 0) return true;
    if (j < 0 && i >= 0) return false;
    if (i < 0 && j >= 0) {
      for (let k = 0; k < j + 1; k++) {
        if (p[k] !== "*") return false;
      }
      return true;
    }

    if (s[i] === p[j] || p[j] === "?") {
      return dp(i - 1, j - 1);
    } else if (p[j] === "*") {
      return dp(i - 1, j) || dp(i, j - 1);
    }
    return false;
  }
  return dp(n - 1, m - 1);
};

// Time: Exponential
// Space: O(n + m)

// Recursion + Memoization
var isMatch = function (s, p) {
  const n = s.length,
    m = p.length;
  const memo = {};

  function dp(i, j) {
    const key = `${i}#${j}`;
    if (key in memo) return memo[key];

    if (i < 0 && j < 0) return true;
    if (j < 0 && i >= 0) return false;
    if (i < 0 && j >= 0) {
      for (let k = 0; k < j + 1; k++) {
        if (p[k] !== "*") return false;
      }
      return true;
    }

    if (s[i] === p[j] || p[j] === "?") {
      return (memo[key] = dp(i - 1, j - 1));
    } else if (p[j] === "*") {
      return (memo[key] = dp(i - 1, j) || dp(i, j - 1));
    }
    return (memo[key] = false);
  }
  return dp(n - 1, m - 1);
};

// Time: O(n * m)
// Space: O(n * m)

// Tabulation
var isMatch = function (s, p) {
  const n = s.length,
    m = p.length;

  const dp = [...new Array(n + 1)].map(() => new Array(m + 1).fill(false));

  // i === 0 && j === 0
  dp[0][0] = true;
  // i > 0 && j === 0 (default)
  for (let i = 1; i < n + 1; i++) dp[i][0] = false;
  // i === 0 && j > 0
  for (let j = 1; j < m + 1; j++) {
    let flag = true;
    for (let k = 1; k < j + 1; k++) {
      if (p[k - 1] !== "*") {
        flag = false;
        break;
      }
    }
    dp[0][j] = flag;
  }

  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < m + 1; j++) {
      if (s[i - 1] === p[j - 1] || p[j - 1] === "?") {
        dp[i][j] = dp[i - 1][j - 1];
      } else if (p[j - 1] === "*") {
        dp[i][j] = dp[i - 1][j] || dp[i][j - 1];
      } else {
        dp[i][j] = false;
      }
    }
  }
  return dp[n][m];
};

// Time: O(n * m)
// Space: O(n * m)

// Tabulation - Optimized
var isMatch = function (s, p) {
  const n = s.length,
    m = p.length;

  let dp = new Array(m + 1).fill(false);

  // i === 0 && j === 0
  dp[0] = true;
  // i === 0 && j > 0
  for (let j = 1; j < m + 1; j++) {
    let flag = true;
    for (let k = 1; k < j + 1; k++) {
      if (p[k - 1] !== "*") {
        flag = false;
        break;
      }
    }
    dp[j] = flag;
  }

  for (let i = 1; i < n + 1; i++) {
    let temp = new Array(m + 1).fill(false);
    // i > 0 && j === 0 (default)
    temp[0] = false;
    for (let j = 1; j < m + 1; j++) {
      if (s[i - 1] === p[j - 1] || p[j - 1] === "?") {
        temp[j] = dp[j - 1];
      } else if (p[j - 1] === "*") {
        temp[j] = dp[j] || temp[j - 1];
      } else {
        temp[j] = false;
      }
    }
    dp = temp;
  }
  return dp[m];
};

// Time: O(n * m)
// Space: O(m)
