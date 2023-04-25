/**
 * @param {string} s1
 * @param {string} s2
 * @return {string}
 */
// Recursion + Memoization
var minWindow = function (s1, s2) {
  const n = s1.length,
    m = s2.length;
  let start = -Infinity,
    end = Infinity;

  const memo = [...new Array(n)].map(() => new Array(m).fill(-1));

  function dp(i, j) {
    if (j === m) return i;
    if (i === n) return Infinity;

    if (memo[i][j] !== -1) return memo[i][j];

    let res = Infinity;
    if (s1[i] === s2[j]) res = Math.min(res, dp(i + 1, j + 1));
    res = Math.min(res, dp(i + 1, j));

    if (j === 0) {
      if (res - i <= end - start) (start = i), (end = res);
    }
    return (memo[i][j] = res);
  }
  dp(0, 0);
  return end === Infinity ? "" : s1.slice(start, end);
};
// TC: O(nm)
// SC: O(nm)
