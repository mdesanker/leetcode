/**
 * @param {number[][]} triangle
 * @return {number}
 */
// Recursion
var minimumTotal = function (triangle) {
  const ROWS = triangle.length;

  function dp(r, c) {
    if (r === 0 && c === 0) return triangle[0][0];
    if (c < 0 || c > r) return Infinity;

    let left = dp(r - 1, c - 1);
    let right = dp(r - 1, c);
    return triangle[r][c] + Math.min(left, right);
  }
  let min = Infinity;
  for (let i = 0; i < ROWS; i++) {
    min = Math.min(min, dp(ROWS - 1, i));
  }
  return min;
};

// Time: O(2^(r + c) * c)
// Space: O(r * c)

// Recursion + Memoization
var minimumTotal = function (triangle) {
  const ROWS = triangle.length;
  const memo = {};

  function dp(r, c) {
    const key = `${r}#${c}`;
    if (key in memo) return memo[key];

    if (r === 0 && c === 0) return triangle[0][0];
    if (c < 0 || c > r) return Infinity;

    let left = dp(r - 1, c - 1);
    let right = dp(r - 1, c);
    return (memo[key] = triangle[r][c] + Math.min(left, right));
  }
  let min = Infinity;
  for (let i = 0; i < ROWS; i++) {
    min = Math.min(min, dp(ROWS - 1, i));
  }
  return min;
};

// Time: O(r + c)
// Space: O(r * c)

// Tabulation
var minimumTotal = function (triangle) {
  const ROWS = triangle.length;
  const dp = [];
  for (let i = 0; i < ROWS; i++) {
    dp.push(new Array(i + 1).fill(0));
  }
  dp[0][0] = triangle[0][0];

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < r + 1; c++) {
      if (r === 0 && c === 0) dp[r][c] = triangle[0][0];
      else {
        let left = (right = Infinity);
        if (c > 0) left = dp[r - 1][c - 1];
        if (c < r) right = dp[r - 1][c];
        dp[r][c] = triangle[r][c] + Math.min(left, right);
      }
    }
  }
  return Math.min(...dp[ROWS - 1]);
};

// Time: O(r + c)
// Space: O(r * c)

// Tabulation - Optimized 1
var minimumTotal = function (triangle) {
  const ROWS = triangle.length;

  let dp = [];

  for (let r = 0; r < ROWS; r++) {
    let temp = new Array(r + 1).fill(0);
    for (let c = 0; c < r + 1; c++) {
      if (r === 0 && c === 0) temp[c] = triangle[0][0];
      else {
        let left = (right = Infinity);
        if (c > 0) left = dp[c - 1];
        if (c < r) right = dp[c];
        temp[c] = triangle[r][c] + Math.min(left, right);
      }
    }
    dp = temp;
  }
  return Math.min(...dp);
};

// Tabulation - Optimized 2
var minimumTotal = function (triangle) {
  const ROWS = triangle.length;

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < r + 1; c++) {
      if (r === 0 && c === 0) continue;
      else {
        let left = (right = Infinity);
        if (c > 0) left = triangle[r - 1][c - 1];
        if (c < r) right = triangle[r - 1][c];
        triangle[r][c] += Math.min(left, right);
      }
    }
  }
  return Math.min(...triangle[ROWS - 1]);
};
// Time: O(r + c)
// Space: O(1)
