/**
 * @param {number} n
 * @return {number}
 */
var tribonacci = function (n, memo = {}) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  if (n === 2) return 1;
  if (n in memo) return memo[n];
  memo[n] =
    tribonacci(n - 1, memo) + tribonacci(n - 2, memo) + tribonacci(n - 3, memo);
  return memo[n];
};

// Time: O(n) each number calculated only once then memoized for when needed again
// Space: O(n) to store the memoized values
