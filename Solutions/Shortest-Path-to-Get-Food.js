/**
Solution: BFS

Shortest path immediately indicates we should use BFS. We can do basic BFS or Djikstra's.
 */
// Djikstra's
var getFood = function (grid) {
  const ROWS = grid.length,
    COLS = grid[0].length;

  const visited = [...new Array(ROWS)].map(() => new Array(COLS).fill(false));

  const minHeap = new MinPriorityQueue();
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c] === "*") {
        minHeap.enqueue([r, c, 0], 0);
      }
    }
  }

  const dir = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  while (minHeap.size()) {
    const [r, c, dist] = minHeap.dequeue().element;
    if (visited[r][c]) continue;
    visited[r][c] = true;

    if (grid[r][c] === "#") return dist;

    for (let [dr, dc] of dir) {
      let row = r + dr,
        col = c + dc;
      if (row < 0 || row >= ROWS || col < 0 || col >= COLS) continue;
      if (grid[row][col] === "X") continue;
      if (visited[row][col]) continue;
      minHeap.enqueue([row, col, dist + 1], dist + 1);
    }
  }
  return -1;
};
// TC: O(v + elogv)
// SC: O(v)

// BFS
var getFood = function (grid) {
  const ROWS = grid.length,
    COLS = grid[0].length;

  const visited = [...new Array(ROWS)].map(() => new Array(COLS).fill(false));

  const q = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c] === "*") {
        q.push([r, c]);
      }
    }
  }

  const dir = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  let dist = 0;

  while (q.length) {
    let len = q.length;
    for (let i = 0; i < len; i++) {
      const [r, c] = q.shift();
      if (visited[r][c]) continue;
      visited[r][c] = true;

      if (grid[r][c] === "#") return dist;

      for (let [dr, dc] of dir) {
        let row = r + dr,
          col = c + dc;
        if (row < 0 || row >= ROWS || col < 0 || col >= COLS) continue;
        if (grid[row][col] === "X") continue;
        if (visited[row][col]) continue;
        q.push([row, col]);
      }
    }
    dist++;
  }
  return -1;
};
// TC: O(v + e)
// SC: O(v)
