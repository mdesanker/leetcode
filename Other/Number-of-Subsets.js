/**
https://www.codingninjas.com/codestudio/problems/number-of-subsets_3952532

Array of positive integers, tell how many different ways of selecting the elements from the array such that the sum of chosen elements
is equal to the target
 */
const arr = [1, 2, 2, 3];

// Recursion
var findWays = function (nums, k) {
  const N = nums.length;

  function dp(i, sum) {
    if (i === N) {
      if (sum === k) return 1;
      else return 0;
    }

    let notTake = dp(i + 1, sum);
    let take = 0;
    if (nums[i] <= k - sum) take = dp(i + 1, sum + nums[i]);
    return take + notTake;
  }
  return dp(0, 0);
};

var findWays = function (nums, k) {
  const N = nums.length;

  function dp(i, remain) {
    // if remainder is 0 at any point, return 1
    if (remain === 0) return 1;
    if (i === 0) {
      if (remain === nums[0]) return 1;
      else return 0;
    }

    let notTake = dp(i - 1, remain);
    let take = 0;
    if (nums[i] <= remain) take = dp(i - 1, remain - nums[i]);
    return take + notTake;
  }
  return dp(N - 1, k);
};

// Time: O(2^n)
// Space: O(n)

console.log(findWays(arr, 3)); // 3

// Recursion + Memoization
var findWays = function (nums, k) {
  const N = nums.length;
  const memo = {};

  function dp(i, sum) {
    const key = `${i}#${sum}`;
    if (key in memo) return memo[key];

    if (i === N) {
      if (sum === k) return 1;
      else return 0;
    }

    let notTake = dp(i + 1, sum);
    let take = 0;
    if (nums[i] <= k - sum) take = dp(i + 1, sum + nums[i]);
    return (memo[key] = take + notTake);
  }
  return dp(0, 0);
};

var findWays = function (nums, k) {
  const N = nums.length;
  const memo = {};

  function dp(i, remain) {
    const key = `${i}#${remain}`;
    if (key in memo) return memo[key];

    // if remainder is 0 at any point, return 1
    if (remain === 0) return 1;
    if (i === 0) {
      if (remain === nums[0]) return 1;
      else return 0;
    }

    let notTake = dp(i - 1, remain);
    let take = 0;
    if (nums[i] <= remain) take = dp(i - 1, remain - nums[i]);
    return (memo[key] = take + notTake);
  }
  return dp(N - 1, k);
};

// Time: O(n * k)
// Space: O(n * k)

console.log(findWays(arr, 3)); // 3

// Tabulation
var findWays = function (nums, k) {
  const N = nums.length;

  const dp = [...new Array(N)].map(() => new Array(k + 1).fill(0));

  // base case
  dp[0][0] = 1;
  if (nums[0] <= k) dp[0][nums[0]] = 1; // IMPORTANT

  for (let i = 1; i < N; i++) {
    for (let j = 0; j < k + 1; j++) {
      let notTake = dp[i - 1][j];
      let take = 0;
      if (nums[i] <= j) take = dp[i - 1][j - nums[i]];
      dp[i][j] = take + notTake;
    }
  }
  return dp[N - 1][k];
};

// Time: O(n * k)
// Space: O(n * k)

// Tabulation - Optimized
var findWays = function (nums, k) {
  const N = nums.length;

  let dp = new Array(k + 1).fill(0);

  // base case
  dp[0] = 1;
  if (nums[0] <= k) dp[nums[0]] = 1; // IMPORTANT

  for (let i = 1; i < N; i++) {
    let temp = new Array(k + 1).fill(0);
    for (let j = 0; j < k + 1; j++) {
      let notTake = dp[j];
      let take = 0;
      if (nums[i] <= j) take = dp[j - nums[i]];
      temp[j] = take + notTake;
    }
    dp = temp;
  }
  return dp[k];
};

// Time: O(n * k)
// Space: O(k)

console.log(findWays(arr, 3)); // 3
