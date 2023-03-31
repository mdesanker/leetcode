/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxDistance = function (grid) {
  const ROWS = grid.length,
    COLS = grid[0].length;
  const q = [];

  // build matrix to track visited cells
  const visited = [];
  for (let r = 0; r < ROWS; r++) {
    visited.push(new Array(COLS).fill(false));
  }

  // find land cells and push onto queue as starting points
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c] === 1) {
        q.push([r, c]);
        visited[r][c] = true;
      }
    }
  }

  // if no land, then q is empty
  // if only land, then q is the size of the grid
  if (!q.length || q.length === ROWS * COLS) return -1;

  // check if cell has already been visited and if not, add to queue
  function dfs(r, c) {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
    if (visited[r][c]) return;

    visited[r][c] = true;
    q.push([r, c]);
  }

  // traverse cells outward from land, marking distance
  // start at -1 because dist is incremented one more than needed
  let dist = -1;

  while (q.length) {
    let length = q.length;
    for (let i = 0; i < length; i++) {
      const [r, c] = q.shift();

      grid[r][c] = dist;

      dfs(r + 1, c);
      dfs(r - 1, c);
      dfs(r, c + 1);
      dfs(r, c - 1);
    }
    dist++;
  }
  return dist;
};

// Time: O(r * c) we traverse every cell in the grid once. Cells are marked visited so we do not revisit
// Space: O(r * c) space needed for visited array. If grid is all land, then queue will also hold coordinates for every position in grid
