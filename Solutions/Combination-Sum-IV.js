/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// Backtracking [TLE]
// var combinationSum4 = function(nums, target) {
//     const n = nums.length;
//     let count = 0;

//     function backtrack(sum) {
//         if (sum === target) {
//             count++;
//             return;
//         }
//         if (sum > target) return;

//         for (let i = 0; i < n; i++) {
//             backtrack(sum + nums[i]);
//         }
//     }
//     backtrack(0);
//     return count;
// };

// Recursion + Memoization
var combinationSum4 = function (nums, target) {
  const memo = new Array(target + 1).fill(-1);

  function dp(remain) {
    if (remain === 0) return 1;

    if (memo[remain] !== -1) return memo[remain];

    let count = 0;
    for (let num of nums) {
      if (num <= remain) {
        count += dp(remain - num);
      }
    }
    return (memo[remain] = count);
  }
  return dp(target);
};
// TC: O(T * N)
// SC: O(T)

// Tabulation
var combinationSum4 = function (nums, target) {
  // minor optimization
  // nums.sort((a, b) => a - b);
  const dp = new Array(target + 1).fill(0);
  dp[0] = 1;

  for (let remain = 1; remain < target + 1; remain++) {
    let count = 0;
    for (let num of nums) {
      if (num <= remain) {
        count += dp[remain - num];
      }
      // minor optimization
      // else break;
    }
    dp[remain] = count;
  }
  return dp[target];
};
// TC: O(T * N)
// SC: O(T)
