// https://leetcode.com/problems/subsets-ii/solutions/1437563/js-backtracking/?orderBy=most_votes&languageTags=javascript

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function (nums) {
  const res = [];
  const curr = [];

  nums.sort((a, b) => a - b);

  function backtrack(ind) {
    res.push(curr.slice());
    for (let i = ind; i < nums.length; i++) {
      // make sure i > 0 before checking prev so not out of bound error
      // avoid duplicate values by checking previous in sorted array
      if (i > ind && nums[i] === nums[i - 1]) continue;

      curr.push(nums[i]);
      backtrack(i + 1);
      curr.pop();
    }
  }
  backtrack(0);
  return res;
};

// Time: O(n * 2^n) 2 choices per value (include or exclude) to the power of n for n values in input --> 2^n subsets. Each subset is at most length n
// Space: O(n * 2^n)

// Neetcode implementation

var subsetsWithDupNeet = function (nums) {
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
    // include nums[i]
    subset.push(nums[i]);
    dfs(i + 1);

    // exclude nums[i]
    subset.pop();
    // must skip all duplicates of nums[i] in order to exclude
    while (i + 1 < nums.length && nums[i] === nums[i + 1]) i++;
    dfs(i + 1);
  }

  dfs(0);
  return res;
};

/**
To build unique subsets, we need to sort the nums array so we can easily skip duplicates

Backtrack function
Parameters:
ind will be the index from which we can start choosing values
curr will be the current path

Base case:
We will push the curr array onto res every time the function is called
We do not wait for a certain requirement to be met

Recursive step:
Loop in the recursive step will control how many times the backtrack function is called
We will make the decision to include an element as we go along. 
If we encounter a repeat element, we will skip it

Loop from ind to the end of nums.length
Skip repeats by checking if current element === previous element once we have moved past first element

Then we push the element onto curr, call backtrack, then pop to clean the stack

Backtrack is called at index 0 because we want to consider all possible nums, and starting path is empty array

TC: O(n * 2^n) if every element is unique, we generate 2^n subsets, each subset has to be copied into res array which is O(n) operation, so total is O(n * 2^n)
SC: O(n) space needed to build the curr array
 */
