// https://leetcode.com/problems/pacific-atlantic-water-flow/solutions/1018375/explanation-dfs/?orderBy=most_votes&languageTags=javascript

/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
var pacificAtlantic = function (heights) {
  const ROWS = heights.length,
    COLS = heights[0].length;

  // track which spaces have been visited
  let pac = [];
  let atl = [];

  for (let r = 0; r < ROWS; r++) {
    pac.push(new Array(COLS).fill(false));
    atl.push(new Array(COLS).fill(false));
  }

  function dfs(r, c, ocean, prevHeight) {
    // base cases
    // out of range
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
    // already visited
    if (ocean[r][c]) return;
    // height too low
    if (heights[r][c] < prevHeight) return;

    // set as visted
    ocean[r][c] = true;

    // dfs on neighbors with updated prevHeight
    dfs(r + 1, c, ocean, heights[r][c]);
    dfs(r - 1, c, ocean, heights[r][c]);
    dfs(r, c + 1, ocean, heights[r][c]);
    dfs(r, c - 1, ocean, heights[r][c]);
  }

  // check top row for pac and bottom row for atl
  for (let c = 0; c < COLS; c++) {
    dfs(0, c, pac, heights[0][c]);
    dfs(ROWS - 1, c, atl, heights[ROWS - 1][c]);
  }

  // check left col for pac and right col for atl
  for (let r = 0; r < ROWS; r++) {
    dfs(r, 0, pac, heights[r][0]);
    dfs(r, COLS - 1, atl, heights[r][COLS - 1]);
  }

  // if same space visited in both ocean, then push coord to res
  const res = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (pac[r][c] && atl[r][c]) {
        res.push([r, c]);
      }
    }
  }
  return res;
};

// Time: O(n * m) have to iterate through every grid space
// Space: O(n * m) store grids of visited spaces
