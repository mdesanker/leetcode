/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
// Recursion
var isMatch = function (s, p) {
  const n = s.length,
    m = p.length;

  function dp(i, j) {
    if (i < 0 && j < 0) return true;
    if (i < 0 && j >= 0) {
      if (p[j] !== "*") return false;
      for (let k = 1; k < j + 1; k++) {
        if (k % 2 === 1 && p[k] !== "*") return false;
      }
      return true;
    }
    if (i >= 0 && j < 0) return false;

    if (s[i] === p[j] || p[j] === ".") {
      return dp(i - 1, j - 1);
    } else if (p[j] === "*") {
      // prev char is not "." and does not match, me can't include the "char*"" pair
      if (p[j - 1] !== "." && p[j - 1] !== s[i]) {
        return dp(i, j - 2);
        // either skip "char*" or use once
      } else {
        return dp(i, j - 2) || dp(i - 1, j);
      }
    } else {
      return false;
    }
  }
  return dp(n - 1, m - 1);
};

// Time: Exponential
// Space: n + m

// Recursion + Memoization
var isMatch = function (s, p) {
  const n = s.length,
    m = p.length;
  const memo = {};

  function dp(i, j) {
    const key = `${i}#${j}`;
    if (key in memo) return memo[key];

    if (i < 0 && j < 0) return true;
    if (i < 0 && j >= 0) {
      if (p[j] !== "*") return false;
      for (let k = 1; k < j + 1; k++) {
        if (k % 2 === 1 && p[k] !== "*") return false;
      }
      return true;
    }
    if (i >= 0 && j < 0) return false;

    if (s[i] === p[j] || p[j] === ".") {
      return (memo[key] = dp(i - 1, j - 1));
    } else if (p[j] === "*") {
      // prev char is not "." and does not match, me can't include the "char*"" pair
      if (p[j - 1] !== "." && p[j - 1] !== s[i]) {
        return (memo[key] = dp(i, j - 2));
        // either skip "char*" or use once
      } else {
        return (memo[key] = dp(i, j - 2) || dp(i - 1, j));
      }
    } else {
      return (memo[key] = false);
    }
  }
  return dp(n - 1, m - 1);
};

// Time: O(n * m)
// Space: O(n * m)
