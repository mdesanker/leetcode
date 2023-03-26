/**
 * @param {number[]} prices
 * @return {number}
 */
// Dynamic Programming
// considered DP because we solve subproblems until we reach end of the array
var maxProfit = function (prices) {
  let min = prices[0],
    profit = 0;
  for (let i = 1; i < prices.length; i++) {
    let cost = prices[i] - min;
    profit = Math.max(profit, cost);
    min = Math.min(min, prices[i]);
  }
  return profit;
};
// Time: O(n)
// Space: O(1)

// Recursion
var maxProfit = function (prices) {
  const n = prices.length;
  function dp(i, buy, cap) {
    if (i === n || cap === 0) return 0;
    if (buy === 1) {
      return Math.max(-prices[i] + dp(i + 1, 0, cap), dp(i + 1, 1, cap));
    } else {
      return Math.max(prices[i] + dp(i + 1, 1, cap - 1), dp(i + 1, 0, cap));
    }
  }
  return dp(0, 1, 1);
};
// Time: O(2^n)
// Space: O(n)

// Recursion + Memoization
var maxProfit = function (prices) {
  const n = prices.length;
  const memo = [...new Array(n)].map(() =>
    [...new Array(2)].map(() => new Array(2).fill(-1))
  );
  function dp(i, buy, cap) {
    if (i === n || cap === 0) return 0;
    if (memo[i][buy][cap] !== -1) return memo[i][buy][cap];
    if (buy === 1) {
      return (memo[i][buy][cap] = Math.max(
        -prices[i] + dp(i + 1, 0, cap),
        dp(i + 1, 1, cap)
      ));
    } else {
      return (memo[i][buy][cap] = Math.max(
        prices[i] + dp(i + 1, 1, cap - 1),
        dp(i + 1, 0, cap)
      ));
    }
  }
  return dp(0, 1, 1);
};
// Time: O(n * 2 * 1)
// Space: O(n * 2 * 1 + n)

// Tabulation
var maxProfit = function (prices) {
  const n = prices.length;
  const dp = [...new Array(n + 1)].map(() =>
    [...new Array(2)].map(() => new Array(2).fill(0))
  );

  for (let i = n - 1; i >= 0; i--) {
    for (let cap = 1; cap <= 1; cap++) {
      dp[i][1][cap] = Math.max(
        -prices[i] + dp[i + 1][0][cap],
        dp[i + 1][1][cap]
      );
      dp[i][0][cap] = Math.max(
        prices[i] + dp[i + 1][1][cap - 1],
        dp[i + 1][0][cap]
      );
    }
  }
  return dp[0][1][1];
};
// Time: O(n * 2 * 1)
// Space: O(n * 2 * 1)

// Tabulation - Optimized
var maxProfit = function (prices) {
  const n = prices.length;
  let dp = [...new Array(2)].map(() => new Array(2).fill(0));

  for (let i = n - 1; i >= 0; i--) {
    let temp = [...new Array(2)].map(() => new Array(2).fill(0));
    for (let cap = 1; cap <= 1; cap++) {
      temp[1][cap] = Math.max(-prices[i] + dp[0][cap], dp[1][cap]);
      temp[0][cap] = Math.max(prices[i] + dp[1][cap - 1], dp[0][cap]);
    }
    dp = temp;
  }
  return dp[1][1];
};
// Time: O(n * 2 * 1)
// Space: O(2 * 1)
