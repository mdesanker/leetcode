/**
 * @param {number[]} nums
 * @return {number}
 */

const findDuplicate = function (nums) {
  let slow = 0,
    fast = 0;

  while (true) {
    slow = nums[slow];
    fast = nums[nums[fast]];
    if (slow === fast) break;
  }

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
