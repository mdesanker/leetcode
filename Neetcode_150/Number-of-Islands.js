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
// Space: O(r * c)
