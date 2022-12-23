/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
  const ROWS = grid.length,
    COLS = grid[0].length;
  // store next coords to visit in queue
  const q = [];
  let oranges = 0,
    time = 0;

  // add rotten oranges to q and count number of total oranges
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c] === 2) q.push([r, c]);
      if (grid[r][c] === 1) oranges++;
    }
  }

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  while (q.length && oranges) {
    let length = q.length;
    for (let i = 0; i < length; i++) {
      // dequeue next rotten orange
      const [r, c] = q.shift();

      // check every adjacent orange
      for (const [dr, dc] of directions) {
        let row = r + dr,
          col = c + dc;
        // if coord in bounds and there is an orange
        if (
          row >= 0 &&
          row < ROWS &&
          col >= 0 &&
          col < COLS &&
          grid[row][col] === 1
        ) {
          // make orange rotten, add to q, and decrement orange count
          grid[row][col] = 2;
          q.push([row, col]);
          oranges--;
        }
      }
    }
    // increment time
    time++;
  }
  // if all oranges rotten, return time, otherwise return -1
  return oranges === 0 ? time : -1;
};

// Time: O(n * m) each cell visited at least once
// Space: O(n * m) worst case scenario every orange is rotten and needs to be stored in queue
