/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} source
 * @param {number} destination
 * @return {boolean}
 */
var leadsToDestination = function (n, edges, source, destination) {
  const adj = {};
  for (let i = 0; i < n; i++) adj[i] = [];
  for (let [src, dst] of edges) {
    if (src === destination) return false;
    adj[src].push(dst);
  }

  const visited = new Set();

  function dfs(node) {
    if (visited.has(node)) return false;
    if (node === destination) return true;
    if (!adj[node].length) return false;

    visited.add(node);
    for (let nei of adj[node]) {
      if (!dfs(nei)) return false;
    }
    visited.delete(node);
    return true;
  }

  return dfs(source);
};

// Time: O(v + e)
// Space: O(v + e)
