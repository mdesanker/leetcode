/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestPathBinaryMatrix = function (grid) {
  const ROWS = grid.length,
    COLS = grid[0].length;

  // edge case: start is not valid, immediately return -1
  if (grid[0][0] !== 0) return -1;

  const q = [[0, 0]];

  const visited = [];
  for (let r = 0; r < ROWS; r++) {
    visited.push(new Array(COLS).fill(false));
  }

  const dir = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  let dist = 1;

  while (q.length) {
    let len = q.length;
    for (let i = 0; i < len; i++) {
      const [r, c] = q.shift();
      visited[r][c] = true;

      if (r === ROWS - 1 && c === COLS - 1) return dist;

      for (let [dr, dc] of dir) {
        let row = r + dr,
          col = c + dc;
        if (row < 0 || row >= ROWS || col < 0 || col >= COLS) continue;
        if (grid[row][col] !== 0) continue;
        if (visited[row][col]) continue;

        visited[row][col] = true;
        q.push([row, col]);
      }
    }
    dist++;
  }
  return -1;
};

// Time: O(r * c) potentially have to traverse entire matrix
// Space: O(r * c) for visited grid
