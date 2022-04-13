/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */

const setZeroes = function (matrix) {
  let m = matrix.length,
    n = matrix[0].length;

  let row0 = false,
    col0 = false;

  // set zeroes in top row and left col as markers
  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      if (matrix[row][col] === 0) {
        // if there is a zero in a marker row or col, set variable to true
        if (row === 0) row0 = true;
        if (col === 0) col0 = true;

        // if zero, set corresponding cell in marker row and col to 0
        matrix[0][col] = 0;
        matrix[row][0] = 0;
      }
    }
  }

  // set inner cells to zero
  for (let row = 1; row < m; row++) {
    for (let col = 1; col < n; col++) {
      // if zero in corresponding marker row, set cell to zero
      if (matrix[0][col] === 0 || matrix[row][0] === 0) {
        matrix[row][col] = 0;
      }
    }
  }

  // update marker row and col
  if (row0) {
    for (let col = 0; col < n; col++) {
      matrix[0][col] = 0;
    }
  }

  if (col0) {
    for (let row = 0; row < m; row++) {
      matrix[row][0] = 0;
    }
  }
};

/*
Time: O(M * N)
Space: O(1)
*/
