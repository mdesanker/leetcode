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

/**
Water can flow to cells if their height is <= the cell of origin. We need to find which cells can flow to both atl and pac oceans
We will do this by mapping which cells can flow to atl and pac oceans separately, and then look for overlapping cells and add those to results

Create maps for both atl and pac oceans. The map will have the same dimensions as the heights matrix, but will be filled with false initially

Then we will use DFS from the rows and cols adjacent to the pac and atl oceans 
Row 0 and col 0 can flow into pacific ocean
Row -1 and col -1 can flow into atl ocean

If there is a cell adjacent these cells that has a height that is >=, it can also flow into the corresponding ocean
DFS will check all 4 adjacent cells, and as we find cells that water can flow from, we will mark them in the corresponding ocean maps

DFS helper function:
Parameters:
r, c for coordinates of the cell being considered
ocean tells us which ocean map to send results to
prevHeight tells us the minimum value for valid flow

Base cases:
If coordinates are out of range of the heights matrix
If the cell has already been marked as visited in ocean map
If the height of the current cell is less than the prevHeight we are comparing against

Recursive cases:
If we make it through the base cases, it means we have a cell that water can flow from into the ocean
Mark it in the ocean map as true

Then we check the 4 adjacent cells, while updating prevHeight to the current cell height

Main function:
As mentioned before, water can flow from the edge rows and cols into their adjacent oceans, because there are no barriers
We will start our DFS traversal from these rows and cols to find other valid cells

for (let r = 0; r < ROWS; r++) {
  // move down the rows of column 0 to find cells that can flow into pac ocean
  dfs(r, 0, pac, heights[r][0]):
  // move down the rows of column COLS - 1 to fin the cells that can flow into atl ocean
  dfs(r, COLS - 1, atl, heights[r][COLS - 1]);
}

for (let c = 0; c < COLS; c++) {
  // move across the cols of row 0 to find cells that can flow into pac ocean
  dfs(0, c, pac, heights[0][c]);
  // move across the cols of row ROWS - 1 to find the cells that can flow into atl ocean
  dfs(ROWS - 1, c, atl, heights[ROWS - 1][c]);
}

After this, the atl and pac maps will be fully populated marking the cells that can flow into their oceans

Define an empty res array to hold the common cells between the two oceans

Iterate through every cell in the heights matrix, and if there is true in both the atl map and the pac map, we can push its coordinates into res

TC: O(r * c) we have to iterate through every grid space
TS: O(r * c) worst case scenario, every cell can flow into an ocean, and recursive stack will be size of the grid
  Also need r * c space for the map for each ocean: 2 * r * c
  Reduces to O(r * c)
 */
