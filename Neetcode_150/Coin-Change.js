/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (const coin of coins) {
    for (let i = coin; i < amount + 1; i++) {
      dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
    }
  }
  return dp[amount] !== Infinity ? dp[amount] : -1;
};

// n = coins.length
// m = amount

// Time: O(n * m) for each coin, we iterate through whole amount
// Space: O(m) dp table is length amount + 1
