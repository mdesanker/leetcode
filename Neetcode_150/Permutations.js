/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const res = [];

  function dfs(curr, used) {
    // base case - how we know we have reached a solution
    if (curr.length === nums.length) {
      res.push(curr.slice());
      return;
    }

    // how we branch (generate possible children)
    for (let i = 0; i < nums.length; i++) {
      // skip nums that have been used
      if (used[i]) continue;

      // include new num on curr path
      curr.push(nums[i]);
      used[i] = true;

      // recursion
      dfs(curr, used);

      // backtrack/clean up
      curr.pop();
      used[i] = false;
    }
  }

  // user array to track which values have been used
  dfs([], Array(nums.length).fill(false));
  return res;
};

// Time: O(n * n!) there are n! permutations for a set of n numbers. Inserting number into permuation of size n takes O(n) time
// Space: O(n * n!)
