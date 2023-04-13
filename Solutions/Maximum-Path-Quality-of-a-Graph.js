/**
Solution: DFS/BFS + Backtracking

Simple DFS/BFS to traverse nodes adding times until maxTime is exceeded 
Check max quality every time pass origin node
Use visited set to track which node values have been added so they are only used once each
 */
// DFS
var maximalPathQuality = function (values, edges, maxTime) {
  const n = values.length;
  const adj = {};
  for (let i = 0; i < n; i++) adj[i] = [];
  for (let [s, d, t] of edges) {
    adj[s].push([d, t]);
    adj[d].push([s, t]);
  }

  let max = 0;
  function dfs(node, time, quality, path) {
    path.add(node);
    if (time > maxTime) return;

    if (node === 0) max = Math.max(max, quality);

    for (let [n2, t2] of adj[node]) {
      if (time + t2 > maxTime) continue;
      if (path.has(n2)) {
        dfs(n2, time + t2, quality, path);
      } else {
        path.add(n2);
        dfs(n2, time + t2, quality + values[n2], path);
        path.delete(n2);
      }
    }
  }

  dfs(0, 0, values[0], new Set());
  return max;
};
// TC: O(v + e)
// SC: O(v + e)
