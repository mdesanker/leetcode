/**
 * @param {number[]} edges
 * @param {number} node1
 * @param {number} node2
 * @return {number}
 */
function nodeDistances(edgeMap, node) {
  const dists = {};
  let d = 0;

  while (node !== undefined && dists[node] === undefined) {
    dists[node] = d;
    node = edgeMap[node];
    d += 1;
  }

  return dists;
}

var closestMeetingNode = function (edges, node1, node2) {
  // Get a map of node edges.

  const edgeMap = {};

  for (let i = 0; i < edges.length; i++) {
    if (edges[i] !== -1) {
      edgeMap[i] = edges[i];
    }
  }

  // Get distances to each node from node1 and node2.

  const dists1 = nodeDistances(edgeMap, node1);
  const dists2 = nodeDistances(edgeMap, node2);

  // Find the smallest distance in dists1 and dists2.

  let best = -1;
  let bestDist = null;

  for (let i = 0; i < edges.length; i++) {
    if (dists1[i] !== undefined && dists2[i] !== undefined) {
      const max = Math.max(dists1[i], dists2[i]);
      if (bestDist === null || max < bestDist) {
        bestDist = max;
        best = i;
      }
    }
  }

  return best;
};

// Time: O(n)
// Space: O(n)
