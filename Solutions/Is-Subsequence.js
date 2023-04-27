/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function (s, t) {
  const n = s.length,
    m = t.length;
  let j = 0;
  for (let i = 0; i < m; i++) {
    if (s[j] === t[i]) j++;
  }
  return j === n;
};
// TC: O(n)
// SC: O(n)
