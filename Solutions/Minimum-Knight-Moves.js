/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
// BFS
var minKnightMoves = function (x, y) {
  const visited = new Set();
  const q = [[0, 0]];

  const dir = [
    [2, 1],
    [-2, 1],
    [2, -1],
    [-2, -1],
    [1, 2],
    [-1, 2],
    [1, -2],
    [-1, -2],
  ];

  let count = 0;
  while (q.length) {
    let len = q.length;
    for (let i = 0; i < len; i++) {
      const [r, c] = q.shift();

      if (r === x && c === y) return count;

      for (let [dr, dc] of dir) {
        let row = r + dr,
          col = c + dc;
        const key = `${row}#${col}`;
        if (visited.has(key)) continue;
        visited.add(key);
        q.push([row, col]);
      }
    }
    count++;
  }
  return count;
};
// Time: O(max(x, y)^2)
// Space: O(max(x, y)^2)
