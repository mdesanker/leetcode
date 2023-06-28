/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} succProb
 * @param {number} start
 * @param {number} end
 * @return {number}
 */
// Djikstra's Algorithm
var maxProbability = function (n, edges, succProb, start, end) {
  const adj = {};
  for (let i = 0; i < n; i++) adj[i] = [];
  for (let i = 0; i < edges.length; i++) {
    const [src, dst] = edges[i];
    adj[src].push([dst, succProb[i]]);
    adj[dst].push([src, succProb[i]]);
  }

  const visited = new Array(n).fill(false);
  const maxHeap = new MaxPriorityQueue();
  maxHeap.enqueue([start, 1], 1);

  let max = 0;

  while (maxHeap.size()) {
    const [node, curr] = maxHeap.dequeue().element;
    if (visited[node]) continue;
    visited[node] = true;

    if (node === end) {
      max = Math.max(max, curr);
    }

    for (let [n2, prob] of adj[node]) {
      if (!visited[n2]) {
        maxHeap.enqueue([n2, prob * curr], prob * curr);
      }
    }
  }
  return max;
};
// TC: O(m + nlogn)
// SC: O(n + m)

// Bellman-Ford Algorithm
var maxProbability = function (n, edges, succProb, start, end) {
  let cost = new Array(n).fill(0);
  cost[start] = 1;

  for (let i = 0; i < n - 1; i++) {
    let updated = false;
    for (let j = 0; j < edges.length; j++) {
      const [u, v] = edges[j];
      const prob = succProb[j];
      if (cost[u] * prob > cost[v]) {
        cost[v] = cost[u] * prob;
        updated = true;
      }
      if (cost[v] * prob > cost[u]) {
        cost[u] = cost[v] * prob;
        updated = true;
      }
    }
    if (!updated) break;
  }
  return cost[end];
};
// TC: O(nm)
// SC: O(n)
