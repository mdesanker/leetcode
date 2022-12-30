/**
 * @param {number[][]} points
 * @return {number}
 */

// problem says minimum cost to connect all points --> minimum spanning tree (MST)

// 1. Build edges (adjacency list) from manhattan distance of each pair of points
// 2. Use Prim's Algorithm to connect edges

var minCostConnectPoints = function (points) {
  const N = points.length;

  // build adjacency list
  const adj = {}; // i: list of [cost, node]
  // map each node ot empty list
  for (let i = 0; i < N; i++) {
    adj[i] = [];
  }

  // compare each point to every other point in graph
  for (let i = 0; i < N; i++) {
    let [x1, y1] = points[i];
    for (let j = i + 1; j < N; j++) {
      let [x2, y2] = points[j];
      // calculate manhattan distance
      let cost = Math.abs(x1 - x2) + Math.abs(y1 - y2);
      // add both ways because undirected
      adj[i].push([cost, j]);
      adj[j].push([cost, i]);
    }
  }

  // Prim's
  let res = 0;
  const visit = new Set();
  // use minHeap to find node with next lowest cost
  const minHeap = new MinPriorityQueue();
  // first node is the origin
  minHeap.enqueue([0, 0], 0);

  // loop until every node has been connected
  while (visit.size < N) {
    // pop next node from heap
    const [cost, node] = minHeap.dequeue().element;
    // skip if point already visited
    if (visit.has(node)) continue;

    // add cost to result and add to visited
    res += cost;
    visit.add(node);

    // check every neighbor in adjacency list
    for (const [neiCost, nei] of adj[node]) {
      if (!visit.has(nei)) {
        // for every new nei, push to heap, ordering by cost
        minHeap.enqueue([neiCost, nei], neiCost);
      }
    }
  }
  return res;
};

// Time: O(n^2 * logn) where n^2 is number of edges and log n is for every heap operation (every node is added to queue)
// Space: O(n^2 + n) -> O(n^2) worst case push n^2 edges into heap, and mark n nodes as visited
