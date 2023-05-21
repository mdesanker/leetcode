/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestBridge = function (grid) {
  const n = grid.length;
  const dir = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  const q = [];

  function dfs(r, c) {
    if (r < 0 || r >= n || c < 0 || c >= n) return;
    if (grid[r][c] !== 1) return;

    q.push([r, c]);
    grid[r][c] = 2;

    for (let [dr, dc] of dir) {
      let row = r + dr,
        col = c + dc;
      dfs(row, col);
    }
  }

  // find first piece of land
  function findFirst() {
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (grid[r][c] === 1) {
          return [r, c];
        }
      }
    }
  }

  const [firstR, firstC] = findFirst();
  // fill queue with first island
  dfs(firstR, firstC);

  // bfs to find shortest distance to second island
  let count = 0;
  while (q.length) {
    let len = q.length;
    for (let i = 0; i < len; i++) {
      const [r, c] = q.shift();

      for (let [dr, dc] of dir) {
        let row = r + dr,
          col = c + dc;
        if (row < 0 || row >= n || col < 0 || col >= n) continue;
        if (grid[row][col] === 1) return count;
        else if (grid[row][col] === 0) {
          q.push([row, col]);
          grid[row][col] = -1;
        }
      }
    }
    count++;
  }
  return count;
};
// TC: O(n^2)
// SC: O(n^2)
