# DP on Strings

## Longest Common Subsequence

This question is basis for almost every string DP question

```js
// Recursion + Memoization
var longestCommonSubsequence = function (text1, text2) {
  const n = text1.length,
    m = text2.length;
  const memo = {};

  function dp(i, j) {
    const key = `${i}#${j}`;
    if (key in memo) return memo[key];

    if (i < 0 || j < 0) return 0;

    if (text1[i] === text2[j]) {
      return (memo[key] = 1 + dp(i - 1, j - 1));
    } else {
      return (memo[key] = Math.max(dp(i - 1, j), dp(i, j - 1)));
    }
  }
  return dp(n - 1, m - 1);
};
// TC: O(n * m), SC: O(n * m + (n + m))

// Tabulation
var longestCommonSubsequence = function (text1, text2) {
  const n = text1.length,
    m = text2.length;

  const dp = [...new Array(n + 1)].map(() => new Array(m + 1).fill(0));

  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < m + 1; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[n][m];
};
// TC: O(n * m), SC: O(n * m)

// Tabulation - Space optimized
var longestCommonSubsequence = function (text1, text2) {
  const n = text1.length,
    m = text2.length;

  let dp = new Array(m + 1).fill(0);

  for (let i = 1; i < n + 1; i++) {
    let temp = new Array(m + 1).fill(0);
    for (let j = 1; j < m + 1; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        temp[j] = 1 + dp[j - 1];
      } else {
        temp[j] = Math.max(dp[j], temp[j - 1]);
      }
    }
    dp = temp;
  }
  return dp[m];
};
// TC: O(n * m), SC: O(m)
```

## Print Longest Common Subsequence

Build dp array, then move backwards through largest elements adding chars that match

```js
var longestCommonSubsequence = function (text1, text2) {
  const n = text1.length,
    m = text2.length;

  const dp = [...new Array(n + 1)].map(() => new Array(m + 1).fill(0));

  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < m + 1; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  let res = "";
  let i = n,
    j = m;
  while (i && j) {
    if (text1[i - 1] === text2[j - 1]) {
      res = text1[i - 1] + res;
      i--;
      j--;
    } else if (dp[i][j - 1] > dp[i - 1][j]) {
      j--;
    } else {
      i--;
    }
  }
  return res;
};
// TC: O(n * m), SC: O(n * m)
```

## Longest Common Substring

Return length of longest contiguous common substring

```js
// Recursion + Memoization
var longestCommonSubstring = function (text1, text2) {
  const n = text1.length,
    m = text2.length;
  const memo = {};

  function dp(i, j) {
    const key = `${i}#${j}`;
    if (key in memo) return memo[key];

    if (i < 0 || j < 0) return 0;

    if (text1[i] === text2[j]) {
      return (memo[key] = 1 + dp(i - 1, j - 1));
    } else {
      return (memo[key] = 0);
    }
  }
  return dp(n - 1, m - 1);
};
// TC: O(n * m), SC: O(n * m + max(n, m))

// Tabulation
var longestCommonSubstring = function (text1, text2) {
  const n = text1.length,
    m = text2.length;

  const dp = [...new Array(n + 1)].map(() => new Array(m + 1).fill(0));

  let max = 0;
  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < m + 1; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
        max = Math.max(max, dp[i][j]);
      } else {
        dp[i][j] = 0;
      }
    }
  }
  return max;
};
// TC: O(n * m), SC: O(n * m)

