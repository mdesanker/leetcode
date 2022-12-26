/**
 * @param {number[]} nums
 * @return {boolean}
 */

// Greedy Implementation

var canJump = function (nums) {
  // set goal to end of array
  let goal = nums.length - 1;

  // iterate backwards through nums
  for (let i = nums.length - 1; i >= 0; i--) {
    // if can reach goal, move goal left
    // jump result is index + the value at index
    if (i + nums[i] >= goal) {
      goal = i;
    }
  }

  // if goal is 0, can make it to end
  return goal === 0;
};

// Time: O(n)
// Space: O(1)
