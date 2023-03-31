// Recursion
var frogJump = (heights, k) => {
  const n = heights.length;

  function dp(ind) {
    // base case
    if (ind === 0) return 0;

    // consider every possible jump from current index (1, 2, ..., k)
    let minSteps = Infinity;
    for (let j = 1; j <= k; j++) {
      // if jump is possible (in range of array)
      if (ind - j >= 0) {
        // calculate jump cost
        let jump = Math.abs(heights[ind] - heights[ind - j]) + dp(ind - j);
        // upadte min cost
        minSteps = Math.min(minSteps, jump);
      }
    }
    return minSteps;
  }
  // we try to get to last index of array, not index after array in this case
  return dp(n - 1);
};

// Time: O(n * k) there are n heights, and for each heigh we consider k steps
// Space: O(n)

// Recursion + memoization
var frogJump = (heights, k) => {
  const n = heights.length;

  const memo = {};

  function dp(ind) {
    if (ind in memo) return memo[ind];

    // base case
    if (ind === 0) return 0;

    // consider every possible jump from current index (1, 2, ..., k)
    let minSteps = Infinity;
    for (let j = 1; j <= k; j++) {
      // if jump is possible (in range of array)
      if (ind - j >= 0) {
        // calculate jump cost
        let jump = Math.abs(heights[ind] - heights[ind - j]) + dp(ind - j);
        // upadte min cost
        minSteps = Math.min(minSteps, jump);
      }
    }
    return (memo[ind] = minSteps);
  }
  // we try to get to last index of array, not index after array in this case
  return dp(n - 1);
};

// Tabulation
var frogJump = (heights, k) => {
  const n = heights.length;

  const dp = new Array(n).fill(0);

  dp[0] = 0;

  // for each dp array index, we will calculate the min cost of all possible jumps
  for (let ind = 1; ind < n; ind++) {
    // same for-loop technique to calculate min steps over k jump distances
    let minSteps = Infinity;
    for (let j = 1; j <= k; j++) {
      if (ind - j >= 0) {
        let jump = Math.abs(heights[ind] - heights[ind - j]) + dp[ind - j];
        minSteps = Math.min(minSteps, jump);
      }
    }
    // update dp array with minSteps
    dp[ind] = minSteps;
  }
  return dp[n - 1];
};

// Time: O(n * k)
// Space: O(n)

// Tabulation - optimized
// This problem cannot be optimized, because need to carry k values, and if k = n, you need to store all values

// Time: O(n)
// Space: O(k) = O(n)
