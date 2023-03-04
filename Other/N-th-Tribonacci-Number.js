/**
 * @param {number} n
 * @return {number}
 */
// Top-down
var tribonacci = function (n, memo = {}) {
  if (n in memo) return memo[n];
  if (n === 0) return 0;
  if (n === 1 || n === 2) return 1;
  return (memo[n] =
    tribonacci(n - 1, memo) +
    tribonacci(n - 2, memo) +
    tribonacci(n - 3, memo));
};

// Time: O(n)
// Space: O(n)

// Bottom-up
var tribonacci = function (n, memo = {}) {
  const dp = new Array(n + 1).fill(0);
  dp[0] = 0;
  dp[1] = 1;
  dp[2] = 1;
  for (let i = 3; i < n + 1; i++) {
    dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
  }
  return dp[n];
};

// Time: O(n)
// Space: O(n)
