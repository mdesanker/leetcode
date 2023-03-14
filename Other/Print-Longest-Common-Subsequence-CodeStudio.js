/**
Print longest common subsequence
 */

// Recursion
var longestCommonSubsequence = function (text1, text2) {
  const n = text1.length,
    m = text2.length;

  function dp(i, j) {
    if (i < 0 || j < 0) return "";

    if (text1[i] === text2[j]) {
      return dp(i - 1, j - 1) + text1[i];
    }
    let one = dp(i - 1, j),
      two = dp(i, j - 1);
    return one.length > two.length ? one : two;
  }
  return dp(n - 1, m - 1);
};

// Time: O(2^n)
// Space: O(n)

// Recursion + Memoization
var longestCommonSubsequence = function (text1, text2) {
  const n = text1.length,
    m = text2.length;
  const memo = {};

  function dp(i, j) {
    const key = `${i}#${j}`;
    if (key in memo) return memo[key];

    if (i < 0 || j < 0) return "";

    if (text1[i] === text2[j]) {
      return (memo[key] = dp(i - 1, j - 1) + text1[i]);
    }
    let one = dp(i - 1, j),
      two = dp(i, j - 1);
    return (memo[key] = one.length > two.length ? one : two);
  }
  return dp(n - 1, m - 1);
};

// Time: O(n * m)
// Space: O(n * m)

// Tabulation
var longestCommonSubsequence = function (text1, text2) {
  const n = text1.length,
    m = text2.length;

  const dp = [...new Array(n + 1)].map(() => new Array(m + 1).fill(""));

  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < m + 1; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + text1[i - 1];
      } else {
        let one = dp[i - 1][j],
          two = dp[i][j - 1];
        dp[i][j] = one.length > two.length ? one : two;
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

  let dp = new Array(m + 1).fill("");

  for (let i = 1; i < n + 1; i++) {
    let temp = new Array(m + 1).fill("");
    for (let j = 1; j < m + 1; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        temp[j] = dp[j - 1] + text1[i - 1];
      } else {
        let one = dp[j],
          two = temp[j - 1];
        temp[j] = one.length > two.length ? one : two;
      }
    }
    dp = temp;
  }
  return dp[m];
};

// Time: O(n * m)
// Space: O(m)

console.log(longestCommonSubsequence("abcde", "ace"));
