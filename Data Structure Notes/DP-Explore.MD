# Dynamic Programming Explore Card

## Framework for DP Problems

State: a set of variables that can sufficiently describe a scenario. These variables are called state variables. We only care about relevant ones.
For example, to describe every scenario in Climbing Stairs, there is only 1 relevant state variable, the current step we are on.

1. A function of data structure that will compute/contain the answer to the problem for every given state

Top-down typically implemented with a recursive function and hash map
Bottom-up typically implemented with nested for-loops and an array

When designed this function or array, we also need to decide which state variables to pass as arguments

2. Recurrence relationship to transition between states

The equation that relates different states with each other

For climbing stairs, we can climb 1 or 2 steps at a time. Therefore, to climb to 30th stair, we arrived from either the 28th or 29th stair. Therefore number of ways to climb to 30th is equal to number of ways to climb to 28th plus number of ways to climb to 29th

dp(i) = dp(i - 1) + dp(i - 2);

(Shows that this problem is actually the fibonacci sequence in disquise)

3. Base cases, so that our recurrence relation does not go on indefinitely

When coming up with base case(s) ask yourself: what state(s) can I find the answer to without using DP?

For climbing stairs, there is only 1 way to climb to the first stair (1 step once), and there are 2 ways to climb to second stair (1 step twice and 2 steps once)

Therefore base cases are dp(1) = 1 and dp(2) = 2;

## Climbing Stairs:

Recursive solution [TLE]

```js
var climbStairs = function (n) {
  function dp(n) {
    // base cases
    if (n <= 2) return n;

    // recurrence relation
    return dp(n - 1) + dp(n - 2);
  }
  return dp(n);
};

// Time: O(2^n)
// Space: O(n)
```

Top-Down: Recursion with Memoization

```js
var climbStairs = function (n, memo = {}) {
  // check memo for res
  if (memo[n]) return memo[n];

  // base cases
  if (n <= 2) return n;

  // recurrence relation
  memo[n] = climbStairs(n - 1, memo) + climbStairs(n - 2, memo);
  return memo[n];
};

// Time: O(n)
// Space: O(n)
```

Bottom-Up: Tabulation

```js
var climbStairs = function (n) {
  // create dp array
  const dp = new Array(n + 1).fill(0);
  // base cases
  dp[1] = 1;
  dp[2] = 2;

  // recurrence relation
  for (let i = 3; i < n + 1; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
};

// Time: O(n)
// Space: O(n)
```

## House Robber

Recursion [TLE]

```js
var rob = function (nums) {
  function dp(i) {
    if (i === 0) return nums[0];
    if (i === 1) return Math.max(nums[0], nums[1]);
    return Math.max(dp(i - 1), nums[i] + dp(i - 2));
  }
  return dp(nums.length - 1);
};
// Time: O(2^n)
// Space: O(n)
```

Top-Down: Recursion with Memoization

```js
var rob = function (nums) {
  const memo = {};
  function dp(i) {
    // check cache
    if (memo[i]) return memo[i];

    // base cases
    if (i === 0) return nums[0];
    if (i === 1) return Math.max(nums[0], nums[1]);

    // recurrence relation
    memo[i] = Math.max(dp(i - 1), nums[i] + dp(i - 2));
    return memo[i];
  }
  return dp(nums.length - 1);
};
// Time: O(n)
// Space: O(n)

var rob = function (nums, i = nums.length - 1, memo = {}) {
  // check cache
  if (memo[i]) return memo[i];

  // base cases
  if (i === 0) return nums[0];
  if (i === 1) return Math.max(nums[0], nums[1]);

  // recurrence relation
  memo[i] = Math.max(rob(nums, i - 1, memo), nums[i] + rob(nums, i - 2, memo));
  return memo[i];
};
```

// Bottom-Up: Tabulation

```js
var rob = function (nums) {
  // initialize dp array
  const dp = new Array(nums.length).fill(0);

  // base cases
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);

  // recurrence relation
  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1], nums[i] + dp[i - 2]);
  }
  return dp[nums.length - 1];
};
// Time: O(n)
// Space: O(n)
```

# Striver's Framework for developing recurrence relations

1. Try to represent the problem in terms of index
2. Do all possible stuffs on that index accoridng to problem statement
3. If problem asks
   Count all ways -> sum all stuffs
   Find min -> min(all stuffs)
   Find max -> max(all stuffs)
