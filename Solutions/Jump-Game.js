/**
 * @param {number[]} nums
 * @return {boolean}
 */
// Greedy
var canJump = function (nums) {
  let goal = nums.length - 1;
  const n = nums.length;
  for (let i = n - 2; i >= 0; i--) {
    if (nums[i] + i >= goal) goal = i;
  }
  return goal === 0;
};
// TC: O(n)
// SC: O(1)

// Recursion
var canJump = function (nums) {
  let n = nums.length;

  function dp(i) {
    if (i === n - 1) return true;

    const furthest = Math.min(i + nums[i], n - 1);
    for (let j = i + 1; j <= furthest; j++) {
      if (dp(j)) return true;
    }
    return false;
  }
  return dp(0);
};
// TC: O(2^n)
// SC: O(n)

// Recursion + Memoization
var canJump = function (nums) {
  let n = nums.length;
  const memo = new Array(n).fill(-1);

  function dp(i) {
    if (i === n - 1) return true;

    if (memo[i] !== -1) return memo[i];

    const furthest = Math.min(i + nums[i], n - 1);
    for (let j = i + 1; j <= furthest; j++) {
      if (dp(j)) return (memo[i] = true);
    }
    return (memo[i] = false);
  }
  return dp(0);
};
// TC: O(n^2)
// SC: O(n)

// Tabulation
var canJump = function (nums) {
  let n = nums.length;
  const dp = new Array(n).fill(false);
  dp[n - 1] = true;

  for (let i = n - 2; i >= 0; i--) {
    const furthest = Math.min(i + nums[i], n - 1);
    for (let j = i + 1; j <= furthest; j++) {
      if (dp[j]) dp[i] = true;
    }
  }
  return dp[0];
};
// TC: O(n^2)
// SC: O(n)
