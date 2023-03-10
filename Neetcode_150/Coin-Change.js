/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
/**
Brute force
Enumerate all subsets of coin frequencies that satisfy amount, compute sums, and return the minimum
 */

// Recursion
var coinChange = function (coins, amount) {
  function dp(amt) {
    if (amt === 0) return 0;
    if (amt < 0) return -1;

    let count = Infinity;
    for (let coin of coins) {
      let res = dp(amt - coin);
      if (res !== -1) count = Math.min(count, res + 1);
    }
    return count === Infinity ? -1 : count;
  }
  return dp(amount);
};

// Time: O(s^n) s is amount, and n length of coins array
// Space: O(n)

// Recursion + Memoization
var coinChange = function (coins, amount) {
  const memo = {};

  function dp(amt) {
    if (amt in memo) return memo[amt];

    if (amt === 0) return 0;
    if (amt < 0) return -1;

    let count = Infinity;
    for (let coin of coins) {
      let res = dp(amt - coin);
      if (res !== -1) count = Math.min(count, res + 1);
    }
    return (memo[amt] = count === Infinity ? -1 : count);
  }
  return dp(amount);
};

// Time: O(s * n) s is amount, and n length of coins array
// Space: O(n)

// Tabulation
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
