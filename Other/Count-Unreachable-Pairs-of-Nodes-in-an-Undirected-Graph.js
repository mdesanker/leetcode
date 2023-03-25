/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
// DFS
var countPairs = function (n, edges) {
  const adj = {};
  for (let i = 0; i < n; i++) adj[i] = [];
  for (let [a, b] of edges) {
    adj[a].push(b);
    adj[b].push(a);
  }

  const visited = new Set();

  function dfs(node) {
    visited.add(node);
    let count = 1;

    for (let nei of adj[node]) {
      if (visited.has(nei)) continue;
      count += dfs(nei);
    }
    return count;
  }

  let sizeOfComponent = 0;
  let numberOfPairs = 0;
  let remaining = n;

  for (let i = 0; i < n; i++) {
    if (!visited.has(i)) {
      sizeOfComponent = dfs(i);
      numberOfPairs += sizeOfComponent * (remaining - sizeOfComponent);
      remaining -= sizeOfComponent;
    }
  }
  return numberOfPairs;
};
// Time: O(v + 2e)
// Space: O(v + 2e)
