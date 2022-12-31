/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  // create array same length as nums filled with 1 (each cell is length 1)
  const dp = new Array(nums.length).fill(1);

  // iterate backwards through nums
  for (let i = nums.length - 1; i >= 0; i--) {
    // from i, scan the remainder of nums
    for (let j = i + 1; j < nums.length; j++) {
      // if nums[i] < nums[j], can potentially be part of increasing array
      if (nums[i] < nums[j]) {
        // calculate new max length from this index
        dp[i] = Math.max(dp[i], 1 + dp[j]);
      }
    }
  }
  // return max of dp array
  return Math.max(...dp);
};

// Time: O(n^2) iterate backwards and forwards through nums each pass
// Space: O(n) dp array of length nums

/**
 * Brute force - DFS
 * For each num in nums, have2 choices (include or exclude) --> O(2^n)
 */

/**
 * DFS with Cache
 * For each index, check every index afterwards until end of array
 */
