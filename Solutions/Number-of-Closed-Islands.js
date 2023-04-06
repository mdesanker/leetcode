/**
Solution: DFS or BFS

Either of the graph traversal algorithms will work
First we traverse the edge-connected islands, convert them to water
Then we traverse the surrounded islands. Every time we find a new surrounded island, we increment a counter

r = grid.length, c = grid[0].length
TC: O(rc)
SC: O(rc)
 */
// DFS
var closedIsland = function (grid) {
  const ROWS = grid.length,
    COLS = grid[0].length;

  function dfs(r, c) {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
    if (grid[r][c] !== 0) return;

    grid[r][c] = 1;

    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (
        grid[r][c] === 0 &&
        (r === 0 || r === ROWS - 1 || c === 0 || c === COLS - 1)
      ) {
        dfs(r, c);
      }
    }
  }

  let count = 0;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c] === 0) {
        count++;
        dfs(r, c);
      }
    }
  }
  return count;
};
// TC: O(rc)
// SC: O(rc)

// BFS
var closedIsland = function (grid) {
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
    while (q.length) {
      let len = q.length;
      for (let i = 0; i < len; i++) {
        const [r, c] = q.shift();
        grid[r][c] = 1;

        for (let [dr, dc] of dir) {
          let row = r + dr,
            col = c + dc;
          if (row < 0 || row >= ROWS || col < 0 || col >= COLS) continue;
          if (grid[row][col] !== 0) continue;
          q.push([row, col]);
        }
      }
    }
  }

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (
        grid[r][c] === 0 &&
        (r === 0 || r === ROWS - 1 || c === 0 || c === COLS - 1)
      ) {
        bfs(r, c);
      }
    }
  }

  let count = 0;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c] === 0) {
        count++;
        bfs(r, c);
      }
    }
  }
  return count;
};
// TC: O(rc)
// SC: O(rc)
