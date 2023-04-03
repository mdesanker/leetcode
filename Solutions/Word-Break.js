/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
// Recursion [TLE]
var wordBreak = function (s, wordDict) {
  const n = s.length;
  const wordSet = new Set(wordDict);

  function dp(ind) {
    if (ind === n) return true;

    for (let i = ind; i < n; i++) {
      if (wordSet.has(s.slice(ind, i + 1)) && dp(i + 1)) return true;
    }
    return false;
  }
  return dp(0);
};
// TC: O(2^n)
// SC: O(n)

// Recursion + Memoization
var wordBreak = function (s, wordDict) {
  const n = s.length;
  const wordSet = new Set(wordDict);
  const memo = Array(n).fill(-1);

  function dp(ind) {
    if (ind === n) return true;

    if (memo[ind] !== -1) return memo[ind];

    for (let i = ind; i < n; i++) {
      if (wordSet.has(s.slice(ind, i + 1)) && dp(i + 1))
        return (memo[ind] = true);
    }
    return (memo[ind] = false);
  }
  return dp(0);
};
// TC: O(n^3)
// SC: O(n)

// Tabulation
var wordBreak = function (s, wordDict) {
  const n = s.length;
  const wordSet = new Set(wordDict);
  const dp = Array(n + 1).fill(false);
  dp[n] = true;

  for (let i = n - 1; i >= 0; i--) {
    for (let j = i; j < n; j++) {
      if (wordSet.has(s.slice(i, j + 1)) && dp[j + 1]) dp[i] = true;
    }
  }
  return dp[0];
};
// TC: O(n^3)
// SC: O(n)

// Neetcode
var wordBreak = function (s, wordDict) {
  // create dp array
  const dp = new Array(s.length + 1).fill(false);
  dp[s.length] = true;

  // iterate backwards through string s
  for (let i = s.length - 1; i >= 0; i--) {
    // at each position, compare against every word in wordDict
    for (let word of wordDict) {
      // if enough length left and slice = word
      if (i + word.length <= s.length && s.slice(i, i + word.length) === word) {
        // set current position to value of position after word
        dp[i] = dp[i + word.length];
      }
      // if set to true, break loop to minimize iterations
      if (dp[i]) {
        break;
      }
    }
  }
  return dp[0];
};

// n = s.length
// m = wordDict.length

// Time: O(n^3) two nested loops and additional n for word comparison
// Space: O(n) for dp array
