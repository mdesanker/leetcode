/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// Recursion
var findTargetSumWays = function (nums, target) {
  const N = nums.length;

  function dp(i, sum) {
    if (i === N) {
      if (sum === target) return 1;
      else return 0;
    }

    let plus = dp(i + 1, sum + nums[i]);
    let minus = dp(i + 1, sum - nums[i]);
    return plus + minus;
  }
  return dp(0, 0);
};

// Time: O(2^n)
// Space: O(n)

// Recursion + Memoization
var findTargetSumWays = function (nums, target) {
  const N = nums.length;
  const memo = {};

  function dp(i, sum) {
    const key = `${i}#${sum}`;
    if (key in memo) return memo[key];

    if (i === N) {
      if (sum === target) return 1;
      else return 0;
    }

    let plus = dp(i + 1, sum + nums[i]);
    let minus = dp(i + 1, sum - nums[i]);
    return (memo[key] = plus + minus);
  }
  return dp(0, 0);
};

// Time: O(n * t) where t = sum(nums)
// Space: O(n * t) for cache

// Tabulation
// This is weird one

///////////////////////////////////////////////////////////////////////////////////
/**
Break down problem into "Partitions With Given Difference" from Code Studio S1 - S2 = D

[1, 1, 1, 1, 1], target = 3;

+1 +1 +1 +1 -1 = 3

[1, 1, 1, 1] - [1] = 3

4 - 1 = 3

Essentially, find the number of pairs of subsets with S1 = 4 and S2 = 1

Calculating target:
S2 = totalSum - S1
S1 - S2 = D
S1 - (totalSum - S1) = D
2*S1 - totalSum = D
S1 = (totalSum + D) / 2
 */

// Recursion
var findTargetSumWays = function (nums, target) {
  const N = nums.length;
  const sum = nums.reduce((a, b) => a + b);

  let k = (sum + target) / 2;

  function dp(i, j) {
    if (i === 0) {
      if (j === 0 && nums[0] === 0) return 2;
      if (nums[i] === j || j === 0) return 1;
      else return 0;
    }

    let notTake = dp(i - 1, j);
    let take = 0;
    if (nums[i] <= j) take = dp(i - 1, j - nums[i]);
    return take + notTake;
  }
  return dp(N - 1, k);
};

// Time: O(2^n)
// Space: O(n)

// Recursion + Memoization
var findTargetSumWays = function (nums, target) {
  const N = nums.length;
  const sum = nums.reduce((a, b) => a + b);

  let k = (sum + target) / 2;

  const memo = {};

  function dp(i, j) {
    const key = `${i}#${j}`;
    if (key in memo) return memo[key];

    if (i === 0) {
      if (j === 0 && nums[0] === 0) return 2;
      if (nums[i] === j || j === 0) return 1;
      else return 0;
    }

    let notTake = dp(i - 1, j);
    let take = 0;
    if (nums[i] <= j) take = dp(i - 1, j - nums[i]);
    return (memo[key] = take + notTake);
  }
  return dp(N - 1, k);
};

// Time: O(n * k)
// Space: O(n * k)

// Tabulation
var findTargetSumWays = function (nums, target) {
  const N = nums.length;
  const sum = nums.reduce((a, b) => a + b);

  if (sum + target < 0 || (sum + target) % 2 === 1) return 0;

  let k = (sum + target) / 2;

  const dp = [...new Array(N)].map(() => new Array(k + 1).fill(0));

  // this base case MUST come first incase nums[0] is 0 - it will be overwritten in following base case
  if (nums[0] <= k) dp[0][nums[0]] = 1;
  if (nums[0] === 0) dp[0][0] = 2;
  else dp[0][0] = 1;

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
var findTargetSumWays = function (nums, target) {
  const N = nums.length;
  const sum = nums.reduce((a, b) => a + b);

  if (sum + target < 0 || (sum + target) % 2 === 1) return 0;

  let k = (sum + target) / 2;

  let dp = new Array(k + 1).fill(0);
  // this base case MUST come first incase nums[0] is 0 - it will be overwritten in following base case
  if (nums[0] <= k) dp[nums[0]] = 1;
  if (nums[0] === 0) dp[0] = 2;
  else dp[0] = 1;

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
