/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
  const res = [];
  const curr = [];

  // sort nums so duplicates can be skipped
  nums.sort((a, b) => a - b);

  function backtrack(nums) {
    // base case, all nums used up
    if (nums.length === 0) {
      res.push(curr.slice());
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      // skip dupes
      if (i > 0 && nums[i] === nums[i - 1]) continue;

      curr.push(nums[i]);
      // remove the used number from nums
      nums.splice(i, 1);

      backtrack(nums);

      // add used number back to nums
      nums.splice(i, 0, curr.pop());
    }
  }

  backtrack(nums);
  return res;
};

// Time: O(n!) - Each dfs call makes (n-1) dfs calls
// Space: O(n!) - If all nums are unique, a unique combo is yielded at end of every branch.
