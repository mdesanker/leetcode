/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  // initialize res as first num because can have negative values
  let res = nums[0],
    currSum = 0;

  for (let num of nums) {
    // if currSum is negative, reset to 0 before adding new num
    if (currSum < 0) currSum = 0;

    currSum += num;

    // calculate new max
    res = Math.max(res, currSum);
  }
  return res;
};

// Time: O(n)
// Space: O(1)

// Alternate way to calculate currSum
var maxSubArray = function (nums) {
  let res = nums[0],
    currSum = 0;
  for (let num of nums) {
    currSum = Math.max(currSum + num, num);
    res = Math.max(res, currSum);
  }
  return res;
};

/**
 * Brute force
 * Compute every subarray
 * O(n^2) n^2 for nested loop
 */
