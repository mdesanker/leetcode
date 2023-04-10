/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  const ROWS = matrix.length,
    COLS = matrix[0].length;

  let l = 0,
    r = ROWS * COLS;
  while (l < r) {
    let mid = l + Math.floor((r - l) / 2);
    let midVal = matrix[Math.floor(mid / COLS)][mid % COLS];

    if (midVal === target) return true;

    if (midVal > target) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }
  return false;
};
// Time: O(log(n * m))
// Space: O(1)

var searchMatrix = function (matrix, target) {
  const ROWS = matrix.length,
    COLS = matrix[0].length;

  // if matrix is empty, then return false because we can't find any value
  if (ROWS === 0) return false;

  // initialize pointers to first and last indices in the matrix
  // treat it as if matrix has been flattened into one continuous array
  let l = 0,
    r = ROWS * COLS - 1;
  while (l <= r) {
    // will need to calculate midElement from midIndex since not as straightforward as a single array
    let midIndex = l + Math.floor((r - l) / 2);
    // floor division of midIndex by column length will give the row index
    // modulus of midIndex by column length will give the index column index
    let midElement = matrix[Math.floor(midIndex / COLS)][midIndex % COLS];

    if (target === midElement) return true;
    else if (target < midElement) {
      r = midIndex - 1;
    } else {
      l = midIndex + 1;
    }
  }
  // did not find target value in matrix
  return false;
};

// Time: O(log(n * m))
// Space: O(1)

/**
In this approach, we treat the matrix as if it has been flattened into a single, continuous array.
Edge case: if matrix is empty, return false because you won't find any value in an empty matrix

Initialize a pointer to beginning and end of matrix. A matrix is row * cols cells, so the last cell is rows * cols - 1
It is easy to calculate the midIndex, but need some work to calculate midElement so we can check how it compares to target.

Row = Math.floor(midIndex / COLS)
Col = midIndex % COLS

Floor division by column length will tell how many rows to traverse
Modulus division by column length will give the "remainder", how many columns to traverse in target row

Return false at end if make it all the way through the matrix without finding the target
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

/** 
The rows are ordered, and the values within the rows are ordered overall. This will allow us to use binary search.
We will use binary search to find the row that could contain the target value, then use binary search witihn that row to see if target exists.

First, binary search the rows, initializing points to beginning and end of rows
Calculate mid point.
There are three possibilities:
1. target is smaller than the first value in the row
  Need to search the rows before the mid point row, set bottom pointer to mid - 1
2. target is greater than the second value in the row
  Need to search the rows after mid point row, set top pointer to mid + 1
3. target is greater than smallest value in the row and smaller than the greatest value in the row
  Target falls within the range of mid point row, break out of loop as we have found target row

If we broke out of the find row binary search loop by breaking the top <= bottom condition, then we need to return false
Check this with if (!(top <= bottom)) return false

If that wasn't the case, we can redefine the row using the top and bottom pointers
Run binary search in this row after initializing two pointers to beginning and ending of row
If we find the target, then return true
If we search the row and never find the target, then return false

TC: O(logr + logc) binary search on rows (O(logn) time complexity), the binary search on cols (O(logn) time complexity)
SC: O(1) constant memory for pointers
*/
