/**
 * @param {number[]} nums
 * @return {number}
 */
// Recursion
var lengthOfLIS = function (nums) {
  const n = nums.length;

  function dp(i, prev) {
    if (i === n) return 0;
    let notTake = dp(i + 1, prev);
    let take = 0;
    if (prev === -1 || nums[i] > nums[prev]) take = 1 + dp(i + 1, i);
    return Math.max(take, notTake);
  }
  return dp(0, -1);
};
// Time: O(2^n)
// Space: O(n)

// Recursion + Memoization
var lengthOfLIS = function (nums) {
  const n = nums.length;
  const memo = [...new Array(n)].map(() => new Array(n + 1).fill(-1));

  function dp(i, prev) {
    if (i === n) return 0;

    // cache check must come after base case
    if (memo[i][prev + 1] !== -1) return memo[i][prev + 1];

    let notTake = dp(i + 1, prev);
    let take = 0;
    if (prev === -1 || nums[i] > nums[prev]) take = 1 + dp(i + 1, i);
    return (memo[i][prev + 1] = Math.max(take, notTake));
  }
  return dp(0, -1);
};
// Time: O(n^2)
// Space: O(n^2 + n)

// Recursion + Memoization [Memory overflow]
var lengthOfLIS = function (nums) {
  const n = nums.length;
  // javascript objects take more memory than arrays, so this solution overflows
  const memo = {};

  function dp(i, prev) {
    if (i === n) return 0;

    const key = `${i}#${prev}`;
    if (key in memo) return memo[key];

    let notTake = dp(i + 1, prev);
    let take = 0;
    if (prev === -1 || nums[i] > nums[prev]) take = 1 + dp(i + 1, i);
    return (memo[key] = Math.max(take, notTake));
  }
  return dp(0, -1);
};
// Time: O(n^2)
// Space: O(n^2)

var lengthOfLIS = function (nums) {
  // create array same length as nums filled with 1 (each cell is length 1)
  const dp = new Array(nums.length).fill(1);

  // iterate backwards through nums
  for (let i = nums.length - 1; i >= 0; i--) {
    // from i, scan the remainder of nums
    for (let j = i + 1; j < nums.length; j++) {
      // if nums[i] < nums[j], can potentially be part of increasing array
      if (nums[i] < nums[j]) {
        // calculate new max length from this index
        dp[i] = Math.max(dp[i], 1 + dp[j]);
      }
    }
  }
  // return max of dp array
  return Math.max(...dp);
};

// Time: O(n^2) iterate backwards and forwards through nums each pass
// Space: O(n) dp array of length nums

/**
 * Brute force - DFS
 * For each num in nums, have2 choices (include or exclude) --> O(2^n)
 */

/**
 * DFS with Cache
 * For each index, check every index afterwards until end of array
 */
