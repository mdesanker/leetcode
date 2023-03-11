/**
https://www.codingninjas.com/codestudio/problems/partition-a-set-into-two-subsets-such-that-the-difference-of-subset-sums-is-minimum_842494

Key Insight
The tabulation approach for the subset sum problem (check if a subset of sum k can be created from from an array)
Checks whether every sum is possible up to k. We can use this to check every possible combination and then find the combo
with minimum absolute difference

Range will be from 0 (one subset contains no elements) to total sum of array (one subset contains every element)

Absolute difference = totalSum - 2 * subsetSum where subsetSum is the index in the last row of dp array

This last row will be symmetrical, so we only need to check half of the row
 */
const arr = [2, 3, 7];

// Subset Sum recursion and tabulation for reference
var subsetSum = function (nums, k) {
  const N = nums.length;

  function dp(i, j) {
    if (j === 0) return true;
    if (i === 0) return nums[0] === j;

    let notTake = dp(i - 1, j);
    let take = false;
    if (j >= nums[i]) take = dp(i - 1, j - nums[i]);
    return take || notTake;
  }
  return dp(N - 1, k);
};

// Time: O(2^n)
// Space: O(n)

console.log(subsetSum(arr, 9));

var subsetSum = function (nums, k) {
  const N = nums.length;

  const dp = [...new Array(N)].map(() => new Array(k + 1).fill(false));

  for (let i = 0; i < N; i++) dp[i][0] = true;
  dp[0][nums[0]] = nums[0] <= k;

  for (let i = 1; i < N; i++) {
    for (let j = 1; j < k + 1; j++) {
      let notTake = dp[i - 1][j];
      let take = false;
      if (j >= nums[i]) take = dp[i - 1][j - nums[i]];
      dp[i][j] = take || notTake;
    }
  }
  return dp[N - 1][k];
};

// Time: O(n * k)
// Space: O(n * k)

console.log(subsetSum(arr, 9));

// Tabulation
// Solution using subset sum
var minSubsetSumDifference = function (nums) {
  const N = nums.length;
  const k = nums.reduce((a, b) => a + b);

  const dp = [...new Array(N)].map(() => new Array(k + 1).fill(false));

  for (let i = 0; i < N; i++) dp[i][0] = true;
  dp[0][nums[0]] = nums[0] <= k;

  for (let i = 1; i < N; i++) {
    for (let j = 1; j < k + 1; j++) {
      let notTake = dp[i - 1][j];
      let take = false;
      if (j >= nums[i]) take = dp[i - 1][j - nums[i]];
      dp[i][j] = take || notTake;
    }
  }

  // Check all possible absolute differences in first half of last row
  let min = Infinity;
  for (let i = 0; i < Math.floor((k + 1) / 2); i++) {
    if (dp[N - 1][i]) {
      let s1 = i,
        s2 = k - i;
      // min = Math.min(min, Math.abs(s2 - s1)); // alternate
      min = Math.min(min, Math.abs(k - 2 * i));
    }
  }
  return min;
};

// Time: O(n * k)
// Space: O(n * k) for 2D dp array

console.log(minSubsetSumDifference(arr));

// Tabulation - Optimized
var minSubsetSumDifference = function (nums) {
  const N = nums.length;
  const k = nums.reduce((a, b) => a + b);

  let dp = new Array(k + 1).fill(false);
  dp[0] = true;
  dp[nums[0]] = nums[0] <= k;

  for (let i = 1; i < N; i++) {
    let temp = new Array(k + 1).fill(false);
    temp[0] = true;
    for (let j = 1; j < k + 1; j++) {
      let notTake = dp[j];
      let take = false;
      if (j >= nums[i]) take = dp[j - nums[i]];
      temp[j] = take || notTake;
    }
    dp = temp;
  }

  // Check all possible absolute differences in first half of dp row
  let min = Infinity;
  for (let i = 0; i < Math.floor((k + 1) / 2); i++) {
    if (dp[i]) {
      let s1 = i,
        s2 = k - i;
      // min = Math.min(min, Math.abs(s2 - s1)); // alternate
      min = Math.min(min, Math.abs(k - 2 * i));
    }
  }
  return min;
};

console.log(minSubsetSumDifference(arr));

// Time: O(n * k)
// Space: O(k) only store prev row
