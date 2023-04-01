/**
Solution: DFS/BFS
 */
// DFS
var numIslands = function (grid) {
  const ROWS = grid.length,
    COLS = grid[0].length;
  const dir = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  function dfs(r, c) {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
    if (grid[r][c] !== "1") return;

    grid[r][c] = "0";

    for (let [dr, dc] of dir) {
      let row = r + dr,
        col = c + dc;
      dfs(row, col);
    }
  }

  let count = 0;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c] === "1") {
        count++;
        bfs(r, c);
      }
    }
  }
  return count;
};
// TC: O(rc) traverse every cell
// SC: O(rc) entire grid is land (recursive stack contains entire grid)

// BFS
var numIslands = function (grid) {
  const ROWS = grid.length,
    COLS = grid[0].length;
  const dir = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  function bfs(r, c) {
    const q = [[r, c]];
    while (q.length) {
      let len = q.length;
      for (let i = 0; i < len; i++) {
        const [r, c] = q.shift();
        if (grid[r][c] !== "1") continue;
        grid[r][c] = "0";

        for (let [dr, dc] of dir) {
          let row = r + dr,
            col = c + dc;
          if (
            row < 0 ||
            row >= ROWS ||
            col < 0 ||
            col >= COLS ||
            grid[row][col] !== "1"
          )
            continue;
          q.push([row, col]);
        }
      }
    }
  }

  let count = 0;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c] === "1") {
        count++;
        bfs(r, c);
      }
    }
  }
  return count;
};
// TC: O(rc) traverse every cell
// SC: O(min(r, c)) worst case scenario grid is all lang, size of q can grow to min(r, c)

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
