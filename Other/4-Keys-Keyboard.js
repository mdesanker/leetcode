/**
 * @param {number} n
 * @return {number}
 */
// Recursion [TLE]
var maxA = function (n) {
  function dp(i, curr, copied) {
    // base cases
    if (i === 1) return curr + 1;
    if (i === 2) return curr + Math.max(2, 2 * copied);

    // type single char
    let single = copied < 2 ? dp(i - 1, curr + 1, copied) : 0;
    // select all and copy
    let selectCopy = curr > 2 ? dp(i - 2, curr, curr) : 0;
    // paste copied chars
    let paste = copied !== 0 ? dp(i - 1, curr + copied, copied) : 0;
    return Math.max(single, selectCopy, paste);
  }
  return dp(n, 0, 0);
};
// Time: O(3^n)
// Space: O(n)

// Recursion + Memoization
var maxA = function (n) {
  const memo = {};

  function dp(i, curr, copied) {
    // base cases
    if (i === 1) return curr + 1;
    if (i === 2) return curr + Math.max(2, 2 * copied);

    const key = `${i}#${curr}#${copied}`;
    if (key in memo) return memo[key];

    // type single char
    let single = copied < 2 ? dp(i - 1, curr + 1, copied) : 0;
    // select all and copy
    let selectCopy = curr > 2 ? dp(i - 2, curr, curr) : 0;
    // paste copied chars
    let paste = copied !== 0 ? dp(i - 1, curr + copied, copied) : 0;
    return (memo[key] = Math.max(single, selectCopy, paste));
  }
  return dp(n, 0, 0);
};
// Time: O(n^3)
// Space: O(n^3)
