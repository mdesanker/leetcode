/**
Solution: BFS

Here we use BFS to traverse adjacent levels of cells
We start by populating the queue with all cells with value 0 and a distance counter initialized to 0
Distance counter is incremeneted with each round of traversals

n = mat.length, m = mat[0].length
TC: O(nm) to traverse every cell
SC: O(nm) for the visited matrix
 */
var updateMatrix = function (mat) {
  const ROWS = mat.length,
    COLS = mat[0].length;

  const visited = Array(ROWS)
    .fill(0)
    .map(() => Array(COLS).fill(false));

  const q = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (mat[r][c] === 0) {
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
      mat[r][c] = dist;

      for (let [dr, dc] of dir) {
        let row = r + dr,
          col = c + dc;
        if (row < 0 || row >= ROWS || col < 0 || col >= COLS) continue;
        if (visited[row][col]) continue;
        q.push([row, col]);
      }
    }
    dist++;
  }
  return mat;
};
