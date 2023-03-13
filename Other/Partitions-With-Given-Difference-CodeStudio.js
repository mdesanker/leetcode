/**
https://www.codingninjas.com/codestudio/problems/partitions-with-given-difference_3751628

Given an array, that is broken into two subset so that S1 is sum of first subset and S2 is sum of second subset,
return the number of subset pairs with a difference D

Key Insight:
Keep in mind S1 = totalSum - S2

S1 - S2 = D
totalSum - S2 - S2 = D
totalSum - 2 * S2 = D
S2 = (totalSum - D) / 2

Find number of subsets with this target sum

This problem becomes Number-of-Subsets with a couple new edge cases:

totalSum - D must be even and greater than 0 otherwise cannot get a whole number target when we divide by 2
 */

// Recursion
var countPartitions = function (nums, d) {
  const N = nums.length;
  const sum = nums.reduce((a, b) => a + b);

  if (sum - d < 0 || (sum - d) % 2 === 1) return 0;

  // check key insight explanation above
  const target = (sum - d) / 2;

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
  return dp(N - 1, target);
};

// Time: O(2^n)
// Space: O(n)

// console.log(countPartitions([5, 2, 5, 1], 3)); // 2
// console.log(countPartitions([5, 2, 6, 4], 3)); // [5, 2], [6, 4] = 1

// Recursion + Memoization
var countPartitions = function (nums, d) {
  const N = nums.length;
  const sum = nums.reduce((a, b) => a + b);

  if (sum - d < 0 || (sum - d) % 2 === 1) return 0;

  // check key insight explanation above
  const target = (sum - d) / 2;

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
  return dp(N - 1, target);
};

// Time: O(n * t)
// Space: O(n * t)

// Tabulation
var countPartitions = function (nums, d) {
  const N = nums.length;
  const sum = nums.reduce((a, b) => a + b);

  if (sum - d < 0 || (sum - d) % 2 === 1) return 0;

  // check key insight explanation above
  const target = (sum - d) / 2;

  const dp = [...new Array(N)].map(() => new Array(target + 1).fill(0));

  if (nums[0] <= target) dp[0][nums[0]] = 1;
  if (nums[0] === 0) dp[0][0] = 2;
  else dp[0][0] = 1;

  for (let i = 1; i < N; i++) {
    for (let j = 0; j < target + 1; j++) {
      let notTake = dp[i - 1][j];
      let take = 0;
      if (nums[i] <= j) take = dp[i - 1][j - nums[i]];
      dp[i][j] = take + notTake;
    }
  }
  return dp[N - 1][target];
};

// Time: O(n * t)
// Space: O(n * t)

console.log(countPartitions([5, 2, 5, 1], 3)); // 2
console.log(countPartitions([5, 2, 6, 4], 3)); // [5, 2], [6, 4] = 1

// Tabulation - Optimized
var countPartitions = function (nums, d) {
  const N = nums.length;
  const sum = nums.reduce((a, b) => a + b);

  if (sum - d < 0 || (sum - d) % 2 === 1) return 0;

  // check key insight explanation above
  const target = (sum - d) / 2;

  let dp = new Array(target + 1).fill(0);

  if (nums[0] <= target) dp[nums[0]] = 1;
  if (nums[0] === 0) dp[0] = 2;
  else dp[0] = 1;

  for (let i = 1; i < N; i++) {
    let temp = new Array(target + 1).fill(0);
    for (let j = 0; j < target + 1; j++) {
      let notTake = dp[j];
      let take = 0;
      if (nums[i] <= j) take = dp[j - nums[i]];
      temp[j] = take + notTake;
    }
    dp = temp;
  }
  return dp[target];
};

// Time: O(n * t)
// Space: O(t)

console.log(countPartitions([5, 2, 5, 1], 3)); // 2
console.log(countPartitions([5, 2, 6, 4], 3)); // [5, 2], [6, 4] = 1
