/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  // initialize bottom row with length n (columns) to 1 (only single path from any bottom row position)
  let row = new Array(n).fill(1);

  for (let i = 0; i < m - 1; i++) {
    // initialize row above
    const newRow = new Array(n).fill(1);
    // iterate through new row backwards starting at second last position
    for (let j = n - 2; j >= 0; j--) {
      // add cell to right and cell below
      newRow[j] = newRow[j + 1] + row[j];
    }
    // overwrite old row with new row
    row = newRow;
  }
  // return value in starting position
  return row[0];
};

// Time: O(n * m) iterate through every cell
// Space: O(n) length of a row
