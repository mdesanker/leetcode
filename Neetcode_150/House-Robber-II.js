/**
 * @param {number[]} nums
 * @return {number}
 */

/**
Key insight
In contrast to 'House Robber', we have a circular array
Therefore we cannot rob from both first and last house
We can get around this by calculating max on two subarrays, omit first element, then omit last element
 */

// Recursion
var rob = function (nums) {
  const n = nums.length;

  // edge cases
  if (n === 0) return 0;
  if (n === 1) return nums[0];

  // n - 2 index because we are shrinking arrays by 1 element in each case
  return Math.max(dp(nums.slice(0, -1), n - 2), dp(nums.slice(1), n - 2));

  function dp(nums, i) {
    // base case
    if (i < 0) return 0;
    // recurrence relation
    return Math.max(dp(nums, i - 1), nums[i] + dp(nums, i - 2));
  }
};

// Time: O(2^n)
// Space: O(n)

// Recursion + memoization
var rob = function (nums) {
  const n = nums.length;

  if (n === 0) return 0;
  if (n === 1) return nums[0];

  return Math.max(dp(nums.slice(0, -1), n - 2), dp(nums.slice(1), n - 2));

  // helper function to calculate max for array nums
  function dp(nums, i, memo = {}) {
    // check cache
    if (i in memo) return memo[i];
    // base case
    if (i < 0) return 0;
    // recurrence relation
    return (memo[i] = Math.max(
      dp(nums, i - 1, memo),
      nums[i] + dp(nums, i - 2, memo)
    ));
  }
};

// Time: O(n)
// Space: O(n)

// Tabulation
var rob = function (nums) {
  const n = nums.length;

  if (n === 0) return 0;
  if (n === 1) return nums[0];

  return Math.max(dp(nums.slice(0, -1)), dp(nums.slice(1)));

  // helper function to calculate max for array nums
  function dp(nums) {
    const n = nums.length;

    const dp = new Array(n + 1).fill(0);
    dp[0] = 0;
    dp[1] = nums[0];

    for (let i = 2; i < n + 1; i++) {
      dp[i] = Math.max(dp[i - 1], nums[i - 1] + dp[i - 2]);
    }
    return dp[n];
  }
};

// Time: O(n)
// Space: O(n)

// Space optimized
var rob = function (nums) {
  const n = nums.length;

  if (n === 0) return 0;
  if (n === 1) return nums[0];

  return Math.max(dp(nums.slice(0, -1)), dp(nums.slice(1)));

  function dp(nums) {
    const n = nums.length;

    let one = 0,
      two = 0;
    for (let i = 0; i < n; i++) {
      let curr = Math.max(two, nums[i] + one);
      one = two;
      two = curr;
    }
    return two;
  }
};

// Time: O(n)
// Space: O(1)
