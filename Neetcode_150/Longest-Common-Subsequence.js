/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
// Recursion
var longestCommonSubsequence = function (text1, text2) {
  const n = text1.length,
    m = text2.length;
  const memo = {};
  function dp(i, j) {
    const key = `${i}#${j}`;
    if (key in memo) return memo[key];

    // base case
    // negative index means one string is finished
    if (i < 0 || j < 0) {
      return 0;
    }

    // match case
    if (text1[i] === text2[j]) {
      return (memo[key] = 1 + dp(i - 1, j - 1));
    }
    // no match case
    return (memo[key] = Math.max(dp(i - 1, j), dp(i, j - 1)));
  }
  return dp(n - 1, m - 1);
};

// Time: O(2^(n + m))
// Space: O(n + m)

// Recursion + Memoization
var longestCommonSubsequence = function (text1, text2) {
  const n = text1.length,
    m = text2.length;
  const memo = {};
  function dp(i, j) {
    const key = `${i}#${j}`;
    if (key in memo) return memo[key];

    // base case
    // negative index means one string is finished
    if (i < 0 || j < 0) {
      return 0;
    }

    // match case
    if (text1[i] === text2[j]) {
      return (memo[key] = 1 + dp(i - 1, j - 1));
    }
    // no match case
    return (memo[key] = Math.max(dp(i - 1, j), dp(i, j - 1)));
  }
  return dp(n - 1, m - 1);
};

// Time: O(n * m)
// Space: O(n * m)

// Tabulation
var longestCommonSubsequence = function (text1, text2) {
  const n = text1.length,
    m = text2.length;

  const dp = [...new Array(n + 1)].map(() => new Array(m + 1).fill(0));

  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < m + 1; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[n][m];
};

// Time: O(n * m)
// Space: O(n * m)

// Tabulation - Optimized
var longestCommonSubsequence = function (text1, text2) {
  const n = text1.length,
    m = text2.length;

  let dp = new Array(m + 1).fill(0);

  for (let i = 1; i < n + 1; i++) {
    let temp = new Array(m + 1).fill(0);
    for (let j = 1; j < m + 1; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        temp[j] = 1 + dp[j - 1];
      } else {
        temp[j] = Math.max(dp[j], temp[j - 1]);
      }
    }
    dp = temp;
  }
  return dp[m];
};

// Time: O(n * m)
// Space: O(m)
