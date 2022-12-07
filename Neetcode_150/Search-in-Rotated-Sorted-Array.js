/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let left = 0,
    right = nums.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (target === nums[mid]) {
      return mid;
    }

    // left sorted portion
    if (nums[left] <= nums[mid]) {
      // if target outside sorted left portion, search right
      if (target < nums[left] || target > nums[mid]) {
        left = mid + 1;
        // search inside left portion
      } else {
        right = mid - 1;
      }
      // right sorted portion
    } else {
      // if target outside sorted right portion, search left
      if (target > nums[right] || target < nums[mid]) {
        right = mid - 1;
        // search inside right portion
      } else {
        left = mid + 1;
      }
    }
  }
  // value doesn't exist, return -1
  return -1;
};

// Time: O(logN)
// Space: O(1)
