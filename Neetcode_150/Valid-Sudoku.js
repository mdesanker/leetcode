/**
 * @param {character[][]} board
 * @return {boolean}
 */

const isValidSudoku = function (board) {
  // iterate through each row of board
  for (let r = 0; r < 9; r++) {
    // will check all rows, all columns, and all 3 x 3 squares are valid
    let rows = new Set(),
      cols = new Set(),
      squares = new Set();

    for (let c = 0; c < 9; c++) {
      let rowVal = board[r][c], // iterating row by row
        colVal = board[c][r], // iterating col by col
        // Math.floor division for rows
        // % for cols
        squareVal =
          board[3 * Math.floor(r / 3) + Math.floor(c / 3)][
            3 * (r % 3) + (c % 3)
          ];

      if (rowVal !== ".") {
        if (rows.has(rowVal)) return false;
        rows.add(rowVal);
      }

      if (colVal !== ".") {
        if (cols.has(colVal)) return false;
        cols.add(colVal);
      }

      if (squareVal !== ".") {
        if (squares.has(squareVal)) return false;
        squares.add(squareVal);
      }
    }
  }
  return true;
};

/*
Time: O(N ** 2)
Space: O(N ** 2)
*/
