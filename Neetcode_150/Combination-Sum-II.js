/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
  const res = [];
  const curr = [];

  // sort in ascending order so can skip duplicates
  candidates.sort((a, b) => a - b);

  // ind tracks which values can be used
  // curr tracks current array
  // total tracks current sum
  function dfs(ind, total) {
    // base cases
    // valid answer
    if (total === target) {
      res.push(curr.slice());
    }
    // invalid answer
    if (total > target) {
      return;
    }

    for (let i = ind; i < candidates.length; i++) {
      // skip duplicate candidates
      if (i > ind && candidates[i] === candidates[i - 1]) continue;

      // include candidates[i]
      curr.push(candidates[i]);
      dfs(i + 1, total + candidates[i]);
      curr.pop();
    }
  }
  dfs(0, 0);
  return res;
};

// Time: O(2^n) where n is target value
// Space: O(n)

/**
Want to find all possible combinations that sum to target, each number can only be used once, but there are duplicate numbers

Sort candidates, so we can skip duplicates

Backtrack function
Parameters:
ind to track the index from which we can start choosing elements
curr is the curr collection of elements
sum is the sum of current numbers

Base case:
If sum === target, we push a copy of curr onto res
If ind out of range or sum > target return immediately

Recursive case:
We will consider all the elements from ind to end of candidates array, use for-loop
If we have a duplicate number, we skip to prevent duplicate combinations

Put candidate at index i onto curr, call backtrack function incrementing index to i + 1, the pop from curr to clear

Call backtrack function at beginning of candidates array, i = 0, empty array for curr, and initial sum = 0

TC: O(2^n) 
    2^n combinations and we need to check all of them
    nlogn for sorting
SC: O(n) for the curr array
    O(n) for the recursive stack
 */
