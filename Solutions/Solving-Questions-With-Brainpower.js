/**
Solution: DP
https://leetcode.com/problems/solving-questions-with-brainpower/solutions/3514135/js-recursion-memo-tabulation/
 */
// Recursion
var mostPoints = function (questions) {
  const n = questions.length;

  function dp(i) {
    if (i >= n) return 0;

    let take = questions[i][0] + dp(i + questions[i][1] + 1);
    let notTake = dp(i + 1);
    return Math.max(take, notTake);
  }
  return dp(0);
};
// TC: Exponential
// SC: O(n)

// Recursion + Memoization
var mostPoints = function (questions) {
  const n = questions.length;
  const memo = new Array(n).fill(-1);

  function dp(i) {
    if (i >= n) return 0;

    if (memo[i] !== -1) return memo[i];

    let take = questions[i][0] + dp(i + questions[i][1] + 1);
    let notTake = dp(i + 1);
    return (memo[i] = Math.max(take, notTake));
  }
  return dp(0);
};
// TC: O(n)
// SC: O(n)

// Tabulation
var mostPoints = function (questions) {
  const n = questions.length;
  const dp = new Array(n + 1).fill(0);

  for (let i = n - 1; i >= 0; i--) {
    let take = questions[i][0] + dp[Math.min(n, i + questions[i][1] + 1)];
    let notTake = dp[i + 1];
    dp[i] = Math.max(take, notTake);
  }
  return dp[0];
};
// TC: O(n)
// SC: O(n)
