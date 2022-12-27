# Graphs

- Structure containing a set of nodes and vertices
- Edges can be directed or undirected
- Edges can have values (weighted graph)
- Trees are a type of graph where any two vertices are connected by exactly one edge, there can be no cycles in a tree (# edges === # vertices - 1)

## Graph Representations

- Matrix (most common)
- Adjacency List
- Adjacency Matrix (least common)

## Matrix Representation

- Matrix is represented as an array of arrays (e.g. [[1, 0, 0], [1, 1, 0], [0, 0, 0]])

### Matrix - DFS

- Traverse matrix representation of a graph involves iterating over every node and then calling a dfs function to traverse every connected node (Number of Islands, Max Area of Islands)

```js
function dfs(grid, r, c, visited) {
  const ROWS = grid.length,
    COLS = grid[0].length;

  // return if cell out of bounds
  if (r < 0 || r > ROWS || c < 0 || c < COLS) return;
  // return if cell already visited
  if (visited[r][c]) return;
  // return if cell has certain value
  if (grid[r][c] === 0) return;

  // add cell to visited
  visit[r][c] = true;
  // mark cell so cannot be revisited
  grid[r][c] = null;

  // iterate over neighbors by calling dfs on adjacent cells
  dfs(r + 1, c);
  dfs(r - 1, c);
  dfs(r, c + 1);
  dfs(r, c - 1);

  // can revert value of grid[r][c] or return value if needed
}
```

### Matrix - BFS

- Traverse all adjacent cells simultaneously (Rotting Oranges, Walls and Gates)

```js
function bfs(grid, visited) {
  const ROWS = grid.length,
    COLS = grid[0].length;

  // initialize a queue that will be used to determine what cells to visit next
  const q = [];
  // iterate over graph to determine where bfs should start (e.b. rotting oranges)
  q.push([0, 0]);

  // adjacent cells
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  // helper function to check if cell should be added to queue/modified
  function helper(r, c) {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
    if (visited[r][c]) return;
    if (grid[r][c] === 0) return;

    q.push([r, c]);
    grid[r][c] = 0;
    visited[r][c] = true;
  }

  while (q.length) {
    // queue length is dynamic so capture initial value in variable
    let length = q.length;
    for (let i = 0; i < lenghth; i++) {
      // pull next value from front of queue
      const [r, c] = q.shift();

      // check neighboring cells
      for (const [dr, dc] of directions) {
        let row = r + dr,
          col = c + dc;

        // 1. if cell in bounds, not visited, and meets required criteria
        if (
          row >= 0 &&
          row < ROWS &&
          col >= 0 &&
          col < COLS &&
          !visited[row][col] &&
          grid[row][col] === 1
        ) {
          // add to queue
          q.push([row][col]);
          // change cell value
          grid[row][col] = 0;
          // add to visited
          visit.add([row][col]);
        }

        // 2. use helper function
        helper(r + 1, c);
        helper(r - 1, c);
        helper(r, c + 1);
        helper(r, c - 1);
      }
    }
  }
}
```

## Adjacency List

- Use a hashmap to list neighbors for every graph node
- Each edge array relates a source node to a destination node
- Edge arrays can include a third value corresponding to the weight of the edge
  - Necessary for Prim's, Djikstra's

```js
function buildAdjList() {
  // initialize adjancency list as empty hashmap
  const adj = {};
  // create a key for every node in graph and point to an empty array of neighbors
  for (let i = 0; i < numEdges; i++) {
    adj[i] = [];
  }

  // for each edge, push the neighbor on corresponding array
  for (const [src, nei] of edges) {
    adj[src].push(nei);
  }

  // track visited nodes
  const visited = new Set();

  function dfs(node) {
    // base cases
    if (visited.has(node)) return false;
    if (condition === true) return true;

    visited.add(node);

    // check neighbors
    for (const nei of adj[node]) {
      if (!dfs(nei)) return false;
    }

    visited.delete(node);
    return true;
  }
}
```

```js
// Count paths (backtracking)
function dfs(node, target, adjList, visit) {
  if (visit.has(node)) {
    return 0;
  }
  if (node == target) {
    return 1;
  }
  let count = 0;
  visit = new Set();
  visit.add(node);
  for (let neighbor of adjList.get(node)) {
    count += dfs(neighbor, target, adjList, visit);
  }
  visit.delete(node);
  return count;
}
```

```js
// Shortest path from node to target.
function bfs(node, target, adjList) {
  let length = 0;
  let visit = new Set();
  let q = [];
  visit.add(node);
  q.push(node);

  while (q.length != 0) {
    let queueLength = q.length;

    for (let i = 0; i < queueLength; i++) {
      let curr = q.shift();
      if (curr === target) {
        return length;
      }
      for (let neighbor of adjList.get(curr)) {
        if (!visit.has(neighbor)) {
          visit.add(neighbor);
          q.push(neighbor);
        }
      }
    }
    length++;
  }
  return length;
}
```
