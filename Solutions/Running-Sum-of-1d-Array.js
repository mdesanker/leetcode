/**
 * @param {number[]} nums
 * @return {number[]}
 */
var runningSum = function (nums) {
  let sum = 0;
  const res = [];
  for (let num of nums) {
    sum += num;
    res.push(sum);
  }
  return res;
};
// TC: O(n)
// SC: O(n)

var runningSum = function (nums) {
  let sum = 0;
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    sum += nums[i];
    nums[i] = sum;
  }
  return nums;
};
// TC: O(n)
// SC: O(1)
