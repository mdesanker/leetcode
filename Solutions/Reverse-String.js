/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
// Recursion
var reverseString = function (s) {
  function helper(l, r) {
    if (l < r) {
      [s[l], s[r]] = [s[r], s[l]];
      helper(l + 1, r - 1);
    }
  }
  helper(0, s.length - 1);
};
// TC: O(n)
// SC: O(n)

// Two Pointer
var reverseString = function (s) {
  let l = 0,
    r = s.length - 1;
  while (l < r) {
    [s[l], s[r]] = [s[r], s[l]];
    l++;
    r--;
  }
};
// TC: O(n)
// SC: O(1)
