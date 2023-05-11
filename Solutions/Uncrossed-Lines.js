/**
Solution - LCS Pattern
https://leetcode.com/problems/uncrossed-lines/solutions/3510582/js-lcs-pattern-recursion-memo-tabulation-space-optimization/?orderBy=newest_to_oldest
 */
// Recursion [TLE]
var maxUncrossedLines = function (nums1, nums2) {
  const n = nums1.length,
    m = nums2.length;

  function dp(i, j) {
    if (i === n || j === m) return 0;

    if (nums1[i] === nums2[j]) {
      return 1 + dp(i + 1, j + 1);
    } else {
      return Math.max(dp(i + 1, j), dp(i, j + 1));
    }
  }
  return dp(0, 0);
};
// TC: Exponential
// SC: O(n + m)

// Recursion + Memoization
var maxUncrossedLines = function (nums1, nums2) {
  const n = nums1.length,
    m = nums2.length;
  const memo = [...new Array(n)].map(() => new Array(m).fill(-1));

  function dp(i, j) {
    if (i === n || j === m) return 0;

    if (memo[i][j] !== -1) return memo[i][j];

    if (nums1[i] === nums2[j]) {
      return (memo[i][j] = 1 + dp(i + 1, j + 1));
    } else {
      return (memo[i][j] = Math.max(dp(i + 1, j), dp(i, j + 1)));
    }
  }
  return dp(0, 0);
};
// TC: O(nm)
// SC: O(nm)

// Tabulation
var maxUncrossedLines = function (nums1, nums2) {
  const n = nums1.length,
    m = nums2.length;
  const dp = [...new Array(n + 1)].map(() => new Array(m + 1).fill(0));

  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      if (nums1[i] === nums2[j]) {
        dp[i][j] = 1 + dp[i + 1][j + 1];
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
  }
  return dp[0][0];
};
// TC: O(nm)
// SC: O(nm)

// Tabulation - Space optimized
var maxUncrossedLines = function (nums1, nums2) {
  const n = nums1.length,
    m = nums2.length;
  let dp = new Array(m + 1).fill(0);

  for (let i = n - 1; i >= 0; i--) {
    let temp = new Array(m + 1).fill(0);
    for (let j = m - 1; j >= 0; j--) {
      if (nums1[i] === nums2[j]) {
        temp[j] = 1 + dp[j + 1];
      } else {
        temp[j] = Math.max(dp[j], temp[j + 1]);
      }
    }
    dp = temp;
  }
  return dp[0];
};
// TC: O(nm)
// SC: O(m)
