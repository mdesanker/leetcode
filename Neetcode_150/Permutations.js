// https://leetcode.com/problems/permutations/solutions/685868/dfs-backtracking-python-java-javascript-picture/?orderBy=most_votes&languageTags=javascript

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

/**
Each permutaiton will need to contain one of every element

Base case:
If curr contains every element, its length  will be the same as nums
So we check if curr.length === nums.length to push the copy of curr to res

Will use a secondary data structure (list) to keep track of which indices have been used


Loop through every index, check if index is unused, then add it to curr and call function again, then backtrack
Each step, we have n choices, then n - 1, then n - 2, ..., 1

Array to keep track of which indices have been used will be an array of length nums.length filled with false values
When an index is used, we change the value at the index to true

TC: O(n * n!) we have n! permutations and each permutation is length n
SC: O(n!) there are n! permutations we have to hold
 */
