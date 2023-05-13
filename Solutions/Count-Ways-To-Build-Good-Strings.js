/**
 * @param {number} low
 * @param {number} high
 * @param {number} zero
 * @param {number} one
 * @return {number}
 */
// Recursion
var countGoodStrings = function (low, high, zero, one) {
  const MOD = 10 ** 9 + 7;

  function dp(i) {
    if (i > high) return 0;

    let count = 0;
    if (i >= low && i <= high) count++;

    count += dp(i + zero);
    count += dp(i + one);
    return count % MOD;
  }
  return dp(0);
};
// TC: Exponential
// SC: O(high)

// Recursion + Memoization
var countGoodStrings = function (low, high, zero, one) {
  const MOD = 10 ** 9 + 7;
  const memo = new Array(high + 1).fill(-1);

  function dp(i) {
    if (i > high) return 0;

    if (memo[i] !== -1) return memo[i];

    let count = 0;
    if (i >= low && i <= high) count++;

    count += dp(i + zero);
    count += dp(i + one);
    return (memo[i] = count % MOD);
  }
  return dp(0);
};
// TC: O(high)
// SC: O(high)
