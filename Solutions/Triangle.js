/**
 * @param {number[][]} triangle
 * @return {number}
 */

/**
Normally with recursion we start from the last row and col, and move towards origin
But for this problem we would have multiple starting points (every index in last row)
So better to start from origin and move to last row
We choose the last row as the base case
This will automatically handle the variable end points because every path is possible from origin

Tabulation is the opposite of recursion (thumb rule), so we also do tabulation in opposite direction
Tabulation will be last to origin, otherwise we have to take min of last row since multiple end points
 */

// Recursion
var minimumTotal = function (triangle) {
  const ROWS = triangle.length;

  function dp(r, c) {
    if (r === ROWS - 1) return triangle[r][c];

    // right can never be out of bounds because following row always increases by 1
    let left = dp(r + 1, c);
    let right = dp(r + 1, c + 1);
    return triangle[r][c] + Math.min(left, right);
  }
  return dp(0, 0);
};

// Time: O(2^(r * c)) -> r = c - 1 -> O(r^2)
// Space: O(r) recursive stack is the height of the triangle

// Recursion + Memoization
var minimumTotal = function (triangle) {
  const ROWS = triangle.length;
  const memo = {};

  function dp(r, c) {
    const key = `${r}#${c}`;
    if (key in memo) return memo[key];

    if (r === ROWS - 1) return triangle[r][c];

    // right can never be out of bounds because following row always increases by 1
    let left = dp(r + 1, c);
    let right = dp(r + 1, c + 1);
    return (memo[key] = triangle[r][c] + Math.min(left, right));
  }
  return dp(0, 0);
};

// Time: O(r * c) -> r = c - 1 -> O(r^2)
// Space: O(r^2) for the cache

// Tabulation
var minimumTotal = function (triangle) {
  const ROWS = triangle.length;

  const dp = [];
  for (let r = 0; r < ROWS; r++) {
    dp.push(new Array(r + 1).fill(0));
  }

  for (let r = ROWS - 1; r >= 0; r--) {
    for (let c = 0; c < r + 1; c++) {
      if (r === ROWS - 1) dp[r][c] = triangle[r][c];
      else {
        let left = dp[r + 1][c];
        let right = dp[r + 1][c + 1];
        dp[r][c] = triangle[r][c] + Math.min(left, right);
      }
    }
  }
  return dp[0][0];
};

// Time: O(r + c)
// Space: O(r * c)

// Tabulation - Optimized 1
var minimumTotal = function (triangle) {
  const ROWS = triangle.length;

  let dp = [];

  for (let r = ROWS - 1; r >= 0; r--) {
    let temp = new Array(r + 1).fill(0);
    for (let c = 0; c < r + 1; c++) {
      if (r === ROWS - 1) temp[c] = triangle[r][c];
      else {
        let left = dp[c];
        let right = dp[c + 1];
        temp[c] = triangle[r][c] + Math.min(left, right);
      }
    }
    dp = temp;
  }
  return dp[0];
};

// Time: O(r + c)
// Space: O(c) - only store previous row

// Tabulation - Optimized 2
var minimumTotal = function (triangle) {
  const ROWS = triangle.length;

  for (let r = ROWS - 1; r >= 0; r--) {
    for (let c = 0; c < r + 1; c++) {
      if (r === ROWS - 1) continue;
      else {
        let left = triangle[r + 1][c];
        let right = triangle[r + 1][c + 1];
        triangle[r][c] += Math.min(left, right);
      }
    }
  }
  return triangle[0][0];
};
// Time: O(r + c)
// Space: O(1) - modify input array so no additional memory needed
