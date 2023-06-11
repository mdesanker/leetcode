/**
 * @param {number[][]} grid
 * @return {number}
 */
// Brute force
var countNegatives = function (grid) {
  const m = grid.length,
    n = grid[0].length;

  let count = 0;

  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (grid[i][j] < 0) count++;
    }
  }
  return count;
};
// TC: O(n^2)
// SC: O(1)

// Binary Search
var countNegatives = function (grid) {
  const m = grid.length,
    n = grid[0].length;

  function bs(row) {
    let l = 0,
      r = n;
    while (l < r) {
      let mid = l + Math.floor((r - l) / 2);
      if (grid[row][mid] < 0) {
        r = mid;
      } else {
        l = mid + 1;
      }
    }
    return l;
  }

  let count = 0;

  for (let i = 0; i < m; i++) {
    count += n - bs(i);
  }
  return count;
};
// TC: O(mlogn)
// SC: O(1)

// Linear Traversal
var countNegatives = function (grid) {
  const m = grid.length,
    n = grid[0].length;

  let count = 0;
  let currNegIndex = n - 1;

  for (const row of grid) {
    while (row[currNegIndex] < 0) currNegIndex--;
    count += n - (currNegIndex + 1);
  }
  return count;
};
// TC: O(n + m)
// SC: O(1)
