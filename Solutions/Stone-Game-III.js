/**
 * @param {number[]} stoneValue
 * @return {string}
 */
// Recursion + Memoization
var stoneGameIII = function (stoneValue) {
  const n = stoneValue.length;
  const dp = new Array(n + 1).fill(-Infinity);
  dp[n] = 0;

  for (let i = n - 1; i >= 0; i--) {
    let total = 0;
    for (let j = 0; j < 3; j++) {
      if (i + j < n) {
        total += stoneValue[i + j];
        dp[i] = Math.max(dp[i], total - dp[i + j + 1]);
      }
    }
  }

  if (dp[0] === 0) return "Tie";
  else if (dp[0] < 0) return "Bob";
  else return "Alice";
};
// TC: O(n)
// SC: O(n)
