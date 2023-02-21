/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */

// 1. Build adjacency list
// 2. Use Djikstra's algorithm to find path to each node

var networkDelayTime = function (times, n, k) {
  // build adjacency list
  const adj = {};
  for (let i = 1; i < n + 1; i++) adj[i] = [];
  // map src to arrays of [weight, dst]
  for (const [u, v, w] of times) adj[u].push([w, v]);

  // Dijkstra's Algorithm
  const minHeap = new MinPriorityQueue();
  minHeap.enqueue([0, k], 0); // [weight, node]
  const visited = new Set();
  let res = 0;

  // loop until heap is empty
  while (minHeap.size()) {
    const [w1, n1] = minHeap.dequeue().element;
    // skip if already visited
    if (visited.has(n1)) continue;

    // update time to new max weight of path travelled
    res = Math.max(res, w1);
    visited.add(n1);

    // check neighbors
    for (const [n2, w2] of adj[n1]) {
      if (!visited.has(n2)) {
        // combine weights for previous nodes
        minHeap.enqueue([w1 + w2, n2], w1 + w2);
      }
    }
  }

  // if every node was visited return t, otherwise -1
  return visited.size === n ? res : -1;
};

// Time: O(n + elogn) Djikstra's takes O(elogn) where e is number of edges and n is number of nodes. Finding min time requires O(n)
// Space: O(n + e)

/**
Goal is to find the fastest path from a node to every other node, which is typical use case for the single source shortest path algorithm, 
so we will use Djikstra's Alg to find the shortest path to every node from k
Uses a minHeap to find to shortest path

Djikstra's alg is a BFS technique, so we will use a queue to store neighbors



Adj list:
First we need to build the adj list that represents the graph
This is a directed graph, so we only add edges once
NOTE: the nodes are 1-indexed, so need to adjust the key: [] initialization from 1 to n + 1

const adj = {};
for (let i = 1; i < n + 1; i++) adj[i] = [];
for (let [u, v, w] of times) adj[u].push([w, v]);

Then we will initialize the result counter, the time it takes to reach the last node, a visited set, and the minHeap
We will push the starting node, k, onto the minHeap, setting its weight to 0, because it doesn't cost time to get there

While we have elements in the minHeap
Pop the shortest path from the minHeap
Can destructure the array into node and weight

const [w1, n1] = minHeap.dequeue().element;

If this node is already visited, continue. We do not want to consider it again

If it's a new path, add n1 to visited set
Update the result to the weight of this node

Then we want to push the neighbors of this node on to the queue
If the neighbor isn't already visited, we will update it's weight to the weight to get to the current node + its own weight
This will give us the total time to get to a node from the starting position, because we keep accumulating the weights along the path

for (let [w2, n2] of adj[n1]) {
  if (!visited.has(n2)) {
    minHeap.enqueue([w1 + w2, n2], w1 + w2);
  }
}

Once we have emptied the minHeap, we have traversed all the connected edges
If we have been able to calculate distance to every vertex, visited.size === n, then we will return the res (shortest path to farthest node)
If we weren't able to travel to every vertex, visited.size < n, we return -1

TC: O(e * logv)
There are e edges, and v vertices. The number of edges is about equal to the number of vertices squared 
(2 edges between each node for both directions, and one edge to itself)
Edges get added into the minHeap, because we add the ways to get from n1 to n2. Therefore heap could be size v^2
Every heap opereation is log(v^2) because it depends on the size of the heap (rearrange contents)
This operation can be done e times: O(e * logv^2) -> O(2 * e * logv) -> O(e * logv)
SC: O(e)
  Building adj list takes e space
  Heap takes e space
 */

// Bellman-Ford
var networkDelayTime = function (times, n, k) {
  let cost = new Array(n + 1).fill(Infinity);
  cost[k] = 0;

  for (let i = 0; i < n; i++) {
    let tmpCost = cost.slice();
    for (let [u, v, w] of times) {
      if (cost[u] === Infinity) continue;
      if (cost[u] + w < tmpCost[v]) {
        tmpCost[v] = cost[u] + w;
      }
    }
    cost = tmpCost;
  }

  cost.shift();
  let res = Math.max(...cost);
  return res === Infinity ? -1 : res;
};

// Time: O((v + e) * n) iterate through all edges and vertices n times due to nested loops
// Space: O(v) for cost and tmpCost arrays
