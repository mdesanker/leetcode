/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
// Recursion
var maxProfit = function (prices, fee) {
  const n = prices.length;

  function dp(i, buy) {
    if (i === n) return 0;

    if (buy === 1) {
      return Math.max(-prices[i] + dp(i + 1, 0), dp(i + 1, 1));
    } else {
      return Math.max(prices[i] - fee + dp(i + 1, 1), dp(i + 1, 0));
    }
  }
  return dp(0, 1);
};
// Time: O(2^n)
// Space: O(n)

// Recursion + Memoization
var maxProfit = function (prices, fee) {
  const n = prices.length;
  const memo = {};

  function dp(i, buy) {
    const key = `${i}#${buy}`;
    if (key in memo) return memo[key];

    if (i === n) return 0;

    if (buy === 1) {
      return (memo[key] = Math.max(-prices[i] + dp(i + 1, 0), dp(i + 1, 1)));
    } else {
      return (memo[key] = Math.max(
        prices[i] - fee + dp(i + 1, 1),
        dp(i + 1, 0)
      ));
    }
  }
  return dp(0, 1);
};
// Time: O(n * 2)
// Space: O(n * 2 + n)

// Tabulation
var maxProfit = function (prices, fee) {
  const n = prices.length;

  const dp = [...new Array(n + 1)].map(() => new Array(2).fill(0));

  for (let i = n - 1; i >= 0; i--) {
    dp[i][1] = Math.max(-prices[i] + dp[i + 1][0], dp[i + 1][1]);
    dp[i][0] = Math.max(prices[i] - fee + dp[i + 1][1], dp[i + 1][0]);
  }
  return dp[0][1];
};
// Time: O(n * 2)
// Space: O(n * 2)

// Tabulation (Array) - Optimized
var maxProfit = function (prices, fee) {
  const n = prices.length;

  let dp = new Array(2).fill(0);

  for (let i = n - 1; i >= 0; i--) {
    let temp = new Array(2).fill(0);
    temp[1] = Math.max(-prices[i] + dp[0], dp[1]);
    temp[0] = Math.max(prices[i] - fee + dp[1], dp[0]);
    dp = temp;
  }
  return dp[1];
};
// Time: O(n * 2)
// Space: O(2)

// Tabulation (Variables) - Optimized
var maxProfit = function (prices, fee) {
  const n = prices.length;

  let dpBuy = (dpSell = 0);

  for (let i = n - 1; i >= 0; i--) {
    dpBuy = Math.max(-prices[i] + dpSell, dpBuy);
    dpSell = Math.max(prices[i] - fee + dpBuy, dpSell);
  }
  return dpBuy;
};
// Time: O(n * 2)
// Space: O(2)
