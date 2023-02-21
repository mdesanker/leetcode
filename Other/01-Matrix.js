/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function (mat) {
  const ROWS = mat.length,
    COLS = mat[0].length;

  const visited = [];
  for (let i = 0; i < ROWS; i++) {
    visited.push(new Array(COLS).fill(false));
  }

  const q = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (mat[r][c] === 0) {
        q.push([r, c]);
        visited[r][c] = true;
      }
    }
  }

  let dist = 0;

  function addCell(r, c) {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
    if (visited[r][c]) return;

    visited[r][c] = true;
    q.push([r, c]);
  }

  while (q.length) {
    let len = q.length;
    for (let i = 0; i < len; i++) {
      const [r, c] = q.shift();

      mat[r][c] = dist;

      addCell(r + 1, c);
      addCell(r - 1, c);
      addCell(r, c + 1);
      addCell(r, c - 1);
    }
    dist++;
  }
  return mat;
};

// Time: O(n^2)
// Space: O(n^2)
