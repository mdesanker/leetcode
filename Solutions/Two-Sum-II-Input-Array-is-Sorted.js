/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */

const twoSum = function (numbers, target) {
  let left = 0,
    right = numbers.length - 1;

  while (left < right) {
    let sum = numbers[left] + numbers[right];
    if (sum === target) {
      return [left + 1, right + 1];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
  return [-1, -1];
};

/*
Time: O(N)
Space: O(1)
*/

/**
Initialize pointer to start and end of nums array.
While left pointer is less than right pointer, calculate current sum of value of l and r pointers
Since array is sorted, incrementing left pointer will increase sum, and decrementing right pointer will decrease sum.
If sum < target, increment left to increase sum
If sum > target, decrement right to decrease sum
If sum = target then return indices of l and r pointer + 1
If traverse entire array without finding target, then return [-1, -1]

TC: O(n) traverse nums array once
SC: O(1) only memory used is the two variables for l and r pointers
 */
