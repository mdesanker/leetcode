/**
 * @param {number[]} nums
 * @return {number}
 */
var longestArithSeqLength = function (nums) {
  const n = nums.length;
  const dp = {};
  let max = 0;

  for (let i = 0; i < n; i++) {
    if (!dp[i]) dp[i] = {};
    for (let j = 0; j < i; j++) {
      const diff = nums[i] - nums[j];
      dp[i][diff] = 1 + (dp[j][diff] || 1);
      max = Math.max(max, dp[i][diff]);
    }
  }
  return max;
};
// TC: O(n^2)
// SC: O(n^2)
