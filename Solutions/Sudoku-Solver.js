/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function (board) {
  backtrack();

  function backtrack() {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        // skip numbers
        if (board[r][c] !== ".") continue;

        // iterate through possible numbers
        for (let i = 1; i <= 9; i++) {
          // convert to string
          const char = i.toString();
          // if valid, add to board
          if (isValid(r, c, char)) {
            board[r][c] = char;
            if (backtrack()) return true;
          }
          // solution not found for current num
          // set cell back to empty
          board[r][c] = ".";
        }
        // solution not found for any num 1-9 here
        return false;
      }
    }
    // all cells filled, must be a solution
    // this return only triggers at the end of the recursion when
    // all cells are filled successfully
    return true;
  }

  function isValid(r, c, char) {
    const blockRow = 3 * Math.floor(r / 3);
    const blockCol = 3 * Math.floor(c / 3);
    for (let i = 0; i < 9; i++) {
      // check col for uniqueness
      if (board[r][i] === char) return false;
      // check row for uniqueness
      if (board[i][c] === char) return false;
      // check grid for uniqueness
      const currRow = blockRow + Math.floor(i / 3);
      const currCol = blockCol + (i % 3);
      if (board[currRow][currCol] === char) return false;
    }
    return true;
  }
};

// TC: O(9!^9) For every row, there are 9 possibilities to place in first cell, then 8 in second cell, etc. 9! operations per row. 9!^9 for all 9 rows.
// But because the number of operations is fixed, the time complexity is constant O(1)
// SC: O(9^2) the board is 9 x 9. Constant space because fixed dimensions

// 0 1 2 3 4 5 6 7 8
// 0 0 0 1 1 1 2 2 2 -> Math.floor(i / 3)
// 0 0 0 3 3 3 6 6 6 -> blockRow = 3 * Math.floor(index / 3);

// [0, 0]: row = 0
// blockRow = 0
// currRow = 0 + [0, 1, 2]

// row = 4
// blockRow = 3
// currRow = 3 + [0, 1, 2]
