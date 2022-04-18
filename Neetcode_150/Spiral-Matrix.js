/**
 * @param {number[][]} matrix
 * @return {number[]}
 */

const spiralOrder = function (matrix) {
  const res = [];

  let top = 0,
    bottom = matrix.length - 1,
    left = 0,
    right = matrix[0].length - 1;

  let dir = 0;

  while (top <= bottom && left <= right) {
    if (dir === 0) {
      // add elements left to right along top
      for (let i = left; i <= right; i++) {
        res.push(matrix[top][i]);
      }
      top++;
    } else if (dir === 1) {
      // add elements top to bottom along right
      for (let i = top; i <= bottom; i++) {
        res.push(matrix[i][right]);
      }
      right--;
    } else if (dir === 2) {
      // add elements right to left along bottom
      for (let i = right; i >= left; i--) {
        res.push(matrix[bottom][i]);
      }
      bottom--;
    } else if (dir === 3) {
      // add elements bottom to top along left
      for (let i = bottom; i >= top; i--) {
        res.push(matrix[i][left]);
      }
      left++;
    }
    // increment direction by 1
    dir = (dir + 1) % 4;
  }
  return res;
};

/*
Time: O(N * M)
Space: O(N * M)
*/
