/**
 * @param {number[]} nums
 * @return {number}
 */
var findNumberOfLIS = function (nums) {
  const n = nums.length;

  const dp = new Array(n).fill(1);
  // count tracks the number of arrays of length dp[i] that end at index [i]
  const count = new Array(n).fill(1);

  let max = 1;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j] && dp[i] < 1 + dp[j]) {
        dp[i] = 1 + dp[j];
        // inherit count
        count[i] = count[j];
      } else if (nums[i] > nums[j] && dp[i] === 1 + dp[j]) {
        // increase count
        count[i] += count[j];
      }
    }
    max = Math.max(max, dp[i]);
  }

  let res = 0;
  // find index of all max subsequences and add their counts together
  for (let i = n - 1; i >= 0; i--) {
    if (dp[i] === max) res += count[i];
  }
  return res;
};

// Time: O(n^2)
// Space: O(n)
