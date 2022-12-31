/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
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
