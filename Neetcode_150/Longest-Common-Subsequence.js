// https://leetcode.com/problems/longest-common-subsequence/solutions/598743/javascript-solution/
// https://leetcode.com/problems/longest-common-subsequence/solutions/348884/c-with-picture-o-nm/

/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
  let m = text1.length;
  let n = text2.length;

  // Tabulation - bototm up
  const dp = [];
  // create 2D matrix with m + 1 and n + 1 as dimensions fill with 0s
  for (let i = 0; i < m + 1; i++) {
    dp[i] = new Array(n + 1).fill(0);
  }

  // iterate backwards through grid
  // if values match, add 1 + diagonal bottom right
  // if values don't match, add max of right or bottom value
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (text1[i] !== text2[j]) {
        // check left and top for longer subsequence length
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
        // 2. the current char of text1 and text2 matches
      } else {
        // check diag for prev longest subsequence length and add 1
        dp[i][j] = 1 + dp[i + 1][j + 1];
      }
    }
  }
  return dp[0][0];
};

// Time: O(m * n) where m and n are length of text1 and text2
// Space: O(m * n)
