/**
 * @param {number[]} nums
 * @return {boolean}
 */

/**
Similar to Subset-Sum-Equal-To-K question from CodeStudio, 
where we try to find if we can create a subset that sums to target k using elements from given array
In this case, the target is half of the sum of all elements in the array
 */

// Recrusion
var canPartition = function (nums) {
  const sum = nums.reduce((a, b) => a + b);
  if (sum % 2 === 1) return false;

  const target = sum / 2;

  function dp(i, j) {
    if (j === 0) return true;
    if (i === 0) return nums[0] === j;

    let notTake = dp(i - 1, j);
    let take = false;
    if (j >= nums[i]) take = dp(i - 1, j - nums[i]);
    return take || notTake;
  }
  return dp(nums.length - 1, target);
};

// Time: O(2^n) either take or not take each element in nums array
// Space: O(n) auxillary recursion stack is length of nums array

// Recursion + Memoization
var canPartition = function (nums) {
  const sum = nums.reduce((a, b) => a + b);
  if (sum % 2 === 1) return false;

  const target = sum / 2;

  const memo = {};

  function dp(i, j) {
    const key = `${i}#${j}`;
    if (key in memo) return memo[key];

    if (j === 0) return true;
    if (i === 0) return nums[0] === j;

    let notTake = dp(i - 1, j);
    let take = false;
    if (j >= nums[i]) take = dp(i - 1, j - nums[i]);
    return (memo[key] = take || notTake);
  }
  return dp(nums.length - 1, target);
};

// Time: O(n * m) where n is length of nums and m is target sum we try to get to
// Space: O(n) auxillary recursion stack is length of nums array

// Tabulation
var canPartition = function (nums) {
  const sum = nums.reduce((a, b) => a + b);
  if (sum % 2 === 1) return false;

  const target = sum / 2;

  const N = nums.length;

  const dp = [...new Array(N)].map(() => new Array(target + 1).fill(false));

  for (let i = 0; i < N; i++) dp[i][0] = true;
  dp[0][nums[0]] = true;

  for (let i = 1; i < N; i++) {
    for (let j = 1; j < target + 1; j++) {
      let notTake = dp[i - 1][j];
      let take = false;
      if (j >= nums[i]) take = dp[i - 1][j - nums[i]];
      dp[i][j] = take || notTake;
    }
  }
  return dp[N - 1][target];
};

// Time: O(n * m) n is length nums array, m is target
// Space: O(n * m) for 2D dp array

// Tabulation - Optimized
var canPartition = function (nums) {
  const sum = nums.reduce((a, b) => a + b);
  if (sum % 2 === 1) return false;

  const target = sum / 2;

  const N = nums.length;

  let dp = new Array(target + 1).fill(false);
  dp[0] = true;
  dp[nums[0]] = true;

  for (let i = 1; i < N; i++) {
    let temp = new Array(target + 1).fill(false);
    temp[0] = true;
    for (let j = 1; j < target + 1; j++) {
      let notTake = dp[j];
      let take = false;
      if (j >= nums[i]) take = dp[j - nums[i]];
      temp[j] = take || notTake;
    }
    dp = temp;
  }
  return dp[target];
};

// Time: O(n * m) n is length nums array, m is target
// Space: O(m) only store previous row

// Neetcode
var canPartition = function (nums) {
  // if sum is odd, can't create half array using integers
  let sum = nums.reduce((acc, curr) => acc + curr);
  if (sum % 2 === 1) return false;

  let dp = new Set();
  // can add up to 0 if don't choose any values from nums
  dp.add(0);

  // find if half the total sum can be created
  let target = sum / 2;

  // iterate through nums in reverse adding each new value to every value in dp set
  for (let i = nums.length - 1; i >= 0; i--) {
    // can't iterate through set while modifying it
    let nextDP = new Set();
    // iterate through every value of dp set
    for (let t of dp) {
      if (t + nums[i] === target) return true;
      // new set doesn't have value from original dp, so re-add
      nextDP.add(t);
      // add nums to every value in dp set
      nextDP.add(t + nums[i]);
    }
    // overwrite dp with new dp
    dp = nextDP;
  }
  // return true if target exists in set
  return dp.has(target);
};

// n = nums.length

// Time: O(n * sum(nums)) simplified from O(n * sum(nums)/2)
// Space: O(sum(nums))

/**
 * Brute force
 * Time: O(2^n)
 */
