/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  // rows and cols of matrix are fixed
  const ROWS = matrix.length,
    COLS = matrix[0].length;

  // use binary search to find the right row
  let top = 0,
    bottom = ROWS - 1;
  while (top <= bottom) {
    const row = top + Math.floor((bottom - top) / 2);
    // if target is greater than last element in middle row, shift top pointer
    if (target > matrix[row][COLS - 1]) {
      top = row + 1;
      // if target less than smallest element in middle row, shift bottom pointer
    } else if (target < matrix[row][0]) {
      bottom = row - 1;
    } else {
      break;
    }
  }

  // if didn't find valid row, return false
  if (!(top <= bottom)) return false;

  // found correct row, set in variable
  const row = top + Math.floor((bottom - top) / 2);

  // use binary search to find right col
  let left = 0,
    right = COLS - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (target < matrix[row][mid]) {
      right = mid - 1;
    } else if (target > matrix[row][mid]) {
      left = mid + 1;
    } else {
      return true;
    }
  }
  // if target doesn't exist
  return false;
};

// Time: O(logN + logM) where N is number of rows and M is number of columns
// Space: O(1)
