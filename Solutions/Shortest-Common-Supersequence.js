/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
var shortestCommonSupersequence = function (str1, str2) {
  const n = str1.length,
    m = str2.length;

  // generate dp array
  const dp = [...new Array(n + 1)].map(() => new Array(m + 1).fill(0));

  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < m + 1; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // build string from dp array
  // similar to "Print Longest Common Subsequence" but we will add elements to res string when there is not a match between str1[i - 1] and str2[j - 1]
  let i = n,
    j = m;
  let res = "";
  while (i > 0 && j > 0) {
    if (str1[i - 1] === str2[j - 1]) {
      res = str1[i - 1] + res;
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      res = str1[i - 1] + res;
      i--;
    } else {
      res = str2[j - 1] + res;
      j--;
    }
  }

  // check if there are residual elements in either string and apprend to front of res before returning
  if (i > 0) return str1.slice(0, i) + res;
  else if (j > 0) return str2.slice(0, j) + res;
  return res;
};

// Time: O(n * m)
// Space: O(n * m)
