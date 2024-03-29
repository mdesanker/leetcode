/**
Solution: Binary Search

If the array is sorted and then rotated some amount, and we split at the mid point
Either the left portion will be sorted or the right portion will be sorted. 
We handle these two regions separately.

Each iteration of binary search, check if nums[mid] === target

1. Left is sorted 
  - If target is within l and mid, update r = mid
  - Else update l = mid + 1
2. Right is sorted
  - If target is outside mid and r, update r = mid
  - Else update l = mid + 1

Return -1 if we don't find target value

n = nums.length
TC: O(logn)
SC: O(1)
 */
var search = function (nums, target) {
  let l = 0,
    r = nums.length - 1;
  while (l <= r) {
    let mid = l + Math.floor((r - l) / 2);

    if (nums[mid] === target) return mid;

    if (nums[l] <= nums[mid]) {
      if (target < nums[l] || target > nums[mid]) {
        l = mid + 1;
      } else {
        r = mid;
      }
    } else {
      if (target < nums[mid] || target > nums[r]) {
        r = mid - 1;
      } else {
        l = mid;
      }
    }
  }
  return -1;
};

var search = function (nums, target) {
  let l = 0,
    r = nums.length - 1;
  while (l < r) {
    let mid = l + Math.floor((r - l) / 2);

    if (nums[mid] === target) return mid;

    if (nums[l] <= nums[mid]) {
      if (target < nums[l] || target > nums[mid]) {
        l = mid + 1;
      } else {
        r = mid;
      }
    } else {
      if (target < nums[mid] || target > nums[r]) {
        r = mid - 1;
      } else {
        l = mid;
      }
    }
  }
  return nums[l] === target ? l : -1;
};

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

// Time: O(logn)
// Space: O(1)

/** 
Initialize l and r pointers to beginning and end of array respectively

While l <= r
Calculate mid point
We will scan until we find the target value with the mid pointer as long as it exists, 
so use if statement to check if target = nums[mid] and return mid

If we split a rotated sorted array, one half will be sorted and the other half won't be, because of the pivot point where min val is next to max val
We can't really search the unsorted portion effectively, so we will focus on the sorted portion.

If portion to left of mid point is sorted
If target is less than minimum value (l pointer) or greater than maximum value (m pointer), we can remove this portion from consideration
Update l pointer to mid + 1
If target is within this sorted portion, then we can shrink window to focus on this area
Update r pointer to mid - 1

If portion to right of mid point is sorted
We can follow same logic we used for left sorted portion

If we get through entire array without finding target, return -1

TC: O(logn) binary search is logn time complexity because we invalidate half the array in every step
SC: O(1) constant time to store values for pointers
*/
