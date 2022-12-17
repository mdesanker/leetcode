/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  const res = [];

  // i tracks which candidates we are allowed to use
  function dfs(i, curr, total) {
    // base cases
    if (total === target) {
      // push copy of curr so can keep using
      res.push(curr.slice());
      return;
    }
    if (i >= candidates.length || total > target) {
      return;
    }

    // decision to include candidate
    curr.push(candidates[i]);
    dfs(i, curr, total + candidates[i]);

    // decision to exclude candidate
    curr.pop();
    dfs(i + 1, curr, total);
  }

  dfs(0, [], 0);
  return res;
};

// Time: O(2^n) where n is target value
// Space: O(n)
