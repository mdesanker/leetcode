/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function (nums) {
  let left = 0,
    right = nums.length - 1;

  while (left < right) {
    let mid = left + Math.floor((right - left) / 2);

    // if mid greater than element to the right, set right to mid (not mid - 1 so don't exclude max number)
    if (nums[mid] > nums[mid + 1]) {
      right = mid;
      // if mid less than element to the right, set element to the right as new left boundary
    } else {
      left = mid + 1;
    }
  }
  return left;
};

// Time: O(logn) binary search, reduce search area by half each loop
// Space: O(1)
