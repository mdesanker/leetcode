/**
https://www.codingninjas.com/codestudio/problems/0-1-knapsack_920542

 */

// Recursion
var knapsack = function (wt, val, cap) {
  const N = wt.length;

  // i = index, W = capacity
  function dp(i, W) {
    if (i === 0) {
      if (wt[0] <= W) return val[0];
      else return 0;
    }

    let notTake = dp(i - 1, W);
    let take = -Infinity;
    // can only take if weight of this item is <= remaining capacity
    if (wt[i] <= W) take = val[i] + dp(i - 1, W - wt[i]);
    return Math.max(take, notTake);
  }
  return dp(N - 1, cap);
};

// Time: O(2^n)
// Space: O(n)

// Recursion + Memoization
var knapsack = function (wt, val, cap) {
  const N = wt.length;
  const memo = {};

  // i = index, W = capacity
  function dp(i, W) {
    const key = `${i}#${W}`;
    if (key in memo) return memo[key];

    if (i === 0) {
      if (wt[0] <= W) return val[0];
      else return 0;
    }

    let notTake = dp(i - 1, W);
    let take = -Infinity;
    // can only take if weight of this item is <= remaining capacity
    if (wt[i] <= W) take = val[i] + dp(i - 1, W - wt[i]);
    return (memo[key] = Math.max(take, notTake));
  }
  return dp(N - 1, cap);
};

// Time: O(n * cap)
// Space: O(n * cap)

console.log(knapsack([1, 2, 4, 5], [5, 4, 8, 6], 5)); // 13
console.log(knapsack([3, 2, 5], [30, 40, 60], 6)); // 70

// Tabulation
var knapsack = function (wt, val, W) {
  const N = wt.length;

  const dp = [...new Array(N)].map(() => new Array(W + 1).fill(0));

  // base case
  // if capacity is greater than w[0], it can be taken (val[0])
  for (let i = 0; i < W + 1; i++) if (i >= wt[0]) dp[0][i] = val[0];

  for (let i = 1; i < N; i++) {
    for (let j = 0; j < W + 1; j++) {
      let notTake = dp[i - 1][j];
      let take = -Infinity;
      // can only take if weight of this item (wt[i]) is <= capacity (j)
      if (wt[i] <= j) take = val[i] + dp[i - 1][j - wt[i]];
      dp[i][j] = Math.max(take, notTake);
    }
  }
  return dp[N - 1][W];
};

// Time: O(n * W)
// Space: O(n * W)

console.log(knapsack([1, 2, 4, 5], [5, 4, 8, 6], 5)); // 13
console.log(knapsack([3, 2, 5], [30, 40, 60], 6)); // 70

// Tabulation - Optimized
var knapsack = function (wt, val, W) {
  const N = wt.length;

  let dp = new Array(W + 1).fill(0);

  // base case
  // if capacity is greater than w[0], it can be taken (val[0])
  for (let i = 0; i < W + 1; i++) if (i >= wt[0]) dp[i] = val[0];

  for (let i = 1; i < N; i++) {
    let temp = new Array(W + 1).fill(0);
    for (let j = 0; j < W + 1; j++) {
      let notTake = dp[j];
      let take = -Infinity;
      // can only take if weight of this item (wt[i]) is <= capacity (j)
      if (wt[i] <= j) take = val[i] + dp[j - wt[i]];
      temp[j] = Math.max(take, notTake);
    }
    dp = temp;
  }
  return dp[W];
};

// Time: O(n * W)
// Space: O(W)

console.log(knapsack([1, 2, 4, 5], [5, 4, 8, 6], 5)); // 13
console.log(knapsack([3, 2, 5], [30, 40, 60], 6)); // 70
