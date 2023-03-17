# 1D DP

## Climbing Stairs

Fibonacci sequence problem

Base case: if (i <= 1) return 1;
Recurrence: dp(i - 1) + dp(i - 2)

```js
// Recurison + Memoization (Top down)
var climbStairs = function (n) {
  const memo = {};
  function dp(i) {
    if (i in memo) return memo[i];
    if (i <= 1) return 1;
    return (memo[i] = dp(i - 1) + dp(i - 2));
  }
  return dp(n);
};
// TC: O(n), SC: O(n)

// Tabulation (Bottom up)
var climbStairs = function (n) {
  const dp = new Array(n + 1).fill(0);
  dp[0] = dp[1] = 1;
  for (let i = 2; i < n + 1; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
};
// TC: O(n), SC: O(n)

// Tabulation - Space optimized
var climbStairs = function (n) {
  let two = (one = 1);
  for (let i = 2; i < n + 1; i++) {
    let temp = one + two;
    two = one;
    one = temp;
  }
  return one;
};
// TC: O(n), SC: O(1)
```

## Frog Jump

Base case: once reach last index, no more jumps, so return 0
Recurrence: two options are one step or two steps

```js
// Recurison + Memoization (Top down)
var frogJump = function (n, heights) {
  const memo = {};
  function dp(i) {
    if (i in memo) return memo[i];

    if (i === 0) return 0;

    let one = Math.abs(heights[i] - heights[i - 1]) + dp(i - 1);
    let two = Infinity;
    if (i > 1) two = Math.abs(heights[i] - heights[i - 2]) + dp(i - 2);
    return (memo[i] = Math.min(one, two));
  }
  return dp(n - 1);
};
// TC: O(n), SC: O(n)

// Tabulation
var frogJump = function (n, heights) {
  const dp = new Array(n).fill(0);
  dp[0] = 0;

  for (let i = 1; i < n; i++) {
    let one = Math.abs(heights[i] - heights[i - 1]) + dp[i - 1];
    let two = Infinity;
    if (i > 1) two = Math.abs(heights[i] - heights[i - 2]) + dp[i - 2];
    dp[i] = Math.min(one, two);
  }
  return dp[n - 1];
};
// TC: O(n), SC: O(n)

// Tabulation - Space optimized
var frogJump = function (n, heights) {
  let one = (two = 0);
  for (let i = 1; i < n; i++) {
    let oneStep = Math.abs(heights[i] - heights[i - 1]) + dp[i - 1];
    let twoStep = Infinity;
    if (i > 1) twoStep = Math.abs(heights[i] - heights[i - 2]) + dp[i - 2];
    let temp = Math.min(oneStep, twoStep);
    two = one;
    one = temp;
  }
  return one;
};
// TC: O(n), SC: O(1)
```

## Frog Jump II

Base case: i === 0 return 0
Recurrence: can make any length jump within limits of array, so need a for loop

```js
// Recurison + Memoization (Top down)
var frogJump = function (heights, k) {
  const memo = {};
  function dp(ind) {
    if (ndi in memo) return memo[ind];

    if (ind === 0) return 0;

    let min = Infinity;
    for (let i = 1; i < k + 1; i++) {
      if (ind - i >= 0) {
        const cost = Math.abs(heights[ind] - heights[ind - i]) + dp(ind - i);
        min = Math.min(min, cost);
      }
    }
    return (memo[ind] = min);
  }
  return dp(n - 1);
};
// TC: O(n), SC: O(n)

// Tabulation
var frogJump = function (heights, k) {
  const dp = new Array(k).fill(0);
  dp[0] = 0;

  for (let i = 1; i < k + 1; i++) {
    let min = Infinity;
    for (let j = i; j < k + 1; j++) {
      if (ind - j >= 0) {
        const cost = Math.abs(heights[ind] - heights[ind - j]) + dp(ind - j);
        min = Math.min(min, cost);
      }
    }
    dp[i] = min;
  }
  return dp[k - 1];
};
// TC: O(n), SC: O(n)
```
