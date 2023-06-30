/**
 * @param {number} row
 * @param {number} col
 * @param {number[][]} cells
 * @return {number}
 */
// Brute Force [TLE]
var latestDayToCross = function (row, col, cells) {
  const grid = [...new Array(row)].map(() => new Array(col).fill(0));
  const dir = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  function bfs() {
    const q = [];
    for (let c = 0; c < col; c++) {
      if (grid[0][c] === 0) q.push([0, c]);
    }
    const visited = [...new Array(row)].map(() => new Array(col).fill(false));

    while (q.length) {
      let len = q.length;
      for (let i = 0; i < len; i++) {
        const [r, c] = q.shift();
        if (visited[r][c]) continue;
        visited[r][c] = true;

        if (r === row - 1) return true;

        for (let [dr, dc] of dir) {
          const r1 = r + dr,
            c1 = c + dc;
          if (r1 < 0 || r1 >= row || c1 < 0 || c1 >= col) continue;
          if (grid[r1][c1] === 1) continue;
          if (visited[r1][c1]) continue;
          q.push([r1, c1]);
        }
      }
    }
    return false;
  }

  for (let i = 0; i < cells.length; i++) {
    const [r, c] = cells[i];
    grid[r - 1][c - 1] = 1;
    if (!bfs()) return i;
  }
  return cells.length;
};
// TC: O(rc * cells)
// SC: O(rc)

// DFS/BFS + Binary Search
var latestDayToCross = function (row, col, cells) {
  const dir = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  function canCrossBFS(day) {
    const grid = [...new Array(row)].map(() => new Array(col).fill(0));
    const q = [];

    for (let i = 0; i <= day; i++) {
      const [r, c] = cells[i];
      grid[r - 1][c - 1] = 1;
    }
    console.log(grid);

    for (let c = 0; c < col; c++) {
      if (grid[0][c] === 0) {
        q.push([0, c]);
        grid[0][c] = -1;
      }
    }

    while (q.length) {
      let len = q.length;
      for (let i = 0; i < len; i++) {
        const [r, c] = q.shift();
        if (r === row - 1) return true;

        for (let [dr, dc] of dir) {
          const r1 = r + dr,
            c1 = c + dc;
          if (r1 < 0 || r1 >= row || c1 < 0 || c1 >= col) continue;
          if (grid[r1][c1] !== 0) continue;
          q.push([r1, c1]);
          grid[r1][c1] = -1;
        }
      }
    }
    return false;
  }

  function canCrossDFS(day) {
    const grid = [...new Array(row)].map(() => new Array(col).fill(0));
    for (let i = 0; i < day; i++) {
      const [r, c] = cells[i];
      grid[r - 1][c - 1] = 1;
    }

    function dfs(r, c) {
      if (r < 0 || r >= row || c < 0 || c >= col) return false;
      if (grid[r][c] !== 0) return false;

      if (r === row - 1) return true;

      grid[r][c] = -1;

      for (let [dr, dc] of dir) {
        const r1 = r + dr,
          c1 = c + dc;
        if (dfs(r1, c1)) return true;
      }
      return false;
    }

    for (let c = 0; c < col; c++) {
      if (grid[0][c] === 0 && dfs(0, c)) return true;
    }
    return false;
  }

  let l = 1,
    r = row * col;
  while (l < r) {
    let mid = l + Math.floor((r - l) / 2);
    if (canCross(mid)) {
      l = mid;
    } else {
      r = mid - 1;
    }
  }
  return l;
};
// TC: O(rc * log(rc))
// SC: O(rc)
