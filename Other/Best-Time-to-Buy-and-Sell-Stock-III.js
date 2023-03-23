/**
 * @param {number[]} prices
 * @return {number}
 */
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
  return dp(0, 1, 2);
};
// Time: O(2^n)
// Space: O(n)

// Recursion + Memoization
var maxProfit = function (prices) {
  const n = prices.length;
  const memo = {};

  function dp(i, buy, cap) {
    const key = `${i}#${buy}#${cap}`;
    if (key in memo) return memo[key];

    if (i === n || cap === 0) return 0;

    if (buy === 1) {
      return (memo[key] = Math.max(
        -prices[i] + dp(i + 1, 0, cap),
        dp(i + 1, 1, cap)
      ));
    } else {
      return (memo[key] = Math.max(
        prices[i] + dp(i + 1, 1, cap - 1),
        dp(i + 1, 0, cap)
      ));
    }
  }
  return dp(0, 1, 2);
};
// Time: O(n * 2 * 3)
// Space: O(n * 2 * 3 + n)

// Tabulation
var maxProfit = function (prices) {
  const n = prices.length;

  const dp = [...new Array(n + 1)].map(() =>
    [...new Array(2)].map(() => new Array(3).fill(0))
  );

  for (let i = n - 1; i >= 0; i--) {
    for (let buy = 0; buy < 2; buy++) {
      for (let cap = 1; cap <= 2; cap++) {
        if (buy === 1) {
          dp[i][buy][cap] = Math.max(
            -prices[i] + dp[i + 1][0][cap],
            dp[i + 1][1][cap]
          );
        } else {
          dp[i][buy][cap] = Math.max(
            prices[i] + dp[i + 1][1][cap - 1],
            dp[i + 1][0][cap]
          );
        }
      }
    }
  }
  return dp[0][1][2];
};

var maxProfit = function (prices) {
  const n = prices.length;

  const dp = [...new Array(n + 1)].map(() =>
    [...new Array(2)].map(() => new Array(3).fill(0))
  );

  for (let i = n - 1; i >= 0; i--) {
    for (let cap = 1; cap <= 2; cap++) {
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
  return dp[0][1][2];
};
// Time: O(n * 2 * 3)
// Space: O(n * 2 * 3)

// Tabulation - Optimized
var maxProfit = function (prices) {
  const n = prices.length;

  let dp = [...new Array(2)].map(() => new Array(3).fill(0));

  for (let i = n - 1; i >= 0; i--) {
    let temp = [...new Array(2)].map(() => new Array(3).fill(0));
    for (let buy = 0; buy < 2; buy++) {
      for (let cap = 1; cap <= 2; cap++) {
        if (buy === 1) {
          temp[buy][cap] = Math.max(-prices[i] + dp[0][cap], dp[1][cap]);
        } else {
          temp[buy][cap] = Math.max(prices[i] + dp[1][cap - 1], dp[0][cap]);
        }
      }
    }
    dp = temp;
  }
  return dp[1][2];
};

var maxProfit = function (prices) {
  const n = prices.length;

  let dp = [...new Array(2)].map(() => new Array(3).fill(0));

  for (let i = n - 1; i >= 0; i--) {
    let temp = [...new Array(2)].map(() => new Array(3).fill(0));
    for (let cap = 1; cap <= 2; cap++) {
      temp[1][cap] = Math.max(-prices[i] + dp[0][cap], dp[1][cap]);
      temp[0][cap] = Math.max(prices[i] + dp[1][cap - 1], dp[0][cap]);
    }
    dp = temp;
  }
  return dp[1][2];
};
// Time: O(n * 2 * 3)
// Space: O(2 * 3)
