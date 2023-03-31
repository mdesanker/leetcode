/**
 * @param {number[]} edges
 * @return {number}
 */
var longestCycle = function (edges) {
  const n = edges.length;

  // Kahn's algorithm - remove nodes not in cycles
  const indegrees = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    indegrees[edges[i]]++;
  }

  const q = [];
  for (let i = 0; i < indegrees.length; i++) {
    if (indegrees[i] === 0) {
      q.push(i);
    }
  }
  const visited = new Set();

  while (q.length) {
    let len = q.length;
    for (let i = 0; i < len; i++) {
      const node = q.shift();
      visited.add(node);

      const nei = edges[node];
      indegrees[nei]--;
      if (indegrees[nei] === 0) {
        q.push(nei);
      }
    }
  }

  // traverse remaining nodes to find longest cycle
  let res = -1;

  for (let i = 0; i < n; i++) {
    if (visited.has(i)) continue;

    let count = 1;
    visited.add(i);
    let nei = edges[i];
    // loop until we get to starting node
    while (nei !== i) {
      count++;
      visited.add(nei);
      nei = edges[nei];
    }
    res = Math.max(res, count);
  }
  return res;
};
