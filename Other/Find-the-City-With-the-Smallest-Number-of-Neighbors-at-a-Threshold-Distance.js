/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} distanceThreshold
 * @return {number}
 */
var findTheCity = function (n, edges, distanceThreshold) {
  const adj = {};
  for (let i = 0; i < n; i++) adj[i] = [];
  for (let [src, dst, weight] of edges) {
    adj[src].push([dst, weight]);
    adj[dst].push([src, weight]);
  }

  const res = new Array(n).fill(0);

  // use Djikstra's SP algorithm to find number of neighbors for each node within threshold
  function check(node) {
    const visited = new Set();
    const minHeap = new MinPriorityQueue();
    minHeap.enqueue([node, 0], 0);

    let count = -1;

    while (minHeap.size()) {
      const [n1, w1] = minHeap.dequeue().element;
      if (visited.has(n1)) continue;

      visited.add(n1);
      if (w1 <= distanceThreshold) count++;
      // if we exceed threshold, no need to check neighbors
      else continue;

      for (let [n2, w2] of adj[n1]) {
        if (!visited.has(n2)) {
          minHeap.enqueue([n2, w1 + w2], w1 + w2);
        }
      }
    }
    res[node] = count;
  }

  // find number of neighbors for each node
  for (let i = 0; i < n; i++) {
    check(i);
  }

  // return the largest node with the smallest number of neighbors
  const minCount = Math.min(...res);
  for (let i = res.length - 1; i >= 0; i--) {
    if (res[i] === minCount) return i;
  }
};

// Time: O(v * elogv) djikstras is O(elogv) and we have to do this for every vertex O(v)
// Space: O(e) for adj list and heap
