/**
 * @param {number[]} nums
 * @return {number}
 */
var arraySign = function (nums) {
  const res = nums.reduce((a, b) => a * b);
  if (res > 0) return 1;
  else if (res < 0) return -1;
  return 0;
};
// TC: O(n)
// SC: O(1)