// Tabulation - Space optimized
var longestCommonSubstring = function (text1, text2) {
  const n = text1.length,
    m = text2.length;

  let dp = new Array(m + 1).fill(0);

  let max = 0;
  for (let i = 1; i < n + 1; i++) {
    let temp = new Array(m + 1).fill(0);
    for (let j = 1; j < m + 1; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        temp[j] = 1 + dp[j - 1];
        max = Math.max(max, temp[j]);
      } else {
        temp[j] = 0;
      }
    }
    dp = temp;
  }
  return max;
};
// TC: O(n * m), SC: O(m)
```

## Shortest Common Supersequence

Build 2D dp array for longest common subsequence, then use that to build the shortest common supersequence

```js
// Tabulation
var shortestCommonSupersequence = function (str1, str2) {
  const n = str1.length,
    m = str2.length;

  const dp = [...new Array(n + 1)].map(() => new Array(m + 1).fill(0));

  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < m + 1; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
      }
    }
  }

  let res = "";
  let i = n,
    j = m;
  while (i && j) {
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
  if (i > 0) return str1.slice(0, i) + res;
  else if (j > 0) return str2.slice(0, j) + res;
  return res;
};
// TC: O(n * m), SC: O(n * m)
```

## Edit Distance

Convert str1 into str2 using insert, delete, and replace operations

```js
// Recursion + Memoization
var minDistance = function (word1, word2) {
  const n = word1.length,
    m = word2.length;
  const memo = {};

  function dp(i, j) {
    const key = `${i}#${j}`;
    if (key in memo) return memo[key];

    if (i < 0) return j + 1;
    if (j < 0) return i + 1;

    if (word1[i] === word2[j]) {
      return (memo[key] = dp(i - 1, j - 1));
    } else {
      let ins = dp(i, j - 1);
      let del = dp(i - 1, j);
      let rep = dp(i - 1, j - 1);
      return (memo[key] = 1 + Math.min(ins, del, rep));
    }
  }
  return dp(n - 1, m - 1);
};
// TC: O(n * m), SC: O(n * m + (n + m))

// Tabulation
var minDistance = function (word1, word2) {
  const n = word1.length,
    m = word2.length;

  const dp = [...new Array(n + 1)].map(() => new Array(m + 1).fill(0));
  for (let i = 0; i < n + 1; i++) dp[i][0] = i;
  for (let j = 0; j < m + 1; j++) dp[0][j] = j;

  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < m + 1; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        let ins = dp[i][j - 1];
        let del = dp[i - 1][j];
        let rep = dp[i - 1][j - 1];
        dp[i][j] = 1 + Math.min(ins, del, rep);
      }
    }
  }
  return dp[n][m];
};
// TC: O(n * m), SC: O(n * m)

// Tabulation - Space optimized
var minDistance = function (word1, word2) {
  const n = word1.length,
    m = word2.length;

  let dp = new Array(m + 1).fill(0);
  for (let j = 0; j < m + 1; j++) dp[j] = j;

  for (let i = 1; i < n + 1; i++) {
    let temp = new Array(m + 1).fill(0);
    temp[0] = i;
    for (let j = 1; j < m + 1; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        temp[j] = dp[j - 1];
      } else {
        let ins = temp[j - 1];
        let del = dp[j];
        let rep = dp[j - 1];
        temp[j] = 1 + Math.min(ins, del, rep);
      }
    }
    dp = temp;
  }
  return dp[m];
};
// TC: O(n * m), SC: O(m)
```

## Distinct Subsequences

Return number of ways str2 can be made from str1. If chars match, we can either take or look for next matching char

```js
// Recursion + Memoization
var numDistinct = function (s, t) {
  const n = s.length,
    m = t.length;
  const memo = {};

  function dp(i, j) {
    const key = `${i}#${j}`;
    if (key in memo) return memo[key];

    if (j < 0) return 1;
    if (i < 0) return 0;

    if (s[i] === t[j]) {
      return (memo[key] = dp(i - 1, j - 1) + dp(i - 1, j));
    } else {
      return (memo[key] = dp(i - 1, j));
    }
  }
  return dp(n - 1, m - 1);
};
// TC: O(n * m), SC: O(n * m + n)

