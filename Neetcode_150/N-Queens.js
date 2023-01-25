/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  const res = [];

  // build the starting board n x n matrix
  const board = [];
  for (let i = 0; i < n; i++) {
    board.push(new Array(n).fill("."));
  }

  backtrack(0);
  return res;

  // will place a queen in every row of a col, and continue from there
  function backtrack(c) {
    // if c moves past board, then have a valid board
    if (c >= n) {
      // push board to res after joining individual rows into strings
      res.push([...board].map((row) => row.join("")));
      return;
    }

    // iterate through every row in this column
    for (let r = 0; r < n; r++) {
      // check if current coordinates are valid for queen placement
      if (isValid(r, c)) {
        // place queen
        board[r][c] = "Q";
        // call backtracking function on next column
        backtrack(c + 1);
        // remove queen so that it will clear column for next row placement
        board[r][c] = ".";
      }
    }
  }

  // helper function to check if coordinates are valid placement for queen
  function isValid(r, c) {
    // store starting coordinates so we can check left, upleft, and downleft directions
    const startR = r,
      startC = c;

    // check upleft
    while (r >= 0 && c >= 0) {
      if (board[r][c] === "Q") return false;
      r--;
      c--;
    }

    // check left
    (r = startR), (c = startC);
    while (c >= 0) {
      if (board[r][c] === "Q") return false;
      c--;
    }

    // check downleft
    (r = startR), (c = startC);
    while (r < n && c >= 0) {
      if (board[r][c] === "Q") return false;
      r++;
      c--;
    }

    return true;
  }
};

// Time: O(n!) only place queens in squares not under attack, so first queen has n options, next queen has max n - 2, then max n - 4 for following, etc
// Space: O(n^2) for the n x n board
