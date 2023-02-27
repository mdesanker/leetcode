/**
 * @param {number[][]} heights
 * @return {number}
 */
var minimumEffortPath = function (heights) {
  const ROWS = heights.length,
    COLS = heights[0].length;

  const dir = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  const visited = [];
  // each cell in diffMatrix represents min effort required to reach that cell from all possible paths
  const diffMatrix = [];
  for (let r = 0; r < ROWS; r++) {
    visited.push(new Array(COLS).fill(false));
    diffMatrix.push(new Array(COLS).fill(Infinity));
  }
  // origin is 0 because starting point
  diffMatrix[0][0] = 0;

  const minHeap = new MinPriorityQueue();
  minHeap.enqueue([0, 0, 0], 0); // [r, c, diff]

  while (minHeap.size()) {
    const [r, c, diff] = minHeap.dequeue().element;

    visited[r][c] = true;

    for (let [dr, dc] of dir) {
      let row = r + dr,
        col = c + dc;
      if (row < 0 || row >= ROWS || col < 0 || col >= COLS) continue;
      if (visited[row][col]) continue;

      // diff to reach current cell with current path
      const currDiff = Math.abs(heights[row][col] - heights[r][c]);
      // compare against min maxDiff for current cell
      const maxDiff = Math.max(diff, currDiff);

      // if current path is better, push this path and its maxDiff into queue
      if (maxDiff < diffMatrix[row][col]) {
        diffMatrix[row][col] = maxDiff;
        minHeap.enqueue([row, col, maxDiff], maxDiff);
      }
    }
  }
  // return cell value at destination ahfter traversals complete
  return diffMatrix[ROWS - 1][COLS - 1];
};

/**
Time: O(rc * log(rc))
    Potentially have to visit every cell in matrix O(rc)
    Heap will contain at most every cell, so every heap add operation will be log(rc) repeated for every cell O(rc * log(rc))
Space: O(rc)
    Size of visited matrix, diffMatrix area O(rc)
    Max size of heap is O(rc)
 */
