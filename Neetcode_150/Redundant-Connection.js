/**
 * @param {number[][]} edges
 * @return {number[]}
 */

// Union find by rank
var findRedundantConnection = function (edges) {
  // intially every node's parent is itself
  const par = [];
  for (let i = 0; i < edges.length + 1; i++) {
    parent.push(i);
  }

  // initially every nodes rank is 1
  const rank = new Array(edges.length + 1).fill(1);

  function find(n) {
    // find parent by checking corresponding index of parent array
    let p = par[n];

    // while parent !== itslef, keep iterating through parent
    while (p != par[p]) {
      // par[p] = par[par[p]]; // optional to expedite rate
      p = par[p];
    }
    // return parent
    return p;
  }

  // return false if already merged (can't complete)
  function union(n1, n2) {
    // find parents of each node
    let p1 = find(n1),
      p2 = find(n2);

    // if they already share a parent, they are merged
    if (p1 === p2) return false;

    // make bigger graph the parent
    if (rank[p1] > rank[p2]) {
      par[p2] = p1;
      rank[p1] += rank[p2];
    } else {
      par[p1] = p2;
      rank[p2] += rank[p1];
    }
    return true;
  }

  for (const [n1, n2] of edges) {
    // if can't union the two nodes, return nodes as answer
    if (!union(n1, n2)) {
      return [n1, n2];
    }
  }
};

// Time: O(n) where n is number of edges
// Space: O(n) for par array and recursion stack

/**
If we have n vertices and n edges, we will always have a loop
For a tree, the number of vertices === number of edges + 1

We can use Union Find by rank because we want to return the first edge that creates a redundant connection (connects two nodes that are already connected)

[[1, 2], [1, 3], [2, 3]]

Connect node 1 -> node 2
Connect node 1 -> node 3

All three nodes are now connected

When we connect node 2 -> node 3, we are creating a redundant connection, because node 2 was already connected to node 3 through node 1

Union Find by Rank algorithm:
We will start with each node as its own graph

const parents = [0, 1, 2, 3]; // index 0 is a placeholder
const rank = [1, 1, 1, 1];

The index in the parents array is the node, and the value at the index is it's parent 
(1 is the parent of itself, 2 is parent of itself because no connections yet)

[1, 2]:
We look at the first edge in edges: [1, 2] this means we will be connecting (union) vertex 1 to vertex 2
When we union two vertices, we want to check whether they are already connected. We do this by finding their parents

let p = par[node];
while (p !== par[p]) {
  p = par[p];
}
return p;

parent of node 1 is node 1
parent of node 2 is node 2

The parents are not equal, so these nodes are not already connected. It is ok to build this connection

We are doing union-find by rank, so we want to make the higher rank node the parent of the lower rank node (both nodes are equal rank)
Make node 1 the parent of node 2

const parents = [0, 1, 1, 3]; // update node 2's parent to 1
const rank = [1, 2, 1, 1]; // increase node 1's rank to add node 2's rank

[1, 3]:
Now we look at the second edge in edges: [1, 3] we will connect node 1 to node 3

First we find the parent of node 1 and node 3. Both are parents of themselves
The parents are also not equal, which means these nodes are not connected already. We can union them

Their ranks are not equal, so we will make the higher rank node the parent of the lower rank node
Node 1 will become the parent of node 3

const parents = [0, 1, 1, 1];
const rank = [1, 3, 1, 1];

[2, 3]:
Now we consider the last egdge: [2, 3] we will connect node 2 to node 3

First we find the parents of node 2 and node 3

The parent of node 2 is node 1
The parent of node 3 is node 1

They have the same parent, which means node 2 and 3 are already connected through node 1

We cannot union these two nodes without creating a loop, return false

Since we cannot union these two nodes without creating a loop, we return them in an array

TC: O(n) this algorithm runs in linear time
SC: O(n) the parent and rank arrays contain a value for every node
 */

// DFS Approach
var findRedundantConnection = function (edges) {
  const n = edges.length;

  // initializer empty adjacency list
  const adj = {};
  // iterate to n + 1 because 1-indexed nodes
  for (i = 0; i < n + 1; i++) adj[i] = [];

  function dfs(node, target, prev) {
    // if node is the target, we have a loop
    if (node === target) return true;

    for (let nei of adj[node]) {
      // for every neighbor that isn't the prev node, check if we eventually reach the target
      if (nei !== prev && dfs(nei, target, node)) return true;
    }
    // return false if no cycles are found
    return false;
  }

  // build graph one edge at a time
  for (let [n1, n2] of edges) {
    adj[n1].push(n2);
    adj[n2].push(n1);

    // check if adding the edge creates a cycle in the graph
    if (dfs(n2, n1, n1)) return [n1, n2];
  }
};

// Time: O(v^2) where v is number of vertices (and edges) in the graph (v === e if we have a cycle). Worst case scenario, For ever edge we add, we have to search every previous edge
// Space: O(v + 2e) adjacency list will hold every vertex in the graph and two values for every edge because undirected graph
