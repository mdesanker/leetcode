/**
Solution: DFS + Memoization
 */
var leadsToDestination = function (n, edges, source, destination) {
  const adj = {};
  for (let i = 0; i < n; i++) adj[i] = [];
  for (let [a, b] of edges) {
    adj[a].push(b);
  }

  const visited = new Array(n).fill(false);
  // memoization to avoid TLE
  const memo = new Array(n).fill(-1);

  function dfs(node) {
    if (memo[node] !== -1) return memo[node];

    if (visited[node]) return false;
    if (node === destination) {
      // destination must have no outgoing edges
      if (!adj[node].length) return true;
      else return false;
    }
    if (!adj[node].length) return false;

    visited[node] = true;
    for (let nei of adj[node]) {
      if (!dfs(nei)) return (memo[node] = false);
    }
    visited[node] = false;
    return (memo[node] = true);
  }

  return dfs(source);
};
// TC: O(v + e)
// SC: O(v + e)
