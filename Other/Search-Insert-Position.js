/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// Binary Search
var searchInsert = function (nums, target) {
  if (target < nums[0]) return 0;
  if (target > nums[nums.length - 1]) return nums.length;

  let res = 0;

  let l = 0,
    r = nums.length - 1;
  while (l <= r) {
    let mid = Math.floor((l + r) / 2);

    if (nums[mid] >= target) {
      res = mid;
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }
  return res;
};

// Time: O(logn)
// Space: O(1)

// Linear traversal
var searchInsert = function (nums, target) {
  if (target < nums[0]) return 0;
  if (target > nums[nums.length - 1]) return nums.length;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] >= target) return i;
  }
};

// Time: O(n)
// Space: O(1)
