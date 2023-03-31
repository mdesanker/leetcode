/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubarraySumCircular = function (nums) {
  // calculate min and max subarrays uising Kadane's
  let sum = 0,
    currMax = 0,
    currMin = 0,
    maxSum = nums[0],
    minSum = nums[0];
  for (let num of nums) {
    currMax = Math.max(currMax + num, num);
    maxSum = Math.max(maxSum, currMax);

    currMin = Math.min(currMin + num, num);
    minSum = Math.min(minSum, currMin);

    // calculate sum of all elements
    sum += num;
  }
  // normal sum: the maximum subarray problem
  // special sum: sum of all elements minus a minimum subarray in the middle
  // if minSum contains all elements, then special sum is an empty array
  return sum === minSum ? maxSum : Math.max(maxSum, sum - minSum);
};

// Time: O(n)
// Space: O(1)
