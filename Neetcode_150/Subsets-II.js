/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function (nums) {
  const res = [];
  const subset = [];

  // sort ascending order so can skip repeat nums
  nums.sort((a, b) => a - b);

  function dfs(i) {
    // base case
    if (i >= nums.length) {
      res.push(subset.slice());
      return;
    }

    // recursive cases
    // include
    subset.push(nums[i]);
    dfs(i + 1);
    subset.pop();

    // exclude
    // while i in range and repeat nums, increment i
    while (i + 1 < nums.length && nums[i] === nums[i + 1]) i++;
    dfs(i + 1);
  }

  dfs(0);
  return res;
};

// Time: O(n * 2^n) 2 choices per value (include or exclude) to the power of n for n values in input --> 2^n subsets. Each subset is at most length n
// Space: O(n * 2^n)
