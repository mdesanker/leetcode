# 2D DP

## Ninja Training

Given a matrix where each column corresponds to a skill, and the value in cell is the merit points earned for practicing that skill. Cannot practice same skill two days in row. Maximize points over all days (rows)

Base case: reach row 0
Recurrence: Each time a task is chosen, we move to next day and choose any other task

```js
// Recursion + Memoization
var ninjaTraining = function (n, points) {
  const memo = {};
  function dp(day, prev) {
    const key = `${day}#${prev}`;
    if (key in memo) return memo[key];

    // base case
    if (day === 0) {
      let max = -Infinity;
      for (let j = 0; j < n; j++) {
        if (j !== prev) {
          const val = points[day][j] + dp(day - 1, j);
          max = Math.max(max, val);
        }
      }
      return max;
    }

    // recurrence
    // iterate through every task in row and finx max
    let max = -Infinity;
    for (let j = 0; j < n; j++) {
      if (j !== prev) {
        const val = points[day][j] + dp(day - 1, j);
        max = Math.max(max, val);
      }
    }
    return (memo[key] = max);
  }
  return dp(n - 1, -1);
};
// TC: O(n^2), SC: O(n^2 + n)

// Tabulation
var ninjaTraining = function (n, points) {
  const dp = [...new Array(n)].map(() => new Array(n).fill(0));

  // base case
  for (let c = 0; c < n; c++) dp[0][c] = points[0][c];

  // recurrence
  for (let r = 1; r < n; r++) {
    for (let c = 0; c < n; c++) {
      let max = -Infinity;
      for (let j = 0; j < n; j++) {
        if (j !== c) {
          const val = points[day][j];
          max = Math.max(max, val);
        }
      }
      dp[r][c] = max + points[r][c];
    }
  }
  return Math.max(...dp[n - 1]);
};
// TC: O(n^2), SC: O(n^2)
```

## Unique Paths

Count number of paths from top-left to bottom-right

Base case: - if out of range return 0 - if at destination return 1
Recurrence: sum results from move right or down

```js
// Recursion + Memoization
var uniquePaths = function (m, n) {
  const memo = {};
  function dp(i, j) {
    const key = `${i}#${j}`;
    if (key in memo) return memo[key];

    if (i < 0 || j < 0) return 0;
    if (i === 0 && j === 0) return 1;

    let left = dp(i, j - 1);
    let up = dp(i - 1, j);
    return (memo[key] = left + up);
  }
  return dp(m - 1, n - 1);
};
// TC: O(n * m), SC: O(n * m + (n + m))

// Tabulation
var uniquePaths = function (m, n) {
  const dp = [...new Array(m)].map(() => new Array(n).fill(1));

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  return dp[m - 1][n - 1];
};
// TC: O(n * m), SC: O(n * m)

// Tabulation - Space optimized
var uniquePaths = function (m, n) {
  let dp = new Array(n).fill(1);

  for (let i = 1; i < m; i++) {
    let temp = new Array(n).fill(1);
    for (let j = 1; j < n; j++) {
      temp[j] = dp[j] + temp[j - 1];
    }
    dp = temp;
  }
  return dp[n - 1];
};
// TC: O(n * m), SC: O(n)
```

## Unique Paths II

Unique Paths but with obstacles

Base cases: - cell is in bounds and an obstacle return 0 - cell is out of bounds return 0 - cell is destination return 1
Recurrence: sum results from move right or down

```js
// Recursion + Memoization
var uniquePathsWithObstacles = function (grid) {
  const n = grid.length,
    m = grid[0].length;
  const memo = {};
  function dp(i, j) {
    const key = `${i}#${j}`;
    if (key in memo) return memo[key];

    if (i >= 0 && j >= 0 && grid[i][j] === 1) return 0;
    if (i < 0 || j < 0) return 0;
    if (i === 0 && j === 0) return 1;

    let left = dp(i, j - 1);
    let up = dp(i - 1, j);
    return (memo[key] = left + up);
  }
  return dp(n - 1, m - 1);
};
// TC: O(n * m), SC: O(n * m + (n + m))

// Tabulation
var uniquePathsWithObstacles = function (grid) {
  const n = grid.length,
    m = grid[0].length;

  const dp = [...new Array(n)].map(() => new Array(m).fill(0));
  dp[0][0] = 1;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j] === 1) dp[i][j] = 0;
      else if (i === 0 && j === 0) dp[i][j] = 1;
      else {
        let left = (up = 0);
        if (j > 0) left = dp[i][j - 1];
        if (i > 0) up = dp[i - 1][j];
        dp[i][j] = left + up;
      }
    }
  }
  return dp[n - 1][m - 1];
};
// TC: O(n * m), SC: O(n * m)

// Tabulation - Space optimized
var uniquePathsWithObstacles = function (grid) {
  const n = grid.length,
    m = grid[0].length;

  let dp = new Array(m).fill(0);
  dp[0] = 1;

  for (let i = 0; i < n; i++) {
    let temp = new Array(m).fill(0);
    for (let j = 0; j < m; j++) {
      if (grid[i][j] === 1) temp[j] = 0;
      else if (i === 0 && j === 0) temp[j] = 1;
      else {
        let left = (up = 0);
        if (j > 0) left = temp[j - 1];
        if (i > 0) up = dp[j];
        temp[j] = left + up;
      }
    }
    dp = temp;
  }
  return dp[m - 1];
};
// TC: O(n * m), SC: O(m)
```

## Minimum Path Sum

Return minimum path sum to get from top-left to bottom-right

```js
var minPathSum = function (grid) {
  const n = grid.length,
    m = grid[0].length;
  const memo = {};

  function dp(i, j) {
    const key = `${i}#${j}`;
    if (key in memo) return memo[key];

    if (i < 0 || j < 0) return Infinity;
    if (i === 0 && j === 0) return grid[i][j];

    let left = grid[i][j] + dp(i, j - 1);
    let up = grid[i][j] + dp(i - 1, j);
    return (memo[key] = Math.min(left, up));
  }
  return dp(n - 1, m - 1);
};
// TC: O(n * m), SC: O(n * m + (n + m))

