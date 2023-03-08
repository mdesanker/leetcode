/**
 * @param {number[][]} grid
 * @return {number}
 */
// Recursion
var minPathSum = function (grid) {
  const n = grid.length,
    m = grid[0].length;

  function dp(r, c) {
    // base cases
    if (r === 0 && c === 0) return grid[r][c];
    if (r < 0 || c < 0) return Infinity;

    // recurrence relationship
    let left = dp(r, c - 1);
    let up = dp(r - 1, c);

    // add current cell value to min of two possible paths
    return grid[r][c] + Math.min(left, up);
  }
  return dp(n - 1, m - 1);
};

// Time: O(2^(m * n)) for every cell, there are two options - up or left
// Space: O(n + m) the path length is the recursion depth

// Recursion + Memoization
var minPathSum = function (grid) {
  const n = grid.length,
    m = grid[0].length;
  const memo = {};

  function dp(r, c) {
    // check cache
    const key = `${r}#${c}`;
    if (key in memo) return memo[key];

    // base cases
    if (r === 0 && c === 0) return grid[r][c];
    if (r < 0 || c < 0) return Infinity;

    // recurrence relationship
    let left = dp(r, c - 1);
    let up = dp(r - 1, c);

    // add current cell value to min of two possible paths
    return (memo[key] = grid[r][c] + Math.min(left, up));
  }
  return dp(n - 1, m - 1);
};

// Time: O(n * m)
// Space: O(n + m)

// Tabulation
var minPathSum = function (grid) {
  const n = grid.length,
    m = grid[0].length;

  const dp = [];
  for (let i = 0; i < n; i++) {
    dp.push(new Array(m).fill(0));
  }

  dp[0][0] = grid[0][0];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (i === 0 && j === 0) dp[i][j] = grid[0][0];
      else {
        let left = (up = Infinity);
        if (j > 0) left = dp[i][j - 1];
        if (i > 0) up = dp[i - 1][j];
        dp[i][j] = grid[i][j] + Math.min(left, up);
      }
    }
  }
  return dp[n - 1][m - 1];
};

// Time: O(n * m)
// Space: O(n + m)

// Tabulation - Optimized
var minPathSum = function (grid) {
  const n = grid.length,
    m = grid[0].length;

  let dp = new Array(m).fill(0);

  dp[0] = grid[0][0];

  for (let i = 0; i < n; i++) {
    let temp = new Array(m).fill(0);
    for (let j = 0; j < m; j++) {
      if (i === 0 && j === 0) temp[j] = grid[0][0];
      else {
        let left = (up = Infinity);
        if (j > 0) left = temp[j - 1];
        if (i > 0) up = dp[j];
        temp[j] = grid[i][j] + Math.min(left, up);
      }
    }
    dp = temp;
  }
  return dp[m - 1];
};

// Time: O(n * m)
// Space: O(m)

// Tabulation - Optimized 2
var minPathSum = function (grid) {
  const n = grid.length,
    m = grid[0].length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (i === 0 && j === 0) continue;
      else {
        let left = (up = Infinity);
        if (j > 0) left = grid[i][j - 1];
        if (i > 0) up = grid[i - 1][j];
        grid[i][j] = grid[i][j] + Math.min(left, up);
      }
    }
  }
  return grid[n - 1][m - 1];
};

// Time: O(n * m)
// Space: O(1)

// Alternate solution using Djikstra's Shortest Path Algorithm
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
  const ROWS = grid.length,
    COLS = grid[0].length;

  const visited = [];
  for (let r = 0; r < ROWS; r++) {
    visited.push(new Array(COLS).fill(false));
  }

  const minHeap = new MinPriorityQueue();
  minHeap.enqueue([0, 0, grid[0][0]], 0);

  // can only move in two directions - down or right
  const dir = [
    [1, 0],
    [0, 1],
  ];

  while (minHeap.size()) {
    const [r, c, sum] = minHeap.dequeue().element;
    visited[r][c] = true;

    if (r === ROWS - 1 && c === COLS - 1) return sum;

    for (let [dr, dc] of dir) {
      let row = r + dr,
        col = c + dc;
      if (row < 0 || row >= ROWS || col < 0 || col >= COLS) continue;
      if (visited[row][col]) continue;

      minHeap.enqueue([row, col, sum + grid[row][col]], sum + grid[row][col]);
    }
  }
};

// Time: O(rc * log(rc))
// Space: O(r * c)
