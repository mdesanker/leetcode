/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */

const rotate = function (matrix) {
  // set dimensions for square matrix
  let l = 0,
    r = matrix.length - 1;

  while (l < r) {
    for (let i = 0; i < r - l; i++) {
      let top = l,
        bottom = r;

      // save top left
      let topLeft = matrix[top][l + i];

      // bottom left to top left
      matrix[top][l + i] = matrix[bottom - i][l];

      // bottom right to bottom left
      matrix[bottom - i][l] = matrix[bottom][r - i];

      // top right to bottom right
      matrix[bottom][r - i] = matrix[top + i][r];

      // top left to top right
      matrix[top + i][r] = topLeft;
    }
    // incremenet inwards by 1
    l++;
    r--;
  }
};

/*
Time: O(N ** 2)
Space: O(1)
*/
