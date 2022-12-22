/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function (board) {
  const ROWS = board.length,
    COLS = board[0].length;

  function dfs(r, c) {
    // base cases
    // out of range
    // space not "O"
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS || board[r][c] !== "O") return;

    // convert to "T"
    board[r][c] = "T";

    // check adjacent spaces
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  // capture unsurrounded regions
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      // only run dfs on edge rows and columns
      if (
        board[r][c] === "O" &&
        (r === 0 || r === ROWS - 1 || c === 0 || c === COLS - 1)
      ) {
        dfs(r, c);
      }
    }
  }

  // convert spaces
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      // convert T -> O and O -> X
      if (board[r][c] === "T") {
        board[r][c] = "O";
      } else {
        board[r][c] = "X";
      }
    }
  }
  return board;
};

// Time: O(n * m)
// Space: O(s) where s is size of largest captured region for recursive call stack
