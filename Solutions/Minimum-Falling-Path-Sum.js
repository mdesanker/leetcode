/**
 * @param {number[][]} matrix
 * @return {number}
 */
// Recursion
var minFallingPathSum = function (matrix) {
  const n = matrix.length;

  function dp(r, c) {
    // must check for out of bounds BEFORE returning a matrix value
    if (c < 0 || c >= n) return Infinity;
    if (r === 0) return matrix[r][c];

    let left = dp(r - 1, c - 1);
    let mid = dp(r - 1, c);
    let right = dp(r - 1, c + 1);

    return matrix[r][c] + Math.min(left, mid, right);
  }

  // entire row can be starting point, so must scan and return min
  let min = Infinity;
  for (let i = 0; i < n; i++) {
    const val = dp(n - 1, i);
    min = Math.min(min, val);
  }
  return min;
};

// Time: O(n * 3^n) 3 possibilities at every node, and the depth of the recursion tree is n (equivalent to 3-ary recursion tree)
// Space: O(n) the recursive stack is the height of the tree

// Recursion + Memoization
var minFallingPathSum = function (matrix) {
  const n = matrix.length;
  const memo = {};

  function dp(r, c) {
    const key = `${r}#${c}`;
    if (key in memo) return memo[key];

    // must check for out of bounds BEFORE returning a matrix value
    if (c < 0 || c >= n) return Infinity;
    if (r === 0) return matrix[r][c];

    let left = dp(r - 1, c - 1);
    let mid = dp(r - 1, c);
    let right = dp(r - 1, c + 1);

    return (memo[key] = matrix[r][c] + Math.min(left, mid, right));
  }

  // entire row can be starting point, so must scan and return min
  let min = Infinity;
  for (let i = 0; i < n; i++) {
    const val = dp(n - 1, i);
    min = Math.min(min, val);
  }
  return min;
};

// Time: O(n^2) compute result for every cell once and store in cache
// Space: O(n^2) cache value for every cell

// Tabulation
var minFallingPathSum = function (matrix) {
  const n = matrix.length;

  const dp = [];
  for (let i = 0; i < n; i++) {
    dp.push(new Array(n).fill(0));
  }

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (r === 0) dp[r][c] = matrix[r][c];
      else {
        let left = (mid = right = Infinity);
        if (c > 0) left = dp[r - 1][c - 1];
        mid = dp[r - 1][c];
        if (c < n - 1) right = dp[r - 1][c + 1];

        dp[r][c] = matrix[r][c] + Math.min(left, mid, right);
      }
    }
  }
  return Math.min(...dp[n - 1]);
};

// Time: O(n^2) traverse every cell
// Space: O(n^2) dp array is same size as matrix

// Tabulation - Optimization 1
var minFallingPathSum = function (matrix) {
  const n = matrix.length;

  let dp = new Array(n).fill(0);

  for (let r = 0; r < n; r++) {
    let temp = new Array(n).fill(0);
    for (let c = 0; c < n; c++) {
      if (r === 0) temp[c] = matrix[r][c];
      else {
        let left = (mid = right = Infinity);
        if (c > 0) left = dp[c - 1];
        mid = dp[c];
        if (c < n - 1) right = dp[c + 1];

        temp[c] = matrix[r][c] + Math.min(left, mid, right);
      }
    }
    dp = temp;
  }
  return Math.min(...dp);
};

// Time: O(n^2) traverse every cell
// Space: O(n) only store previous row

// Tabulation - Optimization 2
var minFallingPathSum = function (matrix) {
  const n = matrix.length;

  for (let r = 1; r < n; r++) {
    for (let c = 0; c < n; c++) {
      let left = (mid = right = Infinity);
      if (c > 0) left = matrix[r - 1][c - 1];
      mid = matrix[r - 1][c];
      if (c < n - 1) right = matrix[r - 1][c + 1];

      matrix[r][c] += Math.min(left, mid, right);
    }
  }
  return Math.min(...matrix[n - 1]);
};

// Time: O(n^2)
// Space: O(1) modify input array so no additional memory needed

var minFallingPathSum = function (matrix) {
  const n = matrix.length;

  for (let r = 1; r < n; r++) {
    for (let c = 0; c < n; c++) {
      left = matrix[r - 1][c - 1] || Infinity;
      mid = matrix[r - 1][c];
      right = matrix[r - 1][c + 1] || Infinity;

      matrix[r][c] += Math.min(left, mid, right);
    }
  }
  return Math.min(...matrix[n - 1]);
};

// Time: O(n^2)
// Space: O(1)
