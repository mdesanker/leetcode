/**
Brute Force: Nested for-loops to calculate sum of every possible subarray

TC: O(n^2)
SC: O(1)

Solution: Dyanmic Programming, Kadane's Algorithm

Problem asks for maximum of something, indicates dynamic programming.
This is a popular problem for Kadane's algorithm

Challenge here is determining where the optimal subarray begins
A subarray whose sum is positive is worth keeping. We do not actually need to build the subarray, just track the sum
Use the currSum variable to track the current subarray sum
A second res variable is used to track the maximum subarray sum

As we iterate through nums, currSum is the max of num added to currSum or the num itself

n = nums.length

TC: O(n) to iterate through nums array
SC: O(1)
 */
var maxSubArray = function (nums) {
  let currSum = nums[0],
    res = currSum;
  for (let num of nums) {
    currSum = Math.max(currSum + num, num);
    res = Math.max(res, currSum);
  }
  return res;
};
