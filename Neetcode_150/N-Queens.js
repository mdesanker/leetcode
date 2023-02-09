/**
 * @param {number} n
 * @return {string[][]}
 */
// avoid having to do 3 O(n) operations to check for attacking queens
var solveNQueens = function (n) {
  const res = [];

  const board = [];
  for (let i = 0; i < n; i++) {
    board.push(new Array(n).fill("."));
  }

  // use sets to store which rows and diagonals have queens in them
  backtrack(0, new Set(), new Set(), new Set());
  return res;

  function backtrack(c, rows, diags, antiDiags) {
    if (c >= n) {
      res.push([...board].map((row) => row.join("")));
      return;
    }

    for (let r = 0; r < n; r++) {
      let diag = r + c;
      let antiDiag = r - c;
      // if this r, diag, or antiDiag is already occupied, then continue
      if (rows.has(r) || diags.has(diag) || antiDiags.has(antiDiag)) continue;

      // add position to the relevant sets
      rows.add(r);
      diags.add(diag);
      antiDiags.add(antiDiag);
      // add queen and backtrack
      board[r][c] = "Q";

      backtrack(c + 1, rows, diags, antiDiags);

      rows.delete(r);
      diags.delete(diag);
      antiDiags.delete(antiDiag);
      board[r][c] = ".";
    }
  }
};

// Time: O(n!) only place queens in squares not under attack, so first queen has n options, next queen has max n - 2, then max n - 4 for following, etc
// Space: O(n^2) for the n x n board

/**
We will start with the first column, place a queen in each cell of this column, and continue recursing 
(place a queen in every valid place in next column, then next column) 
If we reach a scenario where we cannot place a queen in a valid position in a column, then the board combination will not work
If we reach column n (successfully place a queen in every column), then we have found a solution

We need to track the rows, diagonals, and antidiagonals that have queens placed in them, so we can easily tell whether a queen can be placed
Diagrams below show how r + c and r - c can be used to calculate whether values are on the same diagonal

n = 4

diag = r + c
   0  1  2  3
0  0  1  2  3
1  1  2  3  4
2  2  3  4  5
3  3  4  5  6 

antiDiag = r - c
   0  1  2  3
0  0 -1 -2 -3
1  1  0 -1 -2 
2  2  1  0 -1
3  3  2  1  0

By using a set to store rows, diags, and antiDiags, we can check for conflict in O(1) time complexity

Building the board:
We need to build the n x n board
Initialize board to empty array, then push n arrays of length n filled with "."

Backtrack function params:
Parameters:
c to track which column we are trying to add a queen to
rows, diags, antiDiags will be the sets we pass to check for conflicts

Base case:
If we make it to c === n, then we have successfully placed a queen in every column of the board and avoided conflicts
We can push the current board onto res, but as we do so, we need to convert the board from a 2D array, to a 1D array of strings
Map each row to row.join("") to convert the row arrays into strings
Then return

Recursive case:
We want to iterate through every possible row in the current column being considered, and add a queen if there is no conflict
First calculate diag and antiDiag values for the current coordinate
If the row, diag, or antiDiag value exist in rows, diags, or antiDiags sets respectively, 
then we have a conflict at this position with another queen. Continue

If no conflict, then we can place a queen
Add corresponding value to rows, diags, and antiDiags sets
Change the value on the board to "Q"

Then we can call backtracking function, incrementing column, so we can try to place a queen in the next column
Continue to pass the rows, diags, and antiDiags sets

Once the fucntion returns, we want to backtrack
Delete row, diag, and antiDiag values from corresponding sets
Change board value back to "."

TC: O(n!) if n = 4, and we have a 4 x 4 board, in the first column we can choose from 4 rows, in the second column, we can choose from ~3 rows, 
  then ~2 rows, and so on. Effectively n! time complexity
SC: O(n^2) for the space needed to build the board
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
