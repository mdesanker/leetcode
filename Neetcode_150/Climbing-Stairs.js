/**
 * @param {number} n
 * @return {number}
 */

// https://leetcode.com/problems/climbing-stairs/solutions/2725940/js-fibonacci-without-recursion-with-explanation-4-solutions/?orderBy=most_votes&languageTags=javascript

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

var climbStairs = function (n) {
  if (n < 4) return n;
  let a = 1,
    b = 1,
    fib;
  for (let i = 2; i <= n; i++) {
    fib = a + b;
    a = b;
    b = fib;
  }
  return fib;
};