// Tabulation
var numDistinct = function (s, t) {
  const n = s.length,
    m = t.length;

  const dp = [...new Array(n + 1)].map(() => new Array(m + 1).fill(0));
  for (let i = 0; i < n + 1; i++) dp[i][0] = 1;

  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < m + 1; j++) {
      if (s[i - 1] === t[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }
  return dp[n][m];
};
// TC: O(n * m), SC: O(n * m)

// Tabulation - Space optimized
var numDistinct = function (s, t) {
  const n = s.length,
    m = t.length;

  let dp = new Array(m + 1).fill(0);
  dp[0] = 1;

  for (let i = 1; i < n + 1; i++) {
    let temp = new Array(m + 1).fill(0);
    temp[0] = 1;
    for (let j = 1; j < m + 1; j++) {
      if (s[i - 1] === t[j - 1]) {
        temp[j] = dp[j - 1] + dp[j];
      } else {
        temp[j] = dp[j];
      }
    }
    dp = temp;
  }
  return dp[m];
};
// TC: O(n * m), SC: O(m)
```

## Wildcard Matching

```js
// Recursion + Memoization
var isMatch = function (s, p) {
  const n = s.length,
    m = p.length;
  const memo = {};

  function dp(i, j) {
    const key = `${i}#${j}`;
    if (key in memo) return memo[key];

    if (i < 0 && j < 0) return true;
    if (j < 0 && i >= 0) return false;
    if (i < 0 && j >= 0) {
      for (let k = 0; k < j + 1; k++) {
        if (p[k] !== "*") return false;
      }
      return true;
    }

    if (s[i] === p[j] || p[j] === "?") {
      return (memo[key] = dp(i - 1, j - 1));
    } else if (p[j] === "*") {
      return (memo[key] = dp(i - 1, j) || dp(i, j - 1));
    }
    return (memo[key] = false);
  }
  return dp(n - 1, m - 1);
};
// TC: O(n * m), SC: O(n * m)

// Tabulation
var isMatch = function (s, p) {
  const n = s.length,
    m = p.length;

  const dp = [...new Array(n + 1)].map(() => new Array(m + 1).fill(false));

  // i === 0 && j === 0
  dp[0][0] = true;
  // i > 0 && j === 0 (default)
  for (let i = 1; i < n + 1; i++) dp[i][0] = false;
  // i === 0 && j > 0
  for (let j = 1; j < m + 1; j++) {
    let flag = true;
    for (let k = 1; k < j + 1; k++) {
      if (p[k - 1] !== "*") {
        flag = false;
        break;
      }
    }
    dp[0][j] = flag;
  }

  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < m + 1; j++) {
      if (s[i - 1] === p[j - 1] || p[j - 1] === "?") {
        dp[i][j] = dp[i - 1][j - 1];
      } else if (p[j - 1] === "*") {
        dp[i][j] = dp[i - 1][j] || dp[i][j - 1];
      } else {
        dp[i][j] = false;
      }
    }
  }
  return dp[n][m];
};
// TC: O(n * m), SC: O(n * m)

// Tabulation - Space optimized
var isMatch = function (s, p) {
  const n = s.length,
    m = p.length;

  let dp = new Array(m + 1).fill(false);

  // i === 0 && j === 0
  dp[0] = true;
  // i === 0 && j > 0
  for (let j = 1; j < m + 1; j++) {
    let flag = true;
    for (let k = 1; k < j + 1; k++) {
      if (p[k - 1] !== "*") {
        flag = false;
        break;
      }
    }
    dp[j] = flag;
  }

  for (let i = 1; i < n + 1; i++) {
    let temp = new Array(m + 1).fill(false);
    // i > 0 && j === 0 (default)
    temp[0] = false;
    for (let j = 1; j < m + 1; j++) {
      if (s[i - 1] === p[j - 1] || p[j - 1] === "?") {
        temp[j] = dp[j - 1];
      } else if (p[j - 1] === "*") {
        temp[j] = dp[j] || temp[j - 1];
      } else {
        temp[j] = false;
      }
    }
    dp = temp;
  }
  return dp[m];
};
// TC: O(n * m), SC: O(n * m)
```
