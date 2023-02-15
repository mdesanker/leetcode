/**
 * @param {number[][]} grid
 * @return {number}
 */
var swimInWater = function (grid) {
  const n = grid.length;

  // build visited grid
  const visited = [];
  for (let i = 0; i < n; i++) {
    visited.push(new Array(n).fill(false));
  }

  // initialize min heap and push top left cell into it
  // initial height is the value at starting cell
  const minHeap = new MinPriorityQueue();
  minHeap.enqueue([grid[0][0], 0, 0], 0); // [height, r, c], height

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  while (minHeap.size()) {
    // dequeue next element from heap and destructure height and coordinates
    const [height, r, c] = minHeap.dequeue().element;
    // skip if already visited
    if (visited[r][c]) continue;

    // add to visited
    visited[r][c] = true;
    // if we are at the bottom right cell, return the height
    if (r === n - 1 && c === n - 1) return height;

    // add neighbors to heap
    for (let [dr, dc] of directions) {
      const row = r + dr;
      const col = c + dc;

      // skip if out of bounds
      if (row < 0 || row >= n || col < 0 || col >= n) continue;
      // skip if already visited
      if (visited[row][col]) continue;

      // we want to track the maximum height along the path, so compare current height against prev max height
      const weight = Math.max(height, grid[row][col]);
      minHeap.enqueue([weight, row, col], weight);
    }
  }
};

// Time: O(v^2 * logv) every node (cell) is added and popped into the heap. Every heap operation is
// Space: O(v^2) to store the visited set which will be the size of the grid at the end

/**
We want to minimize the max height in the path from the top left cell to the bottom right cell

We do not need to track the time
We can swim to a square, only if water elevation is <= t, and we can swim an infinite distance in 0 time
If we want to minimize time, then we want to minimize the maximum height along a path
By tracking the max height, we are effectively tracking time

Potential brute force approach would be to calculate every possible path, calculate max height along every path and then compare
However, the time complexity for such an approach would be exponential

We can do this using a greedy approach using a modified djikstra's algorithm (shortest path alg)
Instead of tracking path weights, we will track the node height
Using a min heap will let us minimize max height along paths

We will store arrays in the min heap which will include the height of the cell and the cell's coordinates
[height, r, c]
However, we don't just want to use the height of the cell, we want the maximum height along the path so far

Solution:
Initialize a visited grid to track which cells have been traversed
Initialize a min heap
Push the starting point onto the heap - we start at cell [0, 0], and the height of this cell is grid[0][0]
The weight for the starting cell can be 0, because it will be the only element in the heap at first

We continue to loop while we have elements in the heap
Dequeue the element from the top of the heap
Destructure to get the height and coordinates

If the coordinates have already been visited, continue;

Add coordinates to visited now that we are going to process it

If we are at the bottom right cell of the grid, then we can return the max height along the path we have traversed

If we aren't at the last cell, then we need to push neighbors onto the heap
Initialized a directions array to help generate coords for top, left, bottom, and right cells
Loop through every pair in directions
Generate new row and col values
Skip if new coordinates are out of range for grid or if already visited

If we have a valid coordinate pair, we can calculate the new max height along this path
This is the max of the height of the parent node (height) and the value of the new coordinates in the grid (grid[row][col])
Now we can push the neighbor cell onto the heap using the template ([maxHeight, row, col], maxHeight)

TC: O(v^2 * log(v^2)) every node is traversed once (pushed and popped from heap), and every heap operation if log(size of heap) which is log(v^2)
SC: O(v^2) for the visited array which has same dimensions as grid
 */
