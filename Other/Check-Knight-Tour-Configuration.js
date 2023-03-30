/**
 * @param {number[][]} grid
 * @return {boolean}
 */
var checkValidGrid = function (grid) {
  const n = grid.length;

  // edge case
  if (grid[0][0] !== 0) return false;

  const dir = [
    [-2, 1],
    [-1, 2],
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, -1],
  ];

  function dfs(r, c, step) {
    // base cases
    if (r < 0 || r >= n || c < 0 || c >= n) return;
    if (grid[r][c] !== step) return;

    // success case
    if (step === n * n - 1) return true;

    // check all moves
    for (let [dr, dc] of dir) {
      let row = r + dr,
        col = c + dc;
      if (dfs(row, col, step + 1)) return true;
    }
    return false;
  }

  return dfs(0, 0, 0);
};
// Time: O(n^2) traverse entire grid
// Space: O(n^2) for recursive stack
