/**
 * @param {number} n
 * @param {number[]} cuts
 * @return {number}
 */
// Recursion
var minCost = function (n, cuts) {
  cuts.sort((a, b) => a - b);

  function dp(l, r) {
    let res = Infinity;
    for (let cut of cuts) {
      if (cut <= l || cut >= r) continue;

      const cost = r - l;
      const leftCost = dp(l, cut);
      const rightCost = dp(cut, r);
      res = Math.min(res, cost + leftCost + rightCost);
    }
    return res === Infinity ? 0 : res;
  }
  return dp(0, n);
};
// TC: Exponential
// SC: O(n)

// Recursion + Memoization
var minCost = function (n, cuts) {
  cuts.sort((a, b) => a - b);
  const memo = {};

  function dp(l, r) {
    const key = `${l}#${r}`;
    if (memo[key]) return memo[key];

    let res = Infinity;
    for (let cut of cuts) {
      if (cut <= l || cut >= r) continue;

      const cost = r - l;
      const leftCost = dp(l, cut);
      const rightCost = dp(cut, r);
      res = Math.min(res, cost + leftCost + rightCost);
    }
    return (memo[key] = res === Infinity ? 0 : res);
  }
  return dp(0, n);
};
// TC: O(nlogn)
// SC: O(n)
