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

Special base case for counting subsets that sum to target!!
Base case: if nums[0] is 0 and already at target, can either add or substract nums[0] to stay at target

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

## 0/1 Knapsack

Maximize values of items in a knapsack of weight W. Each item can only be used once

```js
// Recursion + Memoization
var knapsack = function (n, weights, values, W) {
  const memo = {};

  function dp(i, W) {
    const key = `${i}#${W}`;
    if (key in memo) return memo[key];

    if (i === 0) {
      if (weights[0] <= W) return values[0];
      else return 0;
    }

    let notTake = dp(i - 1, W);
    let take = -Infninity;
    if (weights[i] <= W) take = values[i] + dp(i - 1, W - weights[i]);
    return (memo[key] = Math.max(take, notTake));
  }
  return dp(n - 1, W);
};
// TC: O(n * W), SC: O(n * W + n)

// Tabulation
var knapsack = function (n, weights, values, W) {
  const dp = [...new Array(n)].map(() => new Array(W + 1).fill(0));
  for (let j = 0; j < W + 1; j++) {
    if (weights[0] <= j) dp[0][j] = values[0];
  }

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < W + 1; j++) {
      let notTake = dp[i - 1][j];
      let take = -Infinity;
      if (weights[i] <= j) take = values[i] + dp[i - 1][j - weights[i]];
      dp[i][j] = Math.max(take, notTake);
    }
  }
  return dp[n - 1][W];
};
// TC: O(n * W), SC: O(n * W)

// Tabulation - Space optimized
var knapsack = function (n, weights, values, W) {
  let dp = new Array(W + 1).fill(0);
  for (let j = 0; j < W + 1; j++) {
    if (weights[0] <= j) dp[0][j] = values[0];
  }

  for (let i = 1; i < n; i++) {
    let temp = new Array(W + 1).fill(0);
    for (let j = 0; j < W + 1; j++) {
      let notTake = dp[j];
      let take = -Infinity;
      if (weights[i] <= j) take = values[i] + dp[j - weights[i]];
      temp[j] = Math.max(take, notTake);
    }
    dp = temp;
  }
  return dp[W];
};
// TC: O(n * W), SC: O(W)
```

## Coin Change

Unbounded knapsack
Base case: when i === 0, need to divide remaining amount by nums[0] because it can be used unlimited amount of times

```js
// Recursion + Memoization
var coinChange = function (coins, amount) {
  const n = coins.length;
  const memo = {};

  function dp(i, total) {
    const key = `${i}#${total}`;
    if (key in memo) return memo[key];

    if (i === 0) {
      if (total % coins[0]) return Infinity;
      else return Math.floor(total / coins[0]);
    }

    let notTake = dp(i - 1, total);
    let take = Infinity;
    if (coins[i] <= total) take = 1 + dp(i, total - coins[i]);
    return (memo[key] = Math.min(take, notTake));
  }
  const res = dp(n - 1, amount);
  return res === Infinity ? -1 : res;
};
// TC: O(n * A), SC: O(n * A + n)

// Tabulation
var coinChange = function (coins, amount) {
  const n = coins.length;

  const dp = [...new Array(n)].map(() => new Array(amount + 1).fill(Infinity));
  dp[0][0] = 0;
  for (let j = 1; j < amount + 1; j++) {
    if (j % coins[0] === 0) dp[0][j] = j / coins[0];
  }

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < amount + 1; j++) {
      let notTake = dp[i - 1][j];
      let take = Infinity;
      if (coins[i] <= j) take = 1 + dp[i][j - coins[i]];
      dp[i][j] = Math.min(take, notTake);
    }
  }
  return dp[n - 1][amount] === Infinity ? -1 : dp[n - 1][amount];
};
// TC: O(n * A), SC: O(n * A)

