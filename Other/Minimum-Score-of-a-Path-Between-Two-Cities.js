/**
 * @param {number} n
 * @param {number[][]} roads
 * @return {number}
 */
var minScore = function (n, roads) {
  const adj = {};
  for (let i = 1; i < n + 1; i++) adj[i] = [];
  for (let [s, d, p] of roads) {
    adj[s].push([d, p]);
    adj[d].push([s, p]);
  }

  const q = [1];
  const visited = new Set();

  let res = Infinity;

  while (q.length) {
    const n1 = q.shift();
    // check for visited here, so don't waste time checking all edges
    if (visited.has(n1)) continue;
    visited.add(n1);

    for (let [n2, w2] of adj[n1]) {
      res = Math.min(res, w2);
      q.push(n2);
    }
  }
  return res;
};

// Time: O(v + e)
// Space: O(v + e)
