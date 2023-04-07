/**
 * @param {number[][]} grid
 * @return {number}
 */
// DFS
var numEnclaves = function (grid) {
  const ROWS = grid.length,
    COLS = grid[0].length;

  function dfs(r, c) {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return 0;
    if (grid[r][c] !== 1) return 0;

    grid[r][c] = 0;
    return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1);
  }

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (
        grid[r][c] === 1 &&
        (r === 0 || r === ROWS - 1 || c === 0 || c === COLS - 1)
      ) {
        bfs(r, c);
      }
    }
  }

  let count = 0;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c] === 1) {
        count += bfs(r, c);
      }
    }
  }
  return count;
};
// TC: O(r * c) first and second pass nested for-loops, both n^2 complexity
// SC: O(r * c) worst case scenario, everything except borders is land, so almost entire grid is in recursive stack

// BFS
var numEnclaves = function (grid) {
  const ROWS = grid.length,
    COLS = grid[0].length;
  const dir = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  function bfs(r, c) {
    const q = [[r, c]];
    let num = 0;
    while (q.length) {
      let len = q.length;
      for (let i = 0; i < len; i++) {
        const [r, c] = q.shift();
        if (grid[r][c] !== 1) continue;
        grid[r][c] = 0;
        num++;
        for (let [dr, dc] of dir) {
          let row = r + dr,
            col = c + dc;
          if (row < 0 || row >= ROWS || col < 0 || col >= COLS) continue;
          if (grid[row][col] !== 1) continue;
          q.push([row, col]);
        }
      }
    }
    return num;
  }

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (
        grid[r][c] === 1 &&
        (r === 0 || r === ROWS - 1 || c === 0 || c === COLS - 1)
      ) {
        bfs(r, c);
      }
    }
  }

  let count = 0;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c] === 1) {
        count += bfs(r, c);
      }
    }
  }
  return count;
};
// TC: O(r * c) first and second pass nested for-loops, both n^2 complexity
// SC: O(r * c) worst case scenario, everything except borders is land, so almost entire grid is in recursive stack
