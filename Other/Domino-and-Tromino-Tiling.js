// https://leetcode.com/problems/domino-and-tromino-tiling/solutions/116581/detail-and-explanation-of-o-n-solution-why-dp-n-2-d-n-1-dp-n-3/?orderBy=most_votes

/**
 * @param {number} n
 * @return {number}
 */
var numTilings = function (n) {
  const MOD = Math.pow(10, 9) + 7;
  const dp = {};
  dp[1] = 1;
  dp[2] = 2;
  dp[3] = 5;
  for (let i = 4; i <= n; i++) {
    dp[i] = (2 * dp[i - 1] + dp[i - 3]) % MOD;
  }
  return dp[n];
};

// Time: O(n)
// Space: O(n)
