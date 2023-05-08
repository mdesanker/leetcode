/**
 * @param {number[][]} mat1
 * @param {number[][]} mat2
 * @return {number[][]}
 */
// Naive Iteration
var multiply = function (mat1, mat2) {
  const ROWS1 = mat1.length,
    COLS1 = mat1[0].length;
  const ROWS2 = mat2.lemgth,
    COLS2 = mat2[0].length;

  const res = [...new Array(ROWS1)].map(() => new Array(COLS2).fill(0));

  for (let r = 0; r < ROWS1; r++) {
    for (let c = 0; c < COLS2; c++) {
      let total = 0;
      for (let i = 0; i < COLS1; i++) {
        total += mat1[r][i] * mat2[i][c];
      }
      res[r][c] = total;
    }
  }
  return res;
};
// TC: O(mkn)
// SC: O(1);
