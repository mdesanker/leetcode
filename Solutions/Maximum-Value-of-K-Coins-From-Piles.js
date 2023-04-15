/**
Solution - DP (Knapsack)

dp[i][k] = maximum sum of taking k coins from the first i piles

For each pile, try taking from 0 to k of the top coins from it
 */
// Recursion + Memoization
var maxValueOfCoins = function (piles, k) {
  const n = piles.length;
  const memo = [...new Array(n)].map(() => new Array(k + 1).fill(-1));

  function dp(i, k) {
    if (i === n) return 0;
    if (k === 0) return 0;

    if (memo[i][k] !== -1) return memo[i][k];

    let res = 0,
      sum = 0;
    for (let j = 0; j <= Math.min(k, piles[i].length); j++) {
      res = Math.max(res, sum + dp(i + 1, k - j));
      if (j < piles[i].length) sum += piles[i][j];
    }
    return (memo[i][k] = res);
  }
  return dp(0, k);
};
// TC: O(nk^2)
// SC: O(nk)
