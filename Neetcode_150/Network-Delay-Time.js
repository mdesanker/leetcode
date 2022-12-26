/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var networkDelayTime = function (times, n, k) {
  // build adjacency list
  const adj = {};
  for (let i = 0; i < n; i++) {
    adj[i] = [];
  }

  for (const [u, v, w] of times) {
    // u: node, v: neighbor, w: weight
    adj[u].push([w, v]); // weight and node switched when creating adjacency list
  }

  // Dijkstra's Algorithm
  const minHeap = new MinPriorityQueue();
  minHeap.enqueue([0, k], 0); // [weight, node]
  const visited = new Set();
  let t = 0;

  while (minHeap.size()) {
    const [w1, n1] = minHeap.dequeue().element;
    // skip if already visited
    if (visited.has(n1)) continue;

    visited.add(n1);
    t = Math.max(t, w1);

    // check neighbors
    for (const [n2, w2] of adj[n1]) {
      if (!visited.has(n2)) {
        // combine weights for previous nodes
        minHeap.enqueue([w1 + w2, n2], w1 + w2);
      }
    }
  }

  // if every node was visited return t, otherwise -1
  return visited.size === n ? t : -1;
};

// Time: O(n + elogn) Djikstra's takes O(elogn) where e is number of edges and n is number of nodes. Finding min time requires O(n)
// Space: O(n + e)
