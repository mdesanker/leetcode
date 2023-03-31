/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */

// Union Find Implementation

var validTree = function (n, edges) {
  // Basic union find except base case
  // tree must contain n - 1 edges where n is number of nodes
  if (edges.length !== n - 1) return false;

  // use union find to check there are no loops
  const par = [];
  for (let i = 0; i < n; i++) {
    par.push(i);
  }

  const rank = new Array(n).fill(1);

  function find(n) {
    let p = par[n];
    while (p !== par[p]) {
      par[p] = par[par[p]];
      p = par[p];
    }
    return p;
  }

  function union(n1, n2) {
    const p1 = find(n1),
      p2 = find(n2);

    if (p1 === p2) return false;

    if (rank[p1] < rank[p2]) {
      par[p1] = p2;
      p2.rank += p1.rank;
    } else {
      par[p2] = [p1];
      p1.rank += p2.rank;
    }
    return true;
  }

  for (const [n1, n2] of edges) {
    // if adding this edge creates loop, return false
    if (!union(n1, n2)) return false;
  }
  return true;
};

// Time: O(v + e)
// Space: O(v) to store the por and rank arrays

/**
We have an array of edges and we need to connect nodes so this is a good candidate for union find

Standard union find by rank procedure that is explained in more detail for question "Redundant Connection"

A couple key differences
In a tree, the number of edges is always 1 less than the number of nodes

n - 1 === edges.length

If this case does not hold for the graph, then we can immediately return false

Then we connect all the nodes following the edges array. If we create a cycle because we try to build a connection between two nodes that are already connected, then we return false. A tree cannot have cycles.

If we build out all the edges without creating any cycles, then we can return true, the graph is a valid tree

TC: O(e) we traverse every edge as we are building the graph
SC: O(v) parent and rank arrays contain every node in the graph
 */

// DFS Implementation

var validTree = function (n, edges) {
  // empty graph or single node graph counts as tree
  if (n < 2) return true;

  // initialize adjacency list
  const adj = {};
  for (let i = 0; i < n; i++) {
    adj[i] = [];
  }

  // populate adjacency list
  for (const [n1, n2] of edges) {
    adj[n1].push(n2);
    adj[n2].push(n1);
  }

  // track visited nodes
  const visited = new Set();

  function dfs(curr, prev) {
    // mark current node as visited
    visited.add(curr);

    // explore neighhbors
    for (const nei of adj[curr]) {
      // not visited node before
      if (!visited.has(nei)) {
        // check if new node has cycle
        if (dfs(nei, curr)) return true;
      } else {
        // seen node before, must be a parent
        if (nei !== parent) return true;
      }
    }
    return false;
  }

  if (dfs(0, -1)) return false;

  for (let i = 0; i < n; i++) {
    if (!visited.has(i)) return false;
  }
  return true;
  // if every node visited, then every node is conntected --> valid tree
  return dfs(0, -1) && n === visited.length;
};