// Tabulation - Space optimized
var coinChange = function (coins, amount) {
  const n = coins.length;

  let dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let j = 1; j < amount + 1; j++) {
    if (j % coins[0] === 0) dp[j] = j / coins[0];
  }

  for (let i = 1; i < n; i++) {
    let temp = new Array(amount + 1).fill(Infinity);
    for (let j = 0; j < amount + 1; j++) {
      let notTake = dp[j];
      let take = Infinity;
      if (coins[i] <= j) take = 1 + temp[j - coins[i]];
      temp[j] = Math.min(take, notTake);
    }
    dp = temp;
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
};
// TC: O(n * A), SC: O(A)
```

## Target Sum

Two approaches

1. Iterate through elements, plussing or minusing them until reach end of array
2. Split array into two subsets so that difference = target. Count the number of subsets that satisfy condition
   - Remember special base case for counting subsets that sum to target: if i === 0 and nums[0] === 0 then return 2 because +0 or -0 will give same answer

```js
// Recursion + Memoization - 1
var findTargetSumWays = function (nums, target) {
  const n = nums.length;
  const memo = {};

  function dp(i, total) {
    const key = `${i}#${total}`;
    if (key in memo) return memo[key];

    if (i < 0) {
      if (total === target) return 1;
      else return 0;
    }

    let sum = dp(i - 1, total + nums[i]);
    let minus = dp(i - 1, total - nums[i]);
    return (memo[key] = sum + minus);
  }
  return dp(n - 1, 0);
};
// TC: O(n * t), SC: O(n * t + n)

// Recursion + Memoization - 2
/**
Count subsets that sum to target
D = target
S1 - S2 = D
S1 = Total - S2
Total - 2 * S2 = D
S2 = (Total - D) / 2
 */
var findTargetSumWays = function (nums, target) {
  const n = nums.length;
  const sum = nums.reduce((a, b) => a + b);
  const k = (sum - target) / 2;

  const memo = {};

  function dp(i, j) {
    const key = `${i}#${j}`;
    if (key in memo) return memo[key];

    if (i === 0) {
      // if nums[0] is 0 and already at target, can either add or substract nums[0] to stay at target
      if (j === 0 && nums[0] === 0) return 2;
      if (nums[0] === j || j === 0) return 1;
      else return 0;
    }

    let notTake = dp(i - 1, j);
    let take = 0;
    if (nums[i] <= j) take = dp(i - 1, j - nums[i]);
    return (memo[key] = take + notTake);
  }
  return dp(n - 1, k);
};
// TC: O(n * t), SC: O(n * t + n)

// Tabulation
var findTargetSumWays = function (nums, target) {
  const n = nums.length;
  const sum = nums.reduce((a, b) => a + b);
  const k = (sum - target) / 2;

  if (sum - target < 0 || (sum - target) % 2) return 0;

  const dp = [...new Array(n)].map(() => new Array(k + 1).fill(0));
  for (let j = 0; j < k + 1; j++) {
    if (j === nums[0]) dp[0][j] = 1;
  }
  if (nums[0] === 0) dp[0][0] = 2;
  else dp[0][0] = 1;

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < k + 1; j++) {
      let notTake = dp[i - 1][j];
      let take = 0;
      if (nums[i] <= j) take = dp[i - 1][j - nums[i]];
      dp[i][j] = take + notTake;
    }
  }
  return dp[n - 1][k];
};
// TC: O(n * t), SC: O(n * t)

