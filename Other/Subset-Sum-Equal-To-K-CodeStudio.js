/**
https://www.codingninjas.com/codestudio/problems/subset-sum-equal-to-k_1550954

Similar to Subarray Sum Equals K on LeetCode (https://leetcode.com/problems/subarray-sum-equals-k), but return true or false
 */
// Recrusion
var subsetSum = function (nums, k) {
  const N = nums.length;

  function dp(ind, target) {
    // base cases
    if (target === 0) return true;
    if (ind === 0) return nums[0] === target;

    // either take or not take current element
    let notTake = dp(ind - 1, target);
    // can only take element if target >= element
    let take = false;
    if (target >= nums[ind]) take = dp(ind - 1, target - nums[ind]);

    return take || notTake;
  }

  return dp(N - 1, k);
};

// Time: O(2^n)
// Space: O(n)

// Recrusion + Memoization
var subsetSum = function (nums, k) {
  const N = nums.length;
  const memo = {};

  function dp(ind, target) {
    // check cache
    const key = `${ind}#${target}`;
    if (key in memo) return memo[key];

    // base cases
    if (target === 0) return true;
    if (ind === 0) return nums[0] === target;

    // either take or not take current element
    let notTake = dp(ind - 1, target);
    // can only take element if target >= element
    let take = false;
    if (target >= nums[ind]) take = dp(ind - 1, target - nums[ind]);

    return (memo[key] = take || notTake);
  }

  return dp(N - 1, k);
};

// Time: O(n * k)
// Space: O(n * k)

// Tabulation
var subsetSum = function (nums, k) {
  const N = nums.length;

  const dp = [...new Array(N)].map(() => new Array(k + 1).fill(false));

  // base cases
  for (let i = 0; i < N; i++) dp[i][0] = true;
  dp[0][nums[0]] = true;

  for (let i = 1; i < N; i++) {
    for (let j = 1; j < k + 1; j++) {
      // either take or not take current element
      let notTake = dp[i - 1][k];
      // can only take element if target >= element
      let take = false;
      if (k >= nums[i]) take = dp[i - 1][k - nums[i]];
      dp[i][j] = take || notTake;
    }
  }
  return dp[N - 1][k];
};

// Time: O(n * k)
// Space: O(n * k)

// Tabulation - Optimized
var subsetSum = function (nums, k) {
  const N = nums.length;

  let dp = new Array(k + 1).fill(false);
  dp[0] = true;
  dp[nums[0]] = true;

  // base cases
  // for (let i = 0; i < N; i++) dp[i][0] = true;
  // dp[0][nums[0]] = true;

  for (let i = 1; i < N; i++) {
    let temp = new Array(k + 1).fill(false);
    temp[0] = true;
    for (let j = 1; j < k + 1; j++) {
      // either take or not take current element
      let notTake = dp[k];
      // can only take element if target >= element
      let take = false;
      if (k >= nums[i]) take = dp[k - nums[i]];
      temp[j] = take || notTake;
    }
    dp = temp;
  }
  return dp[k];
};

// Time: O(n * k)
// Space: O(k) - only track prev row

console.log(subsetSum([1, 2, 3, 4], 4)); // true
console.log(subsetSum([1, 2, 3, 4], 11)); // false
