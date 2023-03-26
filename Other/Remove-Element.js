/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
// Two-pointer (fast and slow)
var removeElement = function (nums, val) {
  let i = 0;
  for (let j = 0; j < nums.length; j++) {
    if (nums[j] !== val) {
      nums[i] = nums[j];
      i++;
    }
  }
  return i;
};
// Time: O(n)
// Space: O(1)
