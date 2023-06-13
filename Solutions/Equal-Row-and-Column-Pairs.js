/**
 * @param {number[][]} grid
 * @return {number}
 */
// Hash map
var equalPairs = function (grid) {
  const n = grid.length;

  const rows = {};
  for (let i = 0; i < n; i++) {
    const row = grid[i].join("#");
    rows[row] = rows[row] + 1 || 1;
  }

  let count = 0;
  for (let i = 0; i < n; i++) {
    let col = [];
    for (let j = 0; j < n; j++) {
      col.push(grid[j][i]);
    }
    const colKey = col.join("#");
    if (rows[colKey] > 0) {
      count += rows[colKey];
    }
  }
  return count;
};
// TC: O(n^2)
// SC: O(n)
