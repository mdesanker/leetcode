/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  const n = nums.length;
  let i = 0;
  while (nums[i] !== 0 && i < n) i++;
  for (let j = i + 1; j < n; j++) {
    if (nums[j] !== 0) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      i++;
    }
  }
};
// TC: O(n)
// SC: O(1)
