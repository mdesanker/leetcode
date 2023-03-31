/**
https://www.codingninjas.com/codestudio/problems/longest-common-substring_1235207

Return length of longest common substring - characters in same order and in continuous fashion
 */
// Recursion
// Recursive solutions will not work for this problem because we ne to check for the maximum value along the diagonal
var longestCommonSubstring = function (str1, str2) {
  const n = str1.length,
    m = str2.length;

  function dp(i, j) {
    if (i < 0 || j < 0) return 0;

    if (str1[i] === str2[j]) {
      return 1 + dp(i - 1, j - 1);
    }
    return 0;
  }
  return dp(n - 1, m - 1);
};

// Time: O(2^(n + m))
// Space: O(n + m)

// Recursion + Memoization
// Recursive solutions will not work for this problem because we ne to check for the maximum value along the diagonal
var longestCommonSubstring = function (str1, str2) {
  const n = str1.length,
    m = str2.length;
  const memo = {};

  function dp(i, j) {
    const key = `${i}#${j}`;
    if (key in memo) return memo[key];

    if (i < 0 || j < 0) return 0;

    if (str1[i] === str2[j]) {
      return (memo[key] = 1 + dp(i - 1, j - 1));
    }
    return (memo[key] = 0);
  }
  return dp(n - 1, m - 1);
};

// Time: O(n * m)
// Space: O(n * m)

console.log(longestCommonSubstring("abcjklp", "acjkp")); // 3 - "cjk"

// Tabulation
var longestCommonSubstring = function (str1, str2) {
  const n = str1.length,
    m = str2.length;

  const dp = [...new Array(n + 1)].map(() => new Array(m + 1).fill(0));

  let max = 0;
  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < m + 1; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
        max = Math.max(max, dp[i][j]);
      }
    }
  }
  return max;
};

// Time: O(n * m)
// Space: O(n * m)

// Tabulation -- Optimized
var longestCommonSubstring = function (str1, str2) {
  const n = str1.length,
    m = str2.length;

  let dp = new Array(m + 1).fill(0);

  let max = 0;
  for (let i = 1; i < n + 1; i++) {
    let temp = new Array(m + 1).fill(0);
    for (let j = 1; j < m + 1; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        temp[j] = 1 + dp[j - 1];
        max = Math.max(max, temp[j]);
      }
    }
    dp = temp;
  }
  return max;
};

// Time: O(n * m)
// Space: O(m)

console.log(longestCommonSubstring("abcjklp", "acjkp")); // 3 - "cjk"
