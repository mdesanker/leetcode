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

var arraySign = function (nums) {
  let isNeg = false;
  for (let num of nums) {
    if (num === 0) return 0;
    if (num < 0) isNeg = !isNeg;
  }
  return isNeg ? -1 : 1;
};
// TC: O(n)
// SC: O(1)
