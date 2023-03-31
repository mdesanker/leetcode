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
  const N = coins.length;

  function dp(i, sum) {
    if (i === 0) {
      if (sum % coins[i] === 0) return Math.floor(sum / coins[i]);
      else return Infinity;
    }

    let notTake = dp(i - 1, sum);
    let take = Infinity;
    if (coins[i] <= sum) take = 1 + dp(i, sum - coins[i]);
    return Math.min(take, notTake);
  }
  const res = dp(N - 1, amount);
  return res === Infinity ? -1 : res;
};

// Time: O(2^n)
// Space: O(amount) assuming smallest denomination is 1, there will be a recursive call the length of amount

// Recursion + Memoization
var coinChange = function (coins, amount) {
  const N = coins.length;
  const memo = {};

  function dp(i, sum) {
    const key = `${i}#${sum}`;
    if (key in memo) return memo[key];

    if (i === 0) {
      if (sum % coins[i] === 0) return Math.floor(sum / coins[i]);
      else return Infinity;
    }

    let notTake = dp(i - 1, sum);
    let take = Infinity;
    if (coins[i] <= sum) take = 1 + dp(i, sum - coins[i]);
    return (memo[key] = Math.min(take, notTake));
  }
  const res = dp(N - 1, amount);
  return res === Infinity ? -1 : res;
};

// Time: O(n * amount)
// Space: O(n * amount)

// Tabulation
var coinChange = function (coins, amount) {
  const N = coins.length;

  const dp = [...new Array(N)].map(() => new Array(amount + 1).fill(Infinity));

  for (let i = 0; i < amount + 1; i++) {
    if (i % coins[0] === 0) dp[0][i] = Math.floor(i / coins[0]);
  }

  for (let i = 1; i < N; i++) {
    for (let j = 0; j < amount + 1; j++) {
      let notTake = dp[i - 1][j];
      let take = Infinity;
      if (coins[i] <= j) take = 1 + dp[i][j - coins[i]];
      dp[i][j] = Math.min(take, notTake);
    }
  }

  console.log(dp);
  return dp[N - 1][amount] === Infinity ? -1 : dp[N - 1][amount];
};

// Time: O(n * amount)
// Space: O(n * amount)

// Tabulation - Optimized
var coinChange = function (coins, amount) {
  const N = coins.length;

  let dp = new Array(amount + 1).fill(Infinity);

  for (let i = 0; i < amount + 1; i++) {
    if (i % coins[0] === 0) dp[i] = Math.floor(i / coins[0]);
  }

  for (let i = 1; i < N; i++) {
    let temp = new Array(amount + 1).fill(Infinity);
    for (let j = 0; j < amount + 1; j++) {
      let notTake = dp[j];
      let take = Infinity;
      if (coins[i] <= j) take = 1 + temp[j - coins[i]];
      temp[j] = Math.min(take, notTake);
    }
    dp = temp;
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
};

// Time: O(n * amount)
// Space: O(amount)

//////////////////////////////////////////////////////////////////////
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
