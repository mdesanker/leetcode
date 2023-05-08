/**
 * @param {number[][]} mat
 * @return {number}
 */
var diagonalSum = function (mat) {
  const n = mat.length;
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += mat[i][i];
    if (i !== n - i - 1) sum += mat[i][n - i - 1];
  }
  return sum;
};
// TC: O(n)
// SC: O(1)
