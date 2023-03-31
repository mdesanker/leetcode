/**
 * @param {string} s
 * @return {number}
 */
// Recursion
var minInsertions = function (s) {
  const s2 = s.split("").reverse().join("");
  const N = s.length;

  function dp(i, j) {
    if (i < 0 || j < 0) return 0;

    if (s[i] === s2[j]) {
      return 1 + dp(i - 1, j - 1);
    } else {
      return Math.max(dp(i, j - 1), dp(i - 1, j));
    }
  }
  return N - dp(N - 1, N - 1);
};

// Time: O(2^(n + n))
// Space: O(n + n)

// Recursion + Memoization
var minInsertions = function (s) {
  const s2 = s.split("").reverse().join("");
  const N = s.length;
  const memo = {};

  function dp(i, j) {
    const key = `${i}#${j}`;
    if (key in memo) return memo[key];

    if (i < 0 || j < 0) return 0;

    if (s[i] === s2[j]) {
      return (memo[key] = 1 + dp(i - 1, j - 1));
    } else {
      return (memo[key] = Math.max(dp(i, j - 1), dp(i - 1, j)));
    }
  }
  return N - dp(N - 1, N - 1);
};

// Time: O(n^2)
// Space: O(n^2)

// Tabulation
var minInsertions = function (s) {
  const s2 = s.split("").reverse().join("");
  const N = s.length;

  const dp = [...new Array(N + 1)].map(() => new Array(N + 1).fill(0));

  for (let i = 1; i < N + 1; i++) {
    for (let j = 1; j < N + 1; j++) {
      if (s[i - 1] === s2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
      }
    }
  }
  return N - dp[N][N];
};

// Time: O(n^2)
// Space: O(n^2)

// Tabulation - Optimized
var minInsertions = function (s) {
  const s2 = s.split("").reverse().join("");
  const N = s.length;

  let dp = new Array(N + 1).fill(0);

  for (let i = 1; i < N + 1; i++) {
    let temp = new Array(N + 1).fill(0);
    for (let j = 1; j < N + 1; j++) {
      if (s[i - 1] === s2[j - 1]) {
        temp[j] = 1 + dp[j - 1];
      } else {
        temp[j] = Math.max(temp[j - 1], dp[j]);
      }
    }
    dp = temp;
  }
  return N - dp[N];
};

// Time: O(n^2)
// Space: O(n)
