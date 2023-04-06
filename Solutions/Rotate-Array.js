/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// Brute force [TLE]
var rotate = function (nums, k) {
  while (k) {
    nums.unshift(nums.pop());
    k--;
  }
};
// TC: O(nk)
// SC: O(1)

// Splice
var rotate = function (nums, k) {
  const n = nums.length;
  nums.unshift(...nums.splice(n - (k % n)));
};
// TC: O(n)
// SC: O(n)
