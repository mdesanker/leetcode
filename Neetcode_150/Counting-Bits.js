/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function (n) {
  const dp = new Array(n + 1).fill(0);
  // highest power of 2
  let offset = 1;

  for (let i = 1; i < n + 1; i++) {
    if (offset * 2 === i) {
      offset = i;
    }
    dp[i] = 1 + dp[i - offset];
  }
  return dp;
};

// Time: O(n)
// Space: O(n)

/**
 * Brute Force
 * Time: O(nlogn)
 */
