/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

const search = function (nums, target) {
  let left = 0,
    right = nums.length - 1;

  while (left <= right) {
    // find the midpoint of array
    let mid = Math.floor(left + (right - left) / 2);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
};

/*
Time: O(logN)
Space: O(1)
*/
