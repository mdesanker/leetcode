/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  const ROWS = board.length,
    COLS = board[0].length;
  // const path = new Set();

  // track position on board with row(r) and col(c)
  // track position in the word (i)
  function dfs(r, c, i) {
    if (i === word.length) {
      return true;
    }

    // return false if out of bounds, don't see correct character, position in path
    if (r < 0 || c < 0 || r >= ROWS || c > COLS || word[i] !== board[r][c]) {
      return false;
    }

    // set current spot to null so can't be accessed again
    board[r][c] = null;
    // check 4 adjacent squares for next letter
    res =
      dfs(r + 1, c, i + 1) ||
      dfs(r - 1, c, i + 1) ||
      dfs(r, c + 1, i + 1) ||
      dfs(r, c - 1, i + 1);
    // clean up - reset current spot
    board[r][c] = word[i];
    return res;
  }

  // iterate through every position on board and run dfs
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      // only check if spot = first letter of word
      if (board[r][c] === word[0] && dfs(r, c, 0)) return true;
    }
  }
  return false;
};

// l = word.length
// n = ROWS
// m = COLS

// Time: O(n * m * 3^l) initially 4^l options, but after first char only 3 directions to choose from
// Space: O(l)
