/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
// Recursion
var minDistance = function (word1, word2) {
  const n = word1.length,
    m = word2.length;

  function dp(i, j) {
    if (i < 0 || j < 0) return 0;

    if (word1[i] === word2[j]) {
      return 1 + dp(i - 1, j - 1);
    } else {
      return Math.max(dp(i - 1, j), dp(i, j - 1));
    }
  }
  const len = dp(n - 1, m - 1);
  return n - len + m - len;
};

// Time: O(2^(n + m))
// Space: O(n + m)

// Recursion + Memoization
var minDistance = function (word1, word2) {
  const n = word1.length,
    m = word2.length;
  const memo = {};

  function dp(i, j) {
    const key = `${i}#${j}`;
    if (key in memo) return memo[key];

    if (i < 0 || j < 0) return 0;

    if (word1[i] === word2[j]) {
      return (memo[key] = 1 + dp(i - 1, j - 1));
    } else {
      return (memo[key] = Math.max(dp(i - 1, j), dp(i, j - 1)));
    }
  }
  const len = dp(n - 1, m - 1);
  return n - len + m - len;
};

// Time: O(n * m)
// Space: O(n * m)

// Tabulation
var minDistance = function (word1, word2) {
  const n = word1.length,
    m = word2.length;

  const dp = [...new Array(n + 1)].map(() => new Array(m + 1).fill(0));

  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < m + 1; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return n - dp[n][m] + m - dp[n][m];
};

// Time: O(n * m)
// Space: O(n * m)

// Tabulation - Optimized
var minDistance = function (word1, word2) {
  const n = word1.length,
    m = word2.length;

  let dp = new Array(m + 1).fill(0);

  for (let i = 1; i < n + 1; i++) {
    let temp = new Array(m + 1).fill(0);
    for (let j = 1; j < m + 1; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        temp[j] = 1 + dp[j - 1];
      } else {
        temp[j] = Math.max(dp[j], temp[j - 1]);
      }
    }
    dp = temp;
  }
  return n - dp[m] + m - dp[m];
};

// Time: O(n * m)
// Space: O(m)