// Tabulation
var minPathSum = function (grid) {
  const n = grid.length,
    m = grid[0].length;

  const dp = [...new Array(n)].map(() => new Array(m).fill(0));
  dp[0][0] = grid[0][0];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (i === 0 && j === 0) dp[i][j] = grid[0][0];
      else {
        let left = (up = Infinity);
        if (j > 0) left = grid[i][j] + dp[i][j - 1];
        if (i > 0) up = grid[i][j] + dp[i - 1][j];
        dp[i][j] = Math.min(left, up);
      }
    }
  }
  return dp[n - 1][m - 1];
};
// TC: O(n * m), SC: O(n * m)

// Tabulation - Space optimized
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
        if (j > 0) left = grid[i][j] + temp[j - 1];
        if (i > 0) up = grid[i][j] + dp[j];
        temp[j] = Math.min(left, up);
      }
    }
    dp = temp;
  }
  return dp[m - 1];
};
// TC: O(n * m), SC: O(m)
```

## Triangle

Reverse direction of top-down and bottom-up to make returning result simpler

```js
// Recursion + Memoization
var minimumTotal = function (triangle) {
  let n = triangle.length;
  const memo = {};

  function dp(i, j) {
    const key = `${i}#${j}`;
    if (key in memo) return memo[key];

    if (i === n) return 0;

    let left = triangle[i][j] + dp(i + 1, j);
    let right = triangle[i][j] + dp(i + 1, j + 1);
    return (memo[key] = Math.min(left, right));
  }
  return dp(0, 0);
};
// TC: O(n * m), SC: O(n * m + n)

// Tabulation
var minimumTotal = function (triangle) {
  let n = triangle.length;
  const dp = [...new Array(n)].map((_, i) => new Array(i + 1).fill(0));
  dp[n - 1] = triangle[n - 1];

  for (let i = n - 2; i >= 0; i--) {
    for (let j = 0; j < i + 1; j++) {
      let left = triangle[i][j] + dp[i + 1][j];
      let right = triangle[i][j] + dp[i + 1][j + 1];
      dp[i][j] = Math.min(left, right);
    }
  }
  return dp[0][0];
};
// TC: O(n * m), SC: O(n * m)

// Tabulation - Space optimized
var minimumTotal = function (triangle) {
  let n = triangle.length;

  let dp = triangle[n - 1];

  for (let i = n - 2; i >= 0; i--) {
    let temp = new Array(i + 1).fill(0);
    for (let j = 0; j < i + 1; j++) {
      let left = triangle[i][j] + dp[j];
      let right = triangle[i][j] + dp[j + 1];
      temp[j] = Math.min(left, right);
    }
    dp = temp;
  }
  return dp[0];
};
// TC: O(n * m), SC: O(n)
```

## Minimum Falling Path Sum

Multiple start and ending points. Need to scan all possible start points and find overall minimum

```js
// Recursion + Memoization
var minFallingPathSum = function (matrix) {
  const n = matrix.length,
    m = matrix[0].length;
  const memo = {};

  function dp(i, j) {
    const key = `${i}#${j}`;
    if (key in memo) return memo[key];

    if (j < 0 || j >= m) return Infinity;
    if (i < 0) return 0;

    let min = Infinity;
    for (let k = -1; k < 2; k++) {
      const val = matrix[i][j] + dp(i - 1, j + k);
      min = Math.min(min, val);
    }
    return (memo[key] = min);
  }

  let min = Infinity;
  for (let k = 0; k < m; k++) {
    const val = dp(n - 1, k);
    min = Math.min(min, val);
  }
  return min;
};
// TC: O(n * m * m), SC: O(n * m + n)

// Tabulation
var minFallingPathSum = function (matrix) {
  const n = matrix.length,
    m = matrix[0].length;
  const dp = [...new Array(n)].map(() => new Array(m).fill(0));
  dp[0] = matrix[0];

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < m; j++) {
      let left = (mid = right = Infinity);
      if (j > 0) left = dp[i - 1][j - 1];
      mid = dp[i - 1][j];
      if (j < m - 1) right = dp[i - 1][j + 1];
      dp[i][j] = matrix[i][j] + Math.min(left, mid, right);
    }
  }
  return Math.min(...dp[n - 1]);
};
// TC: O(n * m * m), SC: O(n * m)

// Tabulation - Space optimized
var minFallingPathSum = function (matrix) {
  const n = matrix.length,
    m = matrix[0].length;
  let dp = matrix[0];

  for (let i = 1; i < n; i++) {
    let temp = new Array(m).fill(0);
    for (let j = 0; j < m; j++) {
      let left = (mid = right = Infinity);
      if (j > 0) left = dp[j - 1];
      mid = dp[j];
      if (j < m - 1) right = dp[j + 1];
      temp[j] = matrix[i][j] + Math.min(left, mid, right);
    }
    dp = temp;
  }
  return Math.min(...dp);
};
// TC: O(n * m * m), SC: O(m)
```
