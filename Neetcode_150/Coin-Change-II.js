/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
// Recrusion
var change = function (amount, coins) {
  const N = coins.length;

  function dp(i, j) {
    if (i === 0) {
      // because we can use 0th index coin infinite number of times
      if (j % coins[0] === 0) return 1;
      else return 0;
    }

    let notTake = dp(i - 1, j);
    let take = 0;
    if (coins[i] <= j) take = dp(i, j - coins[i]);
    return take + notTake;
  }
  return dp(N - 1, amount);
};

// Time: O(2^n)
// Space: O(amount)

// Recursion + Memoization
var change = function (amount, coins) {
  const N = coins.length;
  const memo = {};

  function dp(i, j) {
    const key = `${i}#${j}`;
    if (key in memo) return memo[key];

    if (i === 0) {
      // because we can use 0th index coin infinite number of times
      if (j % coins[0] === 0) return 1;
      else return 0;
    }

    let notTake = dp(i - 1, j);
    let take = 0;
    if (coins[i] <= j) take = dp(i, j - coins[i]);
    return (memo[key] = take + notTake);
  }
  return dp(N - 1, amount);
};

// Time: O(n * amount)
// Space: O(n * amount)

// Tabulation
var change = function (amount, coins) {
  const N = coins.length;

  const dp = [...new Array(N)].map(() => new Array(amount + 1).fill(0));
  for (let i = 0; i < amount + 1; i++) {
    if (i % coins[0] === 0) dp[0][i] = 1;
  }

  for (let i = 1; i < N; i++) {
    for (let j = 0; j < amount + 1; j++) {
      let notTake = dp[i - 1][j];
      let take = 0;
      if (coins[i] <= j) take = dp[i][j - coins[i]];
      dp[i][j] = take + notTake;
    }
  }
  return dp[N - 1][amount];
};

// Time: O(n * amount)
// Space: O(n * amount)

// Tabulation - Optimized
var change = function (amount, coins) {
  const N = coins.length;

  let dp = new Array(amount + 1).fill(0);
  for (let i = 0; i < amount + 1; i++) {
    if (i % coins[0] === 0) dp[i] = 1;
  }

  for (let i = 1; i < N; i++) {
    let temp = new Array(amount + 1).fill(0);
    for (let j = 0; j < amount + 1; j++) {
      let notTake = dp[j];
      let take = 0;
      if (coins[i] <= j) take = temp[j - coins[i]];
      temp[j] = take + notTake;
    }
    dp = temp;
  }
  return dp[amount];
};

// Time: O(n * amount)
// Space: O(amount)

// Neetcode
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
