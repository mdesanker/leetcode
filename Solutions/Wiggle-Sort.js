/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var wiggleSort = function (nums) {
  // odd index positions should be greater than or equal to [i - 1] positions
  // even index positions should be less than or equal to [i - 1] positions
  // else we swap the current element with the previous element to satisfy condition
  for (let i = 1; i < nums.length; i++) {
    if (i % 2 === 1 && nums[i - 1] > nums[i]) {
      [nums[i], nums[i - 1]] = [nums[i - 1], nums[i]];
    } else if (i % 2 === 0 && nums[i - 1] < nums[i]) {
      [nums[i], nums[i - 1]] = [nums[i - 1], nums[i]];
    }
  }
};

// Time: O(n) we iterate through nums array once
// Space: O(1) no additional memory is needed because we perform swaps in place

var wiggleSort = function (nums) {
  // odd index positions should be greater than or equal to [i - 1] positions
  // even index positions should be less than or equal to [i - 1] positions
  // else we swap the current element with the previous element to satisfy condition
  for (let i = 1; i < nums.length; i++) {
    if (
      (i % 2 === 1 && nums[i - 1] > nums[i]) ||
      (i % 2 === 0 && nums[i - 1] < nums[i])
    ) {
      [nums[i], nums[i - 1]] = [nums[i - 1], nums[i]];
    }
  }
};