// Tabulation - Space optimized
var findTargetSumWays = function (nums, target) {
  const n = nums.length;
  const sum = nums.reduce((a, b) => a + b);
  const k = (sum - target) / 2;

  if (sum - target < 0 || (sum - target) % 2) return 0;

  let dp = new Array(k + 1).fill(0);
  for (let j = 0; j < k + 1; j++) {
    if (j === nums[0]) dp[j] = 1;
  }
  if (nums[0] === 0) dp[0] = 2;
  else dp[0] = 1;

  for (let i = 1; i < n; i++) {
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
// TC: O(n * t), SC: O(t)
```

## Coin Change II

Count ways to sum to target in unbounded knapsack problem

```js
// Recursion + Memoization
var change = function (amount, coins) {
  const n = coins.length;
  const memo = {};

  function dp(i, j) {
    const key = `${i}#${j}`;
    if (key in memo) return memo[key];

    if (i === 0) {
      if (j === 0) return 1;
      else if (j % coins[0] === 0) return 1;
      else return 0;
    }

    let notTake = dp(i - 1, j);
    let take = 0;
    if (coins[i] <= j) take = dp(i, j - coins[i]);
    return (memo[key] = take + notTake);
  }
  return dp(n - 1, amount);
};
// TC: O(n * a), SC: O(n * a + n)

// Tabulation
var change = function (amount, coins) {
  const n = coins.length;

  const dp = [...new Array(n)].map(() => new Array(amount + 1).fill(0));
  for (let i = 0; i < n; i++) dp[i][0] = 1;
  for (let j = 0; j < amount + 1; j++) {
    if (j % coins[0] === 0) dp[0][j] = 1;
  }

  for (let i = 1; i < n; i++) {
    for (let j = 1; j < amount + 1; j++) {
      let notTake = dp[i - 1][j];
      let take = 0;
      if (coins[i] <= j) take = dp[i][j - coins[i]];
      dp[i][j] = take + notTake;
    }
  }
  return dp[n - 1][amount];
};
// TC: O(n * a), SC: O(n * a)

// Tabulation - Space optimized
var change = function (amount, coins) {
  const n = coins.length;

  let dp = new Array(amount + 1).fill(0);
  dp[0] = 1;
  for (let j = 0; j < amount + 1; j++) {
    if (j % coins[0] === 0) dp[j] = 1;
  }

  for (let i = 1; i < n; i++) {
    let temp = new Array(amount + 1).fill(0);
    temp[0] = 1;
    for (let j = 1; j < amount + 1; j++) {
      let notTake = dp[j];
      let take = 0;
      if (coins[i] <= j) take = temp[j - coins[i]];
      temp[j] = take + notTake;
    }
    dp = temp;
  }
  return dp[amount];
};
// TC: O(n * a), SC: O(a)
```

## Unbounded Knapsack

Fill sack with capacity W to maximize profit. Can take one item multiple times

```js
// Recursion + Memoization
var unboundedKnapsack = function (n, W, profit, weight) {
  const memo = {};

  function dp(i, j) {
    const key = `${i}#${j}`;
    if (key in memo) return memo[key];

    if (i === 0) {
      return Math.floor(j / weight[0]) * profit[0];
    }

    let notTake = dp(i - 1, j);
    let take = -Infinity;
    if (weight[i] <= j) take = profit[i] + dp(i, j - weight[i]);
    return (memo[key] = Math.max(take, notTake));
  }
  return dp(n - 1, W);
};
// TC: O(n * W), SC: O(n * W + n)

// Tabulation
var unboundedKnapsack = function (n, W, profit, weight) {
  const dp = [...new Array(n)].map(() => new Array(W + 1).fill(-Infinity));
  for (let j = 0; j < W + 1; j++) {
    dp[0][j] = Math.floor(j / weight[0]) * profit[0];
  }

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < W + 1; j++) {
      let notTake = dp[i - 1][j];
      let take = -Infinity;
      if (weight[i] <= j) take = profit[i] + dp[i][j - weight[i]];
      dp[i][j] = Math.max(take, notTake);
    }
  }
  return dp[n - 1][W];
};
// TC: O(n * W), SC: O(n * W)

// Tabulation - Space optimized
var unboundedKnapsack = function (n, W, profit, weight) {
  let dp = new Array(W + 1).fill(-Infinity);
  for (let j = 0; j < W + 1; j++) {
    dp[j] = Math.floor(j / weight[0]) * profit[0];
  }

  for (let i = 1; i < n; i++) {
    let temp = new Array(W + 1).fill(-Infinity);
    for (let j = 0; j < W + 1; j++) {
      let notTake = dp[j];
      let take = -Infinity;
      if (weight[i] <= j) take = profit[i] + temp[j - weight[i]];
      temp[j] = Math.max(take, notTake);
    }
    dp = temp;
  }
  return dp[W];
};
// TC: O(n * W), SC: O(W)
```
