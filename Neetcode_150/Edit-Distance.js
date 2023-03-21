/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
// Recursion
var minDistance = function (word1, word2) {
  const n = word1.length,
    m = word2.length;

  // edge cases (optional)
  // if (n === 0 && m === 0) return 0;
  // if (n === 0) return m;
  // if (m === 0) return n;

  function dp(i, j) {
    // when one string is empty, return length of remaining string (index + 1)
    if (i < 0) return j + 1;
    if (j < 0) return i + 1;

    if (word1[i] === word2[j]) {
      return dp(i - 1, j - 1);
    } else {
      const ins = dp(i, j - 1);
      const del = dp(i - 1, j);
      const rep = dp(i - 1, j - 1);
      return 1 + Math.min(ins, del, rep);
    }
  }
  return dp(n - 1, m - 1);
};

// Time: O(3^max(n, m)) three possibilities for every non-matching char
// Space: O(max(n, m)) auxillary stack space for max length of words

// Recursion + Memoization
var minDistance = function (word1, word2) {
  const n = word1.length,
    m = word2.length;

  // edge cases
  // if (n === 0 && m === 0) return 0;
  // if (n === 0) return m;
  // if (m === 0) return n;

  const memo = {};

  function dp(i, j) {
    const key = `${i}#${j}`;
    if (key in memo) return memo[key];

    // when one string is empty, return length of remaining string (index + 1)
    if (i < 0) return j + 1;
    if (j < 0) return i + 1;

    if (word1[i] === word2[j]) {
      return (memo[key] = dp(i - 1, j - 1));
    } else {
      const ins = dp(i, j - 1);
      const del = dp(i - 1, j);
      const rep = dp(i - 1, j - 1);
      return (memo[key] = 1 + Math.min(ins, del, rep));
    }
  }
  return dp(n - 1, m - 1);
};

// Time: O(n * m)
// Space: O(n * m)

// Tabulation
var minDistance = function (word1, word2) {
  const n = word1.length,
    m = word2.length;

  // edge cases (optional)
  // if (n === 0 && m === 0) return 0;
  // if (n === 0) return m;
  // if (m === 0) return n;

  const dp = [...new Array(n + 1)].map(() => new Array(m + 1).fill(0));

  // switch to 1-indexing, so index in word corresponds to remaining length
  for (let i = 0; i < n + 1; i++) dp[i][0] = i;
  for (let i = 0; i < m + 1; i++) dp[0][i] = i;

  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < m + 1; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        const ins = dp[i][j - 1];
        const del = dp[i - 1][j];
        const rep = dp[i - 1][j - 1];
        dp[i][j] = 1 + Math.min(ins, del, rep);
      }
    }
  }
  return dp[n][m];
};

// Time: O(n * m)
// Space: O(n * m)

// Tabulation - Optimized
var minDistance = function (word1, word2) {
  const n = word1.length,
    m = word2.length;

  if (n === 0 && m === 0) return 0;
  if (n === 0) return m;
  if (m === 0) return n;

  let dp = new Array(m + 1).fill(0);

  // switch to 1-indexing, so index in word corresponds to remaining length
  for (let i = 0; i < m + 1; i++) dp[i] = i;

  for (let i = 1; i < n + 1; i++) {
    let temp = new Array(m + 1).fill(0);
    temp[0] = i;
    for (let j = 1; j < m + 1; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        temp[j] = dp[j - 1];
      } else {
        const ins = temp[j - 1];
        const del = dp[j];
        const rep = dp[j - 1];
        temp[j] = 1 + Math.min(ins, del, rep);
      }
    }
    dp = temp;
  }
  return dp[m];
};

// Time: O(n * m)
// Space: O(m)
