/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  let left = 0,
    right = nums.length - 1;

  while (left <= right) {
    // if array is sorted, set result to left value
    if (nums[left] < nums[right]) {
      res = Math.min(res, nums[left]);
      break;
    }

    let mid = Math.floor((left + right) / 2);
    res = Math.min(res, nums[mid]);

    // if in left sorted portion, search to the right
    if (nums[left] <= nums[mid]) {
      left = mid + 1;
      // if in right sorted portion, search to the left
    } else {
      right = mid - 1;
    }
  }
  return res;
};

// Time: O(logN)
// Space: O(1)
