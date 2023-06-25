/**
 * @param {number[]} rods
 * @return {number}
 */
var tallestBillboard = function (rods) {
  let dp = { 0: 0 };

  for (let rod of rods) {
    let temp = { ...dp };
    for (let height in temp) {
      height = parseInt(height);
      dp[height + rod] = Math.max(dp[height + rod] || 0, temp[height]);
      dp[Math.abs(height - rod)] = Math.max(
        dp[Math.abs(height - rod)] || 0,
        temp[height] + Math.min(height, rod)
      );
    }
  }
  return dp[0] || 0;
};
// TC: O(n * sum(rods))
// SC: O(sum(rods))
