/**
 * @param {number} n
 * @return {number}
 */
// Recursion
var fib = function (n) {
  // base case
  if (n <= 1) return n;

  // recurrence relation
  return fib(n - 1) + fib(n - 2);
};

// Time: O(2^n)
// Space: O(n)

// Recursion + Memoization
var fib = function (n, memo = {}) {
  // check cache
  if (n in memo) return memo[n];

  // base case
  if (n <= 1) return n;

  // recurrence relation
  return (memo[n] = fib(n - 1, memo) + fib(n - 2, memo));
};

// Time: O(n)
// Space: O(n)

// Tabulation
var fib = function (n) {
  // initialize dp array
  const dp = new Array(n + 1).fill(0);

  // base case
  dp[0] = 0;
  dp[1] = 1;

  // recurrence relation
  for (let i = 2; i < n + 1; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
};

// Time: O(n)
// Space: O(n)

// Tabulation - Constant space
var fib = function (n) {
  if (n <= 1) return n;

  let one = 0;
  let two = 1;
  for (let i = 2; i < n + 1; i++) {
    let tmp = one + two;
    one = two;
    two = tmp;
  }
  return two;
};

// Time: O(n)
// Space: O(1)
