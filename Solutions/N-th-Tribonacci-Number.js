/**
 * @param {number} n
 * @return {number}
 */
// Recursion
var tribonacci = function (n) {
  if (n === 0) return 0;
  if (n === 1 || n === 2) return 1;
  return tribonacci(n - 1) + tribonacci(n - 2) + tribonacci(n - 3);
};

// Time: O(3^n)
// Space: O(n)

// Recursion + Memoization
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

// Tabulation
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

// Tabulation - Constant space
var tribonacci = function (n) {
  if (n === 0) return 0;
  if (n === 1 || n === 2) return 1;

  let one = 0,
    two = (three = 1);

  for (let i = 3; i < n + 1; i++) {
    let curr = one + two + three;
    one = two;
    two = three;
    three = curr;
  }
  return three;
};

// Time: O(n)
// Space: O(1)
