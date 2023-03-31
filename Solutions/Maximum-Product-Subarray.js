/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  // edge case
  if (nums.length === 0) return 0;

  let currentMax = nums[0];
  let currentMin = nums[0];
  // placeholder for global max
  let result = currentMax;

  for (let i = 1; i < nums.length; i++) {
    let curr = nums[i];
    let tempMax = Math.max(curr, currentMax * curr, currentMin * curr);
    currentMin = Math.min(curr, currentMax * curr, currentMin * curr);

    currentMax = tempMax;

    result = Math.max(result, currentMax);
  }
  return result;
};

// Time: O(n)
// Space: O(1)
