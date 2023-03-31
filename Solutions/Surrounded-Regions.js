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
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
    // space not "O"
    if (board[r][c] !== "O") return;

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
};

// Time: O(n * m)
// Space: O(s) where s is size of largest captured region for recursive call stack

/**
We want to erase all surrounded regions (not touching border row or col)
To do this, will use DFS to traverse all the border regions and convert them to a marker
Then we will traverse the entire board, turn anything that isn't the marker into an "X", and the markers will be converted to "O"
This will erase surrounded regions while preserving the border regions

DFS helper function:
Parameters:
r, c coordinates of the cell being checked

Base cases:
If coordinates are out of range for the board, return
If cell is not "O", return, we do not want to bother with it

Recursive cases:
If we made it through the base cases, then we are at an "O" cell that we want to preserve
Place a marker at this position by changing it's value to something other than "O" or "X"

Then we traverse the 4 adjacent cells to see if there are connected "O" cells we need to place markers in as well

Main function:
We will traverse the entire board, and if we find a border row or col where the cell is an "O", we will call dfs function 
to convert the connected regions into markers

Then we will traverse the entire board again
For the cells that are marked, we will change their value to "O", and everything else if changed to "X"
This will erase all the unconnected surrounded regions from the board

TC: O(r * c) we must traverse every cell on the board
SC: O(r * c) in the worst case scenario, the board is one large connected region. In this case, the recursive stack will be the size of the board
 */
