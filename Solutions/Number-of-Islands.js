// https://leetcode.com/problems/number-of-islands/solutions/429842/javascript-dfs-commented-thought-process-beats-100-time-and-space/?orderBy=most_votes&languageTags=javascript

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  if (!grid) return 0;

  const ROWS = grid.length,
    COLS = grid[0].length;
  let islands = 0;

  function dfs(r, c) {
    // base cases
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS || grid[r][c] === "0") return;

    // mark as visited
    grid[r][c] = "0";
    // check all adjacent grid spaces and convert to "0"s
    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    for (const [dr, dc] of directions) {
      dfs(r + dr, c + dc);
    }
  }

  // iterate through every grid space checking for "1"s
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c] === "1") {
        dfs(r, c);
        islands++;
      }
    }
  }
  return islands;
};

// Time: O(r * c) where r and c are number of rows and cols
// Space: O(r * c) in worst case scenario, entire grid is land, so the recursive stack will be r * c

/**
We will iterate through every cell in the grid and check for land
When we reach land, we will increment our island counter and then call a dfs function on that cell
This function will traverse the entire island, and convert it into water, so that it cannot be re-counted
This function will stop when it runs out of land to traverse, so it will only convert one island at a time
Then we continue searching from the next cell from before the dfs was called
Once we have made it through all the cells, we will have our island count

DFS helper function:
Parameters:
The parameters for this function will be the coordinates (row and col) of the cell it is being called on.

Base cases:
If our coordinates are out of bounds (outside bounds of grid) return
If the cell is filled with water, return. We only want to traverse land

Recursive case:
First we will convert the current cell to water, so that we do not need to spend time traversing it again
Then we call the DFS function recursively on the four adjacent cells

Main function: 
We need to initialize a counter at 0 to count the number of islands

We iterate through every cell in the grid, and search for land
Once we reach land, we increment island counter and call dfs on the cell to convert the rest of the island to water so it isn't double counted
Once we get to end of grid, we have counted all islands

TC: O(r * c) because we have to search every cell in the grid
SC: O(r * c) in worst case scenario, entire grid is land, so the recursive stack will be r * c
 */
