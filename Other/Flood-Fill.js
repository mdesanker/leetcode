/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @return {number[][]}
 */
var floodFill = function (image, sr, sc, color) {
  const ROWS = image.length,
    COLS = image[0].length;
  // store starting color in a variable because it will change after first iteration
  const start = image[sr][sc];

  function dfs(r, c) {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
    if (image[r][c] !== start) return;

    image[r][c] = color;

    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  if (start === color) return image;

  dfs(sr, sc);
  return image;
};

// Time: O(r * c)
// Space: O(r * c)
