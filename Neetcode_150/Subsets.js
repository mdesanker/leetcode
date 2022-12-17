/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const res = [];

  const subset = [];
  function dfs(i) {
    // i is index of number currently at
    // base case: out of bounds of nums array
    if (i >= nums.length) {
      // push copy of subset to res array
      res.push(subset.slice());
      return;
    }

    // decision to include nums[i]
    subset.push(nums[i]);
    dfs(i + 1);

    // decision not to include nums[i];
    subset.pop(); // remove nums[i]
    dfs(i + 1);
  }
  dfs(0);
  return res;
};

// Time: O(n * 2^n) 2^n to generate a subset, then each subset can be of length n
// Space: O(n) to track subset array
