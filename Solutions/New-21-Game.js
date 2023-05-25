/**
 * @param {number} n
 * @param {number} k
 * @param {number} maxPts
 * @return {number}
 */
var new21Game = function (n, k, maxPts) {
  if (k === 0 || n >= k + maxPts) return 1.0;

  const dp = new Array(k + n).fill(0);
  dp[0] = 1.0;

  let currentSum = 1.0;
  let res = 0.0;

  for (let i = 1; i < k + n; i++) {
    dp[i] = currentSum / maxPts;
    if (i < k) currentSum += dp[i];
    if (i - maxPts >= 0) currentSum -= dp[i - maxPts];
  }

  for (let i = k; i <= n; i++) {
    res += dp[i];
  }
  return res;
};
// TC: O(n)
// SC: O(n + k)
