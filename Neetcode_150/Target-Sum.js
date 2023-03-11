/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// Recursion
var findTargetSumWays = function (nums, target) {
  const N = nums.length;

  function dp(i, sum) {
    if (i === N) {
      if (sum === target) return 1;
      else return 0;
    }

    let plus = dp(i + 1, sum + nums[i]);
    let minus = dp(i + 1, sum - nums[i]);
    return plus + minus;
  }
  return dp(0, 0);
};

// Time: O(2^n)
// Space: O(n)

// Recursion + Memoization
var findTargetSumWays = function (nums, target) {
  const N = nums.length;
  const memo = {};

  function dp(i, sum) {
    const key = `${i}#${sum}`;
    if (key in memo) return memo[key];

    if (i === N) {
      if (sum === target) return 1;
      else return 0;
    }

    let plus = dp(i + 1, sum + nums[i]);
    let minus = dp(i + 1, sum - nums[i]);
    return (memo[key] = plus + minus);
  }
  return dp(0, 0);
};

// Time: O(n * t) where t = sum(nums)
// Space: O(n * t) for cache

// Tabulation
// This is weird one
