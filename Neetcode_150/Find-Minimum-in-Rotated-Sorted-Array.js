/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  let left = 0,
    right = nums.length - 1,
    res = nums[0];

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

// Time: O(logn)
// Space: O(1)

/**
Even though array is rotated, it is still sorted, so we can use binary search to find minimum in O(logn) time.

Initialize pointer at beginning and end, and a result variable initialized to any value in the array (can do element at index 0)
While l <= r
If array has been rotated by the length of the array, then it will be in order again, with nums[l] < nums[r]
We can find the min of res and nums[l] since this will be the minimum of the current window

Next we calculate the mid point and compare this value with the result.

If we have split a rotated sorted array in half, then one half will be sorted and one half won't be
The minimum will always be in the unsorted part (if the entire window isn't sorted) because it will be next to the maximum value
If the part to left of mid pointer is sorted, then we will update l pointer to mid + 1, so we can focus on unsorted part
If part to right of mid pointer is sorted, then we will update r pointer to mid - 1, so we can focus on unsorted part

TC: O(logn) binary search is logn time complexity because we invalidate half the array with ever step
SC: O(1) constant time to store l, r, mid, and res variables
*/
