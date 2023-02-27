/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */

/**
Key Insights for Problem:
In order to minimize the height of the tree, we need to choose a root node that is the shortest distance from all leaf nodes
If the nodes form a chain, there are two possible situations

1. even number of nodes - there will be two centroids
2. odd number of nodes - there will be one centroid

If we have three centroids, then the three nodes must form a triangle (cycle) - if you removed an edge you would have a chain of length three
Therefore, there cannot be more than two centroids in a tree-like graph

We will trim out the leaf nodes layer by layer until we reach the core of the graph, which are the centroid nodes
 */

// Topological Sort
var findMinHeightTrees = function (n, edges) {
  // edge case
  if (n === 1) return [0];

  // build adj list
  const adj = {};
  for (let i = 0; i < n; i++) adj[i] = [];

  // we will track the indegrees for every node
  // indegrees of a leaf node will === 1
  const indegrees = new Array(n).fill(0);

  for (let [src, dst] of edges) {
    adj[src].push(dst);
    adj[dst].push(src);

    indegrees[src]++;
    indegrees[dst]++;
  }

  // initialize first layer of leaf nodes in a queue
  const q = [];
  for (let i = 0; i < n; i++) {
    if (indegrees[i] === 1) {
      q.push(i);
    }
  }

  // trim leaves until there are at most 2 centroids
  while (n > 2) {
    let len = q.length;
    n -= len;

    while (len > 0) {
      const node = q.shift();
      len--;

      for (let nei of adj[node]) {
        indegrees[nei]--;

        if (indegrees[nei] === 1) {
          q.push(nei);
        }
      }
    }
  }
  return q;
};

/**
Time: O(v)
  It takes O(v + e) time to construct the adj list. Problem states e = v - 1 because it is a tree. Therefore O(v + e) simplifies to O(2v) = O(v)
  Iterate over indegrees array to get leaf nodes O(v)
  We trim the vertices and edges during the bfs O(v + v - 1) = O(v)
Space: O(v)
  O(v + e) space for adj list. Simplifies to O(v)
  O(v) for indegrees array
  O(v) for queue in worst case 
 */

// BFS (TLE)
var findMinHeightTrees = function (n, edges) {
  const adj = {};
  for (let i = 0; i < n; i++) adj[i] = [];
  for (let [src, dst] of edges) {
    adj[src].push(dst);
    adj[dst].push(src);
  }

  const treeHeights = [];

  function bfs(node) {
    const q = [node];
    const visited = new Set();

    let height = 0;

    while (q.length) {
      let len = q.length;
      for (let i = 0; i < len; i++) {
        const node = q.shift();
        if (visited.has(node)) continue;

        visited.add(node);

        for (let nei of adj[node]) {
          if (!visited.has(nei)) {
            q.push(nei);
          }
        }
      }
      height++;
    }
    return height;
  }

  for (let i = 0; i < n; i++) {
    treeHeights.push(bfs(i));
  }

  const min = Math.min(...treeHeights);

  const res = [];
  for (let i = 0; i < n; i++) {
    if (treeHeights[i] === min) res.push(i);
  }
  return res;
};

// Time: O(e + v)
// Space : O(e + v)
