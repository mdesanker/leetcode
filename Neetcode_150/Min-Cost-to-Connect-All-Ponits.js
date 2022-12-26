/**
 * @param {number[][]} points
 * @return {number}
 */

// problem says minimum cost to connect all points --> minimum spanning tree (MST)

var minCostConnectPoints = function (points) {
  // 1. build edges from manhattan distance of each pair of points
  // 2. Prim's

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
  let res = 0; // total cost
  const visit = new Set();
  const minHeap = new MinPriorityQueue();
  minHeap.enqueue([0, 0], 0);

  while (visit.size < N) {
    const [cost, i] = minHeap.dequeue().element;
    if (visit.has(i)) continue; // skip if point already visited

    // add cost to result and add to visited
    res += cost;
    visit.add(i);

    // check every neighbor in adjacency list
    for (const [neiCost, nei] of adj[i]) {
      if (!visit.has(nei)) {
        // for every new nei, push to heap, ordering by cost
        minHeap.enqueue([neiCost, nei], neiCost);
      }
    }
  }
  return res;
};

// Time: O(n^2 * logn) where n^2 is number of edges and log n is from Prim's algorithm (minHeap)
// Space: O(n^2 + n) -> O(n^2) worst case push n^2 edges into heap, and mark n nodes as visited
