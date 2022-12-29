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
