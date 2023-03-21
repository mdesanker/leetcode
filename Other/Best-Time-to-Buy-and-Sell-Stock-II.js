/**
 * @param {number[]} prices
 * @return {number}
 */
// Recursion
var maxProfit = function (prices) {
  const n = prices.length;
  // must know whether or not you have already bought something
  function dp(i, buy) {
    // base case
    if (i === n) return 0;

    if (buy === 1) {
      // can either buy or not buy
      return Math.max(-prices[i] + dp(i + 1, 0), dp(i + 1, 1));
    } else {
      // can either sell or not sell
      return Math.max(prices[i] + dp(i + 1, 1), dp(i + 1, 0));
    }
  }
  return dp(0, 1);
};
// Time: O(2^n) two choices for every day
// Space: O(n)

// Recursion + Memoization
var maxProfit = function (prices) {
  const n = prices.length;
  const memo = {};

  // must know whether or not you have already bought something
  function dp(i, buy) {
    const key = `${i}#${buy}`;
    if (key in memo) return memo[key];

    // base case
    if (i === n) return 0;

    if (buy === 1) {
      // can either buy or not buy
      return (memo[key] = Math.max(-prices[i] + dp(i + 1, 0), dp(i + 1, 1)));
    } else {
      // can either sell or not sell
      return (memo[key] = Math.max(prices[i] + dp(i + 1, 1), dp(i + 1, 0)));
    }
  }
  return dp(0, 1);
};
// Time: O(2n) two choices for every day
// Space: O(2n + n)

// Tabulation
var maxProfit = function (prices) {
  const n = prices.length;
  const dp = [...new Array(n + 1)].map(() => new Array(2).fill(0));
  // if (i === n) return 0;
  dp[n][0] = dp[n][1] = 0;

  for (let i = n - 1; i >= 0; i--) {
    for (let j = 0; j < 2; j++) {
      if (j === 1) {
        dp[i][j] = Math.max(-prices[i] + dp[i + 1][0], dp[i + 1][1]);
      } else {
        dp[i][j] = Math.max(prices[i] + dp[i + 1][1], dp[i + 1][0]);
      }
    }
  }
  return dp[0][1];
};
// Time: O(2n)
// Space: O(2n)

// Tabulation (Arrays) - Space optimized
var maxProfit = function (prices) {
  const n = prices.length;

  let dp = new Array(2).fill(0);
  // if (i === n) return 0;
  dp[0] = dp[1] = 0;

  for (let i = n - 1; i >= 0; i--) {
    let temp = new Array(2).fill(0);
    for (let j = 0; j < 2; j++) {
      if (j === 1) {
        temp[j] = Math.max(-prices[i] + dp[0], dp[1]);
      } else {
        temp[j] = Math.max(prices[i] + dp[1], dp[0]);
      }
    }
    dp = temp;
  }
  return dp[1];
};
// Time: O(2n)
// Space: O(4)

// Tabulation (Variables) - Space optimized
var maxProfit = function (prices) {
  const n = prices.length;

  // use 4 variables instead of 2 arrays of 2
  let dpBuy = (dpSell = 0);
  let tempBuy = (tempSell = 0);

  for (let i = n - 1; i >= 0; i--) {
    tempBuy = Math.max(-prices[i] + dpSell, dpBuy);
    tempSell = Math.max(prices[i] + dpBuy, dpSell);

    dpBuy = tempBuy;
    dpSell = tempSell;
  }
  return dpBuy;
};
// Time: O(n)
// Space: O(4)
