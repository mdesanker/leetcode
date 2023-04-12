/**
Solution: DFS/BFS

Identify target color to change. If target === color we can short-circuit and return image immediately
 */
// BFS
var floodFill = function (image, sr, sc, color) {
  const ROWS = image.length,
    COLS = image[0].length;

  const target = image[sr][sc];

  const q = [[sr, sc]];
  const dir = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  if (target === color) return image;

  while (q.length) {
    let len = q.length;
    for (let i = 0; i < len; i++) {
      const [r, c] = q.shift();
      image[r][c] = color;

      for (let [dr, dc] of dir) {
        let row = r + dr,
          col = c + dc;
        if (row < 0 || row >= ROWS || col < 0 || col >= COLS) continue;
        if (image[row][col] !== target) continue;
        q.push([row, col]);
      }
    }
  }
  return image;
};
// TC: O(rc)
// SC: O(rc)

// DFS
var floodFill = function (image, sr, sc, color) {
  const ROWS = image.length,
    COLS = image[0].length;

  const target = image[sr][sc];

  if (target === color) return image;

  function dfs(r, c) {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
    if (image[r][c] !== target) return;

    image[r][c] = color;

    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  dfs(sr, sc);
  return image;
};
// TC: O(rc)
// SC: O(rc)
