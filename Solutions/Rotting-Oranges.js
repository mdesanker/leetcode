/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
  const ROWS = grid.length,
    COLS = grid[0].length;
  const q = [];
  let fresh = 0,
    time = 0;

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c] === 2) q.push([r, c]);
      if (grid[r][c] === 1) fresh++;
    }
  }

  function addOrange(r, c) {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
    if (grid[r][c] !== 1) return;

    q.push([r, c]);
    grid[r][c] = 2;
    fresh--;
  }

  while (q.length && fresh) {
    let length = q.length;
    for (let i = 0; i < length; i++) {
      const [r, c] = q.shift();

      addOrange(r + 1, c);
      addOrange(r - 1, c);
      addOrange(r, c + 1);
      addOrange(r, c - 1);
    }
    time++;
  }
  return fresh === 0 ? time : -1;
};

// Time: O(n * m) each cell visited at least once
// Space: O(n * m) worst case scenario every orange is rotten and needs to be stored in queue

/**
We will use BFS to turn the oranges rotten as this will allow us to turn 1 layer of rotten-adjacent oranges at a time
It is possible that we will now be able to reach all oranges, in this case we will need to know how many fresh oranges there are total

Initialize variables for a time counter and a fresh orange counter
Initialize an empty array for the  queue

We need to traverse the grid once to find the rotten oranges and count the number of fresh oranges
If we find a rotten oranges, we push its coordinates into the queue (these will be the starting point for the BFS)
If we find a fresh orange, we increment the fresh counter

While the q has elements, and there are fresh oranges remaining, we will for-loop through the length of the queue
We pop the first element from the queue (shift) and we call a helper function on its four adjacent cells

Helper function
This helper function checks whether the cell is in range of the grid and a fresh orange, and if so, 
it turns the orange rotten, decrements rotten count, and pushes the coordinates onto the queue for the next loop

After every level of oranges turned, we increment the time counter

Once BFS is done and we cannot traverse any more cells because we have either run out of elements in the queue or there are no more fresh
We return the time that has elapsed if all the fresh oranges have rotted, and -1 if there are fresh oranges remaining

TC: O(r * c) we visit each cell at most once. Cells are marked rotted so that they are not revisited
SC: O(r * c) if grid is full of rotten oranges, then the queue will coordinate of every cell in the grid
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
