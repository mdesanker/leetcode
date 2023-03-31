/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// Binary Search
// Template where we find smallest k that satisfies nums[k] >= target
var searchInsert = function (nums, target) {
  // input target might be larger than all values in nums array, so we initialize r to nums.length, not nums.length - 1
  let l = 0,
    r = nums.length;

  while (l < r) {
    let mid = l + Math.floor((r - l) / 2);

    if (nums[mid] >= target) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }
  return l;
};

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
