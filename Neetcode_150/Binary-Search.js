/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let left = 0,
    right = nums.length - 1;

  while (left <= right) {
    // avoid overflow error if left and right and close to the integer max (Number.MAX_VALUE)
    // this way, you are not going to exceed the integer max because it will always be < right
    const mid = left + Math.floor((right - left) / 2);

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

// Time: O(logn)
// Space: O(1)

/** 
ARRAY MUST BE SORTED
Initialize the range to search over, but initialize pointer to beginning and end of nums array
While these pointers don't overlap, calculate the mid point

Calculating mid point:
Simple: Math.floor((l + r) / 2) 
Take the average of the left and right pointer rounded down
Can round down (floor division) or round up (ceiling division), either will work
This can lead to overflow problems if the sum of l and r is greater than largest possible int

Better: l + Math.floor((r - l) / 2)
Add the average of the difference between l and r pointers to the l pointer.
This will prevent overflow problems if l + r is greater than max int value

Binary search - check if mid index is the value we are searching for, 
If not, then shift window depending on whether mid value is greater or less than target
If nums[mid] is less than target, then we need to search to the right of mid (because nums is sorted)
Therefore shift l pointer to mid + 1
If nums[mid] is greater than target, then we , search to the left of mid by shifting r pointer to mid - 1

If we check entire array and don't find the value, then return -1

TC: O(logn) The search space is halved with every step, because we check the mid point, and know whether we can get rid of half the array
SC: O(1) constant space to store l, r, and mid pointers
*/
