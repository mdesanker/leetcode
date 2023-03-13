/**
https://www.codingninjas.com/codestudio/problems/unbounded-knapsack_1215029

Given N items with certain profit[] and weight[] and knapsack with capacity W. Fill knapsack to maximize profit
You can take one item multiple times
 */
// Recursion
var knapsack = function (N, weights, values, capacity) {
  function dp(i, W) {
    // base case
    // will be 0 if weights[0] > W
    if (i === 0) return (W / weights[0]) * values[0];

    let notTake = dp(i - 1, W);
    let take = -Infinity;
    if (weights[i] <= W) take = values[i] + dp(i, W - weights[i]);
    return Math.max(take, notTake);
  }
  return dp(N - 1, capacity);
};

// Time: O(2^n)
// Space: O(W) W is capacity

// Recursion + Memoization
var knapsack = function (N, weights, values, capacity) {
  const memo = {};

  function dp(i, W) {
    const key = `${i}#${W}`;
    if (key in memo) return memo[key];

    // base case
    // will be 0 if weights[0] > W
    if (i === 0) return Math.floor(W / weights[0]) * values[0];

    let notTake = dp(i - 1, W);
    let take = -Infinity;
    if (weights[i] <= W) take = values[i] + dp(i, W - weights[i]);
    return (memo[key] = Math.max(take, notTake));
  }
  return dp(N - 1, capacity);
};

// Time: O(n * W)
// Space: O(n * W)

// Tabulation
var knapsack = function (N, weights, values, capacity) {
  const dp = [...new Array(N)].map(() => new Array(capacity + 1).fill(0));
  for (let i = 0; i < capacity + 1; i++)
    dp[0][i] = Math.floor(i / weights[0]) * values[0];

  for (let i = 1; i < N; i++) {
    for (let j = 0; j < capacity + 1; j++) {
      let notTake = dp[i - 1][j];
      let take = -Infinity;
      if (weights[i] <= j) take = values[i] + dp[i][j - weights[i]];
      dp[i][j] = Math.max(take, notTake);
    }
  }
  return dp[N - 1][capacity];
};

// Time: O(n * W)
// Space: O(n * W)

// Tabulation - Optimized
var knapsack = function (N, weights, values, capacity) {
  let dp = new Array(capacity + 1).fill(0);
  for (let i = 0; i < capacity + 1; i++)
    dp[i] = Math.floor(i / weights[0]) * values[0];

  for (let i = 1; i < N; i++) {
    let temp = new Array(capacity + 1).fill(0);
    for (let j = 0; j < capacity + 1; j++) {
      let notTake = dp[j];
      let take = -Infinity;
      if (weights[i] <= j) take = values[i] + temp[j - weights[i]];
      temp[j] = Math.max(take, notTake);
    }
    dp = temp;
  }
  return dp[capacity];
};

// Time: O(n * W)
// Space: O(W)

console.log(knapsack(3, [2, 4, 6], [5, 11, 13], 10)); // 27
