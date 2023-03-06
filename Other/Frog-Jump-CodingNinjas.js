/**
Problem on Coding Ninjas
https://www.codingninjas.com/codestudio/problems/frog-jump_3621012?source=youtube&campaign=striver_dp_videos&utm_source=youtube&utm_medium=affiliate&utm_campaign=striver_dp_videos

dp(n - 1) = min energy required to reach index n - 1 from 0
 */
// Recursion
var frogJump = (heights) => {
  const n = heights.length;

  function dp(i) {
    // base case
    if (i === 0) return 0;

    // recurrence relation
    let one = Math.abs(heights[i] - heights[i - 1]) + dp(i - 1);
    // in case two is undefined (i - 2 < 0), we initialize two to Infinity, then update if its value is valid
    let two = Infinity;
    if (i > 1) two = Math.abs(heights[i] - heights[i - 2]) + dp(i - 2);

    return Math.min(one, two);
  }
  // we try to get to last index of array, not index after array in this case
  return dp(n - 1);
};

// Time: O(2^n)
// Space: O(n)

// Recursion + memoization
var frogJump = (heights) => {
  const n = heights.length;

  const memo = {};

  function dp(i) {
    // check cache
    if (i in memo) return memo[i];

    // base case
    if (i === 0) return 0;

    // recurrence relation
    let one = Math.abs(heights[i] - heights[i - 1]) + dp(i - 1);
    // in case two is undefined (i - 2 < 0), we initialize two to Infinity, then update if its value is valid
    let two = Infinity;
    if (i > 1) two = Math.abs(heights[i] - heights[i - 2]) + dp(i - 2);

    return (memo[i] = Math.min(one, two));
  }
  // we try to get to last index of array, not index after array in this case
  return dp(n - 1);
};

// Time: O(n)
// Space: O(n)

// Tabulation
var frogJump = (heights) => {
  const n = heights.length;
  const dp = new Array(n).fill(0);

  dp[0] = 0;

  // recurrence relation
  for (let i = 1; i < n; i++) {
    let one = Math.abs(heights[i] - heights[i - 1]) + dp[i - 1];
    // in case two is undefined (i - 2 < 0), we initialize two to Infinity, then update if its value is valid
    let two = Infinity;
    if (i > 1) two = Math.abs(heights[i] - heights[i - 2]) + dp[i - 2];

    dp[i] = Math.min(one, two);
  }
  return dp[n - 1];
};

// Time: O(n)
// Space: O(n)

// console.log(frogJump([10, 20, 30, 10]));

// Tabulation - optimized
var frogJump = (heights) => {
  const n = heights.length;

  function dp(i) {
    if (i === 0) return 0;

    let one = 0,
      two = 0;

    for (let i = 1; i < n; i++) {
      let oneStep = Math.abs(heights[i] - heights[i - 1]) + one;
      // in case two is undefined (i - 2 < 0), we initialize two to Infinity, then update if its value is valid
      let twoStep = Infinity;
      if (i > 1) twoStep = Math.abs(heights[i] - heights[i - 2]) + two;
      let curr = Math.min(oneStep, twoStep);
      two = one;
      one = curr;
    }
    return one;
  }
  return dp(n - 1);
};

// Time: O(n)
// Space: O(1)

// console.log(frogJump([10, 20, 30, 10]));
