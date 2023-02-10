export class Solution {
  /**
   * @param rooms: m x n 2D grid
   * @return: nothing
   */
  wallsAndGates(rooms) {
    const ROWS = rooms.length,
      COLS = rooms[0].length;
    const q = [];

    // create array to track visited rooms
    const visited = [];
    for (let r = 0; r < ROWS; r++) {
      visited.push(new Array(COLS).fill(false));
    }

    function addRoom(r, c) {
      // base cases
      // out of bounds
      if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
      // already visited
      if (visited[r][c]) return;
      // wall or obstacle
      if (rooms[r][c] === -1) return;

      // mark room as visited and add to queue
      visited[r][c] = true;
      q.push([r, c]);
    }

    // iterate through all rooms to find gates and add to queue
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (rooms[r][c] === 0) {
          q.push([r, c]);
          // mark as visited so don't re-visit
          visited[r][c] = true;
        }
      }
    }

    let dist = 0;

    while (q.length) {
      let length = q.length;
      for (let i = 0; i < length; i++) {
        // dequeue and mark distance
        const [r, c] = q.shift();
        rooms[r][c] = dist;

        // check adjacent rooms
        addRoom(r + 1, c);
        addRoom(r - 1, c);
        addRoom(r, c + 1);
        addRoom(r, c - 1);
      }
      // increment dist
      dist++;
    }
  }
}

// Time: O(n * m)
// Space: O(n * m)

/**
We will start from the gates and iterate outwards and fill every empty room with the distance from the gate by incrementin dist counter every round
We need to initialize a queue with empty array, a distance counter at 0

We build the visited matrix with an empty array initially, then for every row, we add a new array of length col, filled with false, 
becase every cell is initially unvisited

We will iterate through the entire grid once to find our starting points, rooms filled with 0
These coordinates will be pushed onto the queue and marked as visited

While there are elements in the queue, we loop through the length of the queue
We pop the first set of coordinates from the queue, and set the value of room to the distance
For the first set of rooms, which are the gates, the dist = 0, so this does not change any thing

They we call a helper function on the four adjacent cells

Distance counter is incremented after every set of coordinates in the queue have been traversed

Helper function:
Base cases:
Checks that the coordinates are in range for a valid room, that the room isn't a wall, and that the room hasn't been visited already

Then we mark the room as visited and push its coordinates onto the queue for the next set of traversals

TC: O(r * c) every cell is traversed once, then marked visited so that it is not traversed again
SC: O(r * c) the visited matrix will be the same size as the grid
 */
