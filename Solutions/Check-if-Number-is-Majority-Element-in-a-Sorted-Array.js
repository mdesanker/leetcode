/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
// Brute Force
var isMajorityElement = function (nums, target) {
  const n = nums.length;
  const map = {};
  for (let num of nums) map[num] = map[num] + 1 || 1;

  return map[target] > n / 2;
};
// TC: O(n)
// SC: O(n)

// Binary Search
var isMajorityElement = function (nums, target) {
  const n = nums.length;

  function bs(target) {
    let l = 0,
      r = nums.length;
    while (l < r) {
      const mid = l + Math.floor((r - l) / 2);
      if (nums[mid] > target) {
        r = mid;
      } else {
        l = mid + 1;
      }
    }
    return l;
  }
  return bs(target) - bs(target - 1) > n / 2;
};
// TC: O(logn)
// SC: O(1)
