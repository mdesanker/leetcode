/**
 * @param {string[]} words
 * @return {number}
 */
var longestStrChain = function (words) {
  const n = words.length;
  // sort by length
  words.sort((a, b) => a.length - b.length);

  // print longest increasing subsequence
  const dp = new Array(n).fill(1);
  let max = 1;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (compare(words[i], words[j]) && dp[i] < 1 + dp[j]) {
        dp[i] = 1 + dp[j];
      }
    }
    if (dp[i] > max) {
      max = dp[i];
    }
  }
  return max;

  // compare if a can follow b
  function compare(a, b) {
    if (a.length !== b.length + 1) return false;
    let i = 0,
      j = 0;
    // if i !== j, increment i (because a is longer)
    while (i < a.length) {
      if (j < b.length && a[i] === b[j]) {
        i++;
        j++;
      } else {
        i++;
      }
    }
    return i === a.length && j === b.length;
  }
};

// Time: O(n^2)
// Space: O(n)
