/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
// Recursion
var isScramble = function (s1, s2) {
  function dp(s1, s2) {
    if (s1 === s2) return true;
    else if (s1.length !== s2.length) return false;
    else if (s1.length <= 1) return s1 === s2;

    for (let i = 1; i < s1.length; i++) {
      const noSwap =
        dp(s1.slice(0, i), s2.slice(0, i)) && dp(s1.slice(i), s2.slice(i));
      const swap =
        dp(s1.slice(0, i), s2.slice(s1.length - i)) &&
        dp(s1.slice(i), s2.slice(0, s1.length - i));
      if (swap || noSwap) return true;
    }
    return false;
  }
  return dp(s1, s2);
};
// Time: Exponential
// Space: O(n)

// Recursion + Memoization
var isScramble = function (s1, s2) {
  const memo = {};
  function dp(s1, s2) {
    if (s1 === s2) return true;
    else if (s1.length !== s2.length) return false;
    else if (s1.length <= 1) return s1 === s2;

    const key = s1 + s2;
    if (key in memo) return memo[key];

    for (let i = 1; i < s1.length; i++) {
      const noSwap =
        dp(s1.slice(0, i), s2.slice(0, i)) && dp(s1.slice(i), s2.slice(i));
      const swap =
        dp(s1.slice(0, i), s2.slice(s1.length - i)) &&
        dp(s1.slice(i), s2.slice(0, s1.length - i));
      if (swap || noSwap) return (memo[key] = true);
    }
    return (memo[key] = false);
  }
  return dp(s1, s2);
};
// Time: O(n^4)
// Space: O(n^3)
