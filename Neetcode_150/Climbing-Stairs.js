/**
 * @param {number} n
 * @return {number}
 */

// https://leetcode.com/problems/climbing-stairs/solutions/2725940/js-fibonacci-without-recursion-with-explanation-4-solutions/?orderBy=most_votes&languageTags=javascript

// Dyanmic programming
var climbStairs = function (n) {
  // DP - Bottom Up (start at base case and work way up)
  let one = 1,
    two = 1;
  for (i = 0; i < n - 1; i++) {
    let tmp = one;
    one = one + two;
    two = tmp;
  }
  return one;
};

// Time: O(n)
// Space: O(1)

// Dynamic programming with array
var climbStairs = function (n) {
  let dp = new Array(n + 1);
  (dp[1] = 1), (dp[2] = 2);
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
};

// Time: O(n)
// Space: O(n)

// Recursion + Memoization
var climbStairs = function (n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 3) return n;
  memo[n] = climbStairs(n - 1, memo) + climbStairs(n - 2, memo);
  return memo[n];
};

// Time: O(n)
// Space: O(n) for memo
