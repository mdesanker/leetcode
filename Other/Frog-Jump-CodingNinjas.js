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
    if (i <= 1) return Math.abs(heights[i] - heights[0]);

    // recurrence relation
    return Math.min(
      Math.abs(heights[i] - heights[i - 1]) + dp(i - 1),
      Math.abs(heights[i] - heights[i - 2]) + dp(i - 2)
    );
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
    if (i <= 1) return Math.abs(heights[i] - heights[0]);

    // recurrence relation
    return (memo[i] = Math.min(
      Math.abs(heights[i] - heights[i - 1]) + dp(i - 1),
      Math.abs(heights[i] - heights[i - 2]) + dp(i - 2)
    ));
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
  dp[1] = Math.abs(heights[1] - heights[0]);

  for (let i = 2; i < n; i++) {
    dp[i] = Math.min(
      Math.abs(heights[i] - heights[i - 1]) + dp[i - 1],
      Math.abs(heights[i] - heights[i - 2]) + dp[i - 2]
    );
  }
  return dp[n - 1];
};

// Time: O(n)
// Space: O(n)

// Tabulation - optimized
var frogJump = (heights) => {
  const n = heights.length;

  function dp(i) {
    if (i <= 1) return Math.abs(heights[i] - heights[0]);

    let one = 0,
      two = Math.abs(heights[1] - heights[0]);

    for (let i = 2; i < n; i++) {
      let curr = Math.min(
        Math.abs(heights[i] - heights[i - 1]) + two,
        Math.abs(heights[i] - heights[i - 2]) + one
      );
      one = two;
      two = curr;
    }
    return two;
  }
  return dp(n - 1);
};

// Time: O(n)
// Space: O(1)

// console.log(frogJump([10, 20, 30, 10]));
