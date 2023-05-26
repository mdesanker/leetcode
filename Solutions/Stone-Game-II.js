/**
 * @param {number[]} piles
 * @return {number}
 */
var stoneGameII = function (piles) {
  const n = piles.length;

  const dp = [...new Array(n + 1)].map(() => new Array(n + 1).fill(0));

  const suffixSum = new Array(n + 1).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    suffixSum[i] = suffixSum[i + 1] + piles[i];
  }

  for (let i = 0; i <= n; i++) {
    dp[i][n] = suffixSum[i];
  }

  for (let i = n - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      for (let x = 1; x <= 2 * j && i + x <= n; x++) {
        dp[i][j] = Math.max(dp[i][j], suffixSum[i] - dp[i + x][Math.max(j, x)]);
      }
    }
  }
  return dp[0][1];
};
// TC: O(n^3)
// SC: O(n^2)
