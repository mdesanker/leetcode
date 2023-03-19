# DP on Subsequences

## Partition Equal Subset Sum

Return number of subarrays whose sum equals k

```js
// Recursion + Memoization
var canPartition = function (nums) {
  const n = nums.length;
  const sum = nums.reduce((a, b) => a + b);
  if (sum % 2) return false;
  const target = sum / 2;

  const memo = {};

  function dp(i, k) {
    const key = `${i}#${k}`;
    if (key in memo) return memo[key];

    if (k === 0) return true;
    if (i === 0) return nums[0] === k;

    let notTake = dp(i - 1, k);
    let take = false;
    if (nums[i] <= k) take = dp(i - 1, k - nums[i]);
    return (memo[key] = take || notTake);
  }
  return dp(n - 1, target);
};
// TC: O(n * target), SC: O(n * target + n)

// Tabulation
var canPartition = function (nums) {
  const n = nums.length;
  const sum = nums.reduce((a, b) => a + b);
  if (sum % 2) return false;
  const target = sum / 2;

  const dp = [...new Array(n)].map(() => new Array(target + 1).fill(false));
  for (let i = 0; i < n; i++) dp[i][0] = true;
  // dp[0] means we have access to index 0 of nums array
  // when target is nums[0], we can form the target because it is the value we have access to
  // only mark true is nums[0] <= target
  dp[0][nums[0]] = nums[0] <= target;

  for (let i = 1; i < n; i++) {
    for (let j = 1; j < target + 1; j++) {
      let notTake = dp[i - 1][j];
      let take = false;
      if (nums[i] <= j) take = dp[i - 1][j - nums[i]];
      dp[i][j] = take || notTake;
    }
  }
  return dp[n - 1][target];
};
// TC: O(n * target), SC: O(n * target)

// Tabulation - Space optimized
var canPartition = function (nums) {
  const n = nums.length;
  const sum = nums.reduce((a, b) => a + b);
  if (sum % 2) return false;
  const target = sum / 2;

  let dp = new Array(target + 1).fill(false);
  dp[0] = true;
  dp[nums[0]] = nums[0] <= target;

  for (let i = 1; i < n; i++) {
    let temp = new Array(target + 1).fill(false);
    temp[0] = true;
    for (let j = 1; j < target + 1; j++) {
      let notTake = dp[j];
      let take = false;
      if (nums[i] <= j) take = dp[j - nums[i]];
      temp[j] = take || notTake;
    }
    dp = temp;
  }
  return dp[target];
};
// TC: O(n * target), SC: O(target)
```

## Number of Subsets

Return number of subsets that sum to target

```js
// Recursion + Memoization
var findWays = function (nums, k) {
  const n = nums.length;
  const memo = {};

  function dp(i, j) {
    const key = `${i}#${j}`;
    if (key in memo) return memo[key];

    if (j === 0) return 1;
    if (i === 0) return nums[0] === j;

    let notTake = dp(i - 1, j);
    let take = 0;
    if (nums[i] <= j) take = dp(i - 1, j - nums[i]);
    return (memo[key] = take + notTake);
  }
  return dp(n - 1, k);
};
// TC: O(n * k), SC: O(n * k + n)

// Tabulation
var findWays = function (nums, k) {
  const n = nums.length;

  const dp = [...new Array(n)].map(() => new Array(k + 1).fill(0));
  for (let i = 0; i < n; i++) dp[i][0] = 1;
  if (nums[0] <= k) dp[0][nums[0]] = 1;

  for (let i = 1; i < n; i++) {
    for (let j = 1; j < k + 1; j++) {
      let notTake = dp[i - 1][j];
      let take = 0;
      if (nums[i] <= j) take = dp[i - 1][j - nums[i]];
      dp[i][j] = take + notTake;
    }
  }
  return dp[n - 1][k];
};
// TC: O(n * k), SC: O(n * k)

// Tabulation
var findWays = function (nums, k) {
  const n = nums.length;

  let dp = new Array(k + 1).fill(0);
  dp[0] = 1;
  if (nums[0] <= k) dp[nums[0]] = 1;

  for (let i = 1; i < n; i++) {
    let temp = new Array(k + 1).fill(0);
    for (let j = 1; j < k + 1; j++) {
      let notTake = dp[j];
      let take = 0;
      if (nums[i] <= j) take = dp[j - nums[i]];
      temp[j] = take + notTake;
    }
    dp = temp;
  }
  return dp[k];
};
// TC: O(n * k), SC: O(k)
```

## Partitions with Given Difference

Return number of partitions with difference D
S1 - S2 = D
S1 = Total - S2
Total - 2 \* S2 = D
S2 = (Total - D) / 2

```js
// Recursion + Memoization
var countPartitions = function (n, d, nums) {
  const sum = nums.reduce((a, b) => a + b);
  const target = (sum - d) / 2;

  // edge cases
  if (target - d < 0 || (target - d) % 2) return 0;

  const memo = {};

  function dp(i, j) {
    const key = `${i}#${j}`;
    if (key in memo) return memo[key];

    if (i === 0) {
      if (j === 0 && nums[0] === 0) return 2;
      else if (j === 0 || nums[0] === j) return 1;
      else return 0;
    }

    let notTake = dp(i - 1, j);
    let take = 0;
    if (nums[i] <= j) take = dp(i - 1, j - nums[i]);
    return (memo[key] = take + notTake);
  }
  return dp(n - 1, target);
};
// TC: O(n * k), SC: O(n * k + n)

// Tabulation
var countPartitions = function (n, d, nums) {
  const sum = nums.reduce((a, b) => a + b);
  const target = (sum - d) / 2;

  // edge cases
  if (target - d < 0 || (target - d) % 2) return 0;

  const dp = [...new Array(n)].map(() => new Array(target + 1).fill(0));
  if (nums[0] <= target) dp[0][nums[0]] = 1;
  if (nums[0] === 0) dp[0][0] = 2;
  else dp[0][0] = 1;

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < target + 1; j++) {
      let notTake = dp[i - 1][j];
      let take = 0;
      if (nums[i] <= j) take = dp[i - 1][j - nums[i]];
      dp[i][j] = take + notTake;
    }
  }
  return dp[n - 1][target];
};
// TC: O(n * k), SC: O(n * k)

// Tabulation - Optimized
var countPartitions = function (n, d, nums) {
  const sum = nums.reduce((a, b) => a + b);
  const target = (sum - d) / 2;

  // edge cases
  if (target - d < 0 || (target - d) % 2) return 0;

  let dp = new Array(target + 1).fill(0);
  if (nums[0] <= target) dp[nums[0]] = 1;
  if (nums[0] === 0) dp[0] = 2;
  else dp[0] = 1;

  for (let i = 1; i < n; i++) {
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
// TC: O(n * k), SC: O(k)
```
