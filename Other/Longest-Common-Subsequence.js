// https://leetcode.com/problems/longest-common-subsequence/solutions/598743/javascript-solution/
// https://leetcode.com/problems/longest-common-subsequence/solutions/348884/c-with-picture-o-nm/

/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
  const dp = [];
  let m = text1.length;
  let n = text2.length;

  for (let i = 0; i <= m; i++) {
    dp[i] = new Array(n + 1).fill(0);
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      // two  possible scenarioes:
      // 1. the current char of text1 and text2 does not match
      // 2. the current char of text1 and text2 matches
      if (text1.charAt(i - 1) !== text2.charAt(j - 1)) {
        // check left and top for longer subsequence length
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      } else {
        // check diag for prev longest subsequence length and add 1
        dp[i][j] = dp[i - 1][j - 1] + 1;
      }
    }
  }
  return dp[m][n];
};

// Time: O(m * n) where m and n are length of text1 and text2
// Space: O(m * n)
