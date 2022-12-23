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
      for (let i = 0; i < q.length; i++) {
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
