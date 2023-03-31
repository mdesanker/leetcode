/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */

// DP Implementation
var isInterleave = function (s1, s2, s3) {
  // check lengths add up
  if (s1.length + s2.length !== s3.length) return false;

  // initialize DP 2D array
  const dp = [];
  for (let i = 0; i < s1.length + 1; i++) {
    dp.push(new Array(s2.length + 1).fill(false));
  }
  // initialize corner value as true
  dp[s1.length][s2.length] = true;

  for (let i = s1.length; i >= 0; i--) {
    for (let j = s2.length; j >= 0; j--) {
      // recursive steps
      // if character in s1 matches character in s3, increment i pointer
      if (i < s1.length && s1[i] === s3[i + j] && dp[i + 1][j]) {
        dp[i][j] = true;
      }
      // if character in s2 matches character in s3, increment j pointer
      if (j < s2.length && s2[j] === s3[i + j] && dp[i][j + 1]) {
        dp[i][j] = true;
      }

      // if neither condition triggered, position already set to false
    }
  }
  return dp[0][0];
};

// Time: O(n * m) n = s1.length, m = s2.length
// Space: O(n * m) for 2D array
// Can be done in O(n) space by only caching previous row

// Caching Implementation
var isInterleave = function (s1, s2, s3) {
  const cache = new Map();

  // i pointer for s1
  // j pointer for s2
  // k = i + j
  function dfs(i, j) {
    const key = `${i}#${j}`;

    // base case
    // i, j, and k out of bounds
    if (i === s1.length && j === s2.length && i + j === s3.length) return true;
    // if in cache
    if (cache.has(key)) return cache.get(key);

    // recursive steps
    // if character in s1 matches character in s3, increment i pointer
    if (i < s1.length && s1[i] === s3[i + j] && dfs(i + 1, j)) return true;
    // if character in s2 matches character in s3, increment j pointer
    if (j < s2.length && s2[j] === s3[i + j] && dfs(i, j + 1)) return true;

    // else store in cache and return false
    // don't need to cache true values because can immediately return true when find valid combination
    cache.set(key, false);
    return false;
  }
  return dfs(0, 0);
};

// Time: O(n * m) n = s1.length, m = s2.length
// Space: O(n * m)

/**
 * Brute force - DFS
 * Time: O(2^(n + m))
 */
