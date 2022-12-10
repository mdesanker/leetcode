/**
 * @param {number[]} nums
 * @return {number}
 */

const findDuplicate = function (nums) {
  let slow = 0,
    fast = 0;

  // Floyd's algorithm
  // slow and fast pointer to find intersection point (whether there is a cycle)
  while (true) {
    slow = nums[slow];
    fast = nums[nums[fast]];
    if (slow === fast) break;
  }

  // leave first slow and start another slow pointer at head, increment until they intersect to find beginning of cycle
  let slow2 = 0;
  while (true) {
    slow = nums[slow];
    slow2 = nums[slow2];
    if (slow === slow2) return slow;
  }
};

/*
Time: O(N)
Space: O(1)
*/
