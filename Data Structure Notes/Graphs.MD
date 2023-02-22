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

  // track visited nodes on current path
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

Space complexity: O(v + e)

There is a key for every vertex
In every array, there is an entry for the neighboring vertices (edges)
Space needed is equal to number of vertices + number of edges
Worst case scenario, every vertex is connected to every other vertex, in which case space complexity will be O(v^2)

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

Time: O(v + 2e) bidirectional - call recursion (dfs) on every node once, then it gets called on every neighbor of the node
O(v + e) for directed graph
Space: O(v + 2e) for the adjacency list of undirected graph (duplicate edge for both directions)
O(v + e) for adjacency list of directed graph

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

Time: O(v + 2e) for an undirected graph. Every node (v) is iterated on with the while loop. Then for every v, we loop over all neighbors (degrees/edges).
Because we have edges duplicated for a bi-directional graph, that is a total of 2e edges
O(v + e) for directed graph

Space: O(v + 2e) every vertex will be a key in the adj list, and then an edge to every neighbor will be included. Edges are duplicated for bidirectional
O(v + e) for directed graph
O(v) for visited set
O(v) for queue

# Cycle Detection

DFS

```js
function detectCycle() {
  function dfs(node, par) {
    if (visited.has(node)) return true;

    visited.add(node);

    for (let nei of adj[node]) {
      if (nei !== par) {
        if (dfs(nei, node)) return true;
      }
    }

    return false;
  }

  for (let i = 0; i < n; i++) {
    if (dfs(i, -1)) return true;
  }

  return false;
}
```

# Bipartite Graphs

```js

```
