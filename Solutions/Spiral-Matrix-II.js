/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function (n) {
  const matrix = [...new Array(n)].map(() => new Array(n).fill(0));

  let l = 0,
    r = n - 1,
    t = 0,
    b = n - 1;
  let count = 1,
    dir = 0;

  while (l <= r && t <= b) {
    if (dir === 0) {
      for (let i = l; i <= r; i++) {
        matrix[t][i] = count++;
      }
      t++;
    } else if (dir === 1) {
      for (let i = t; i <= b; i++) {
        matrix[i][r] = count++;
      }
      r--;
    } else if (dir === 2) {
      for (let i = r; i >= l; i--) {
        matrix[b][i] = count++;
      }
      b--;
    } else if (dir === 3) {
      for (let i = b; i >= t; i--) {
        matrix[i][l] = count++;
      }
      l++;
    }
    dir = (dir + 1) % 4;
  }
  return matrix;
};
// TC: O(n^2)
// SC: O(1)
