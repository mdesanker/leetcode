/**
 * @param {number[]} satisfaction
 * @return {number}
 */
// Recursion
var maxSatisfaction = function (satisfaction) {
  const n = satisfaction.length;
  satisfaction.sort((a, b) => a - b);

  function dp(i, j) {
    if (i === n) return 0;

    let notTake = dp(i + 1, j);
    let take = satisfaction[i] * j + dp(i + 1, j + 1);
    return Math.max(take, notTake, 0);
  }
  return dp(0, 1);
};
// Time: O(2^n)
// Space: O(n)

// Recursion + Memoization
var maxSatisfaction = function (satisfaction) {
  const n = satisfaction.length;
  satisfaction.sort((a, b) => a - b);
  const memo = [...new Array(n)].map(() => new Array(n + 1).fill(-1));

  function dp(i, j) {
    if (i === n) return 0;

    if (memo[i][j] !== -1) return memo[i][j];

    let notTake = dp(i + 1, j);
    let take = satisfaction[i] * j + dp(i + 1, j + 1);
    return (memo[i][j] = Math.max(take, notTake, 0));
  }
  return dp(0, 1);
};
// Time: O(n^2)
// Space: O(n^2) + O(n) stack space

// Tabulation
var maxSatisfaction = function (satisfaction) {
  const n = satisfaction.length;
  satisfaction.sort((a, b) => a - b);
  const dp = [...new Array(n + 1)].map(() => new Array(n + 2).fill(0));

  for (let i = n - 1; i >= 0; i--) {
    for (let j = 1; j < n + 1; j++) {
      let notTake = dp[i + 1][j];
      let take = satisfaction[i] * j + dp[i + 1][j + 1];
      dp[i][j] = Math.max(take, notTake);
    }
  }
  return dp[0][1];
};
// Time: O(n^2)
// Space: O(n^2)

// Tabulation - Space optimized
var maxSatisfaction = function (satisfaction) {
  const n = satisfaction.length;
  satisfaction.sort((a, b) => a - b);
  let dp = new Array(n + 2).fill(0);

  for (let i = n - 1; i >= 0; i--) {
    let temp = new Array(n + 2).fill(0);
    for (let j = 1; j < n + 1; j++) {
      let notTake = dp[j];
      let take = satisfaction[i] * j + dp[j + 1];
      temp[j] = Math.max(take, notTake);
    }
    dp = temp;
  }
  return dp[1];
};
// Time: O(n^2)
// Space: O(n)
