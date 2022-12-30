/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s) {
  // edge cases
  if (!s || s.length === 0) return 0;
  if (s[0] === 0) return 0;

  const dp = new Array(s.length + 1).fill(0);

  // base cases
  dp[0] = 1;
  dp[1] = 1;

  // loop and fill rest of table
  for (let i = 2; i < s.length + 1; i++) {
    const oneDigit = Number(s.slice(i - 1, i)); // get previous single digit
    const twoDigit = Number(s.slice(i - 2, i)); // get previous single digit

    // add one for oneDigit as long as not = 0
    if (oneDigit !== 0) dp[i] += dp[i - 1];
    // add one for twoDigit if in range
    if (twoDigit >= 10 && twoDigit <= 26) dp[i] += dp[i - 2];
  }

  return dp[s.length];
};

// Time: O(n) to iterate length of string
// Space: O(n) length of dp array
