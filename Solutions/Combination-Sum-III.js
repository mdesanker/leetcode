/**
Solution: Backtracking
 */
var combinationSum3 = function (k, n) {
  const res = [];

  function backtrack(i, curr, sum) {
    if (curr.length === k && sum === n) {
      res.push(curr.slice());
      return;
    }
    if (i > 9 || sum > n || curr.length > k) return;

    curr.push(i);
    backtrack(i + 1, curr, sum + i);
    curr.pop();
    backtrack(i + 1, curr, sum);
  }
  backtrack(1, [], 0);
  return res;
};
// TC: O(9!k/(9 - k)!) lol
// SC: O(k)
