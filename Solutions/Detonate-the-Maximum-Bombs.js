/**
 * @param {number[][]} bombs
 * @return {number}
 */
// DFS
var maximumDetonation = function (bombs) {
  const n = bombs.length;

  const adj = {};
  for (let i = 0; i < n; i++) adj[i] = [];
  for (let i = 0; i < n; i++) {
    const [x1, y1, r1] = bombs[i];
    for (let j = i + 1; j < n; j++) {
      const [x2, y2, r2] = bombs[j];
      const dist = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
      if (dist <= r1) adj[i].push(j);
      if (dist <= r2) adj[j].push(i);
    }
  }

  function dfs(node, visited) {
    visited.add(node);
    for (let nei of adj[node]) {
      if (!visited.has(nei)) {
        dfs(nei, visited);
      }
    }
    return visited.size;
  }

  let max = 0;
  for (let i = 0; i < n; i++) {
    max = Math.max(max, dfs(i, new Set()));
  }
  return max;
};
// TC: O(n^3)
// SC: O(n^2)
