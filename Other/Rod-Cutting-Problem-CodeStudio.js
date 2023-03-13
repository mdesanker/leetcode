/**
https://www.codingninjas.com/codestudio/problems/rod-cutting-problem_800284

Each rod length fetches a certain price on the target. But rod of length N to maximize profit
Similar to unbounded knapsack problem
 */

// Recursion
var cutRod = function (N, costs) {
  function dp(i, N) {
    if (i === 0) {
      // we are at the last cut which is length 1. If there is N length remaining, then there will be N cuts of length 1, which is costs[0]
      return N * costs[0];
    }

    let notCut = dp(i - 1, N);
    let cut = -Infinity;
    if (i + 1 <= N) cut = costs[i] + dp(i, N - (i + 1));
    return Math.max(cut, notCut);
  }
  return dp(N - 1, N);
};

// Time: O(2^n)
// Space: O(n)

// Recursion + Memoization
var cutRod = function (N, costs) {
  const memo = {};
  function dp(i, N) {
    const key = `${i}#${N}`;
    if (key in memo) return memo[key];

    if (i === 0) {
      // we are at the last cut which is length 1. If there is N length remaining, then there will be N cuts of length 1, which is costs[0]
      return N * costs[0];
    }

    let notCut = dp(i - 1, N);
    let cut = -Infinity;
    if (i + 1 <= N) cut = costs[i] + dp(i, N - (i + 1));
    return (memo[key] = Math.max(cut, notCut));
  }
  return dp(N - 1, N);
};

// Time: O(n^2)
// Space: O(n^2)

// Tabulation
var cutRod = function (N, costs) {
  const dp = [...new Array(N)].map(() => new Array(N + 1).fill(0));
  for (let i = 0; i < N + 1; i++) {
    dp[0][i] = i * costs[0];
  }

  for (let i = 1; i < N; i++) {
    for (let j = 0; j < N + 1; j++) {
      let notCut = dp[i - 1][j];
      let cut = -Infinity;
      if (i + 1 <= j) cut = costs[i] + dp[i][j - (i + 1)];
      dp[i][j] = Math.max(cut, notCut);
    }
  }
  return dp[N - 1][N];
};

// Time: O(n^2)
// Space: O(n^2)

// Tabulation - Optimized
var cutRod = function (N, costs) {
  let dp = new Array(N + 1).fill(0);
  for (let i = 0; i < N + 1; i++) {
    dp[i] = i * costs[0];
  }

  for (let i = 1; i < N; i++) {
    let temp = new Array(N + 1).fill(0);
    for (let j = 0; j < N + 1; j++) {
      let notCut = dp[j];
      let cut = -Infinity;
      if (i + 1 <= j) cut = costs[i] + temp[j - (i + 1)];
      temp[j] = Math.max(cut, notCut);
    }
    dp = temp;
  }
  return dp[N];
};

// Time: O(n^2)
// Space: O(n)

console.log(cutRod(5, [2, 5, 7, 8, 10])); // 12
console.log(cutRod(8, [3, 5, 8, 9, 10, 17, 17, 20])); // 24
