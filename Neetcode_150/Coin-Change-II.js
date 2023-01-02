/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */

// https://leetcode.com/problems/coin-change-ii/solutions/675089/python-js-go-c-o-cn-dp-unbounded-knapsack-w-visualization/?orderBy=most_votes&languageTags=javascript

var change = function (amount, coins) {
  // Unbounded knapsack problem
  const dp = new Array(amount + 1).fill(0);
  // there is 1 way to create amount 0 with any coins
  dp[0] = 1;

  // iterate through every coin updating dp
  for (let coin of coins) {
    for (let i = coin; i < amount + 1; i++) {
      // current cell = current amount + current amount - coin
      dp[i] = dp[i] + dp[i - coin];
    }
  }
  // return last cell
  return dp[amount];
};

// m = coins.length
// n = amount

// Time: O(m * n)
// Space: O(n)

/**
 * Brute force
 * Time: O(m^n) m = coins.length, n = amount
 */
