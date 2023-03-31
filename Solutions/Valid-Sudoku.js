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

/**
Every row, col, and 3x3 must not have repeat characters.
Use set for each row, col, and grid to check for uniqueness.
Iterate through every board piece. If no value (val === ".") skip.
Check if val is in set for corresponding row, col, and grid.
If val already exists, then return false, else add val to set.
If make it to the end of board, then return true

How to assign each coord to grid index: 3*Math.floor(r/3)+Math.floor(c/3)
Every group of 3 rows or cols has same result when floor divided by 3

Indices: 0 1 2 3 4 5 6 7 8
Group:   0 0 0 1 1 1 2 2 2 -> Math.floor(index / 3)

This generates a grid with each coord pair corresponding to a 3x3 matrix
    0 1 2
  _______
0 | 0 1 2
1 | 3 4 5
2 | 6 7 8 

So to relate each grid to an index 0 - 8, use 3 * row + col
index = 3 * Math.floor(row / 3) + Math.floor(col / 3)

TC: O(n^2) need to check every position in board, and each check in set is O(1) operation
SC: O(n^2) worst case scenario, board is full so need to store n sets of 
n rows, n cols and n grids

** Technically both TC and SC are O(1) because n is fixed at 9
 */
