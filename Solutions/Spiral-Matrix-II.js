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
  let count = 1;

  while (l <= r && t <= b) {
    for (let i = l; i <= r; i++) {
      matrix[t][i] = count++;
    }
    t++;
    for (let i = t; i <= b; i++) {
      matrix[i][r] = count++;
    }
    r--;
    for (let i = r; i >= l; i--) {
      matrix[b][i] = count++;
    }
    b--;
    for (let i = b; i >= t; i--) {
      matrix[i][l] = count++;
    }
    l++;
  }
  return matrix;
};
// TC: O(n^2)
// SC: O(1)
