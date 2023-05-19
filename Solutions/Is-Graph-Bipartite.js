/**
 * @param {number[][]} graph
 * @return {boolean}
 */
var isBipartite = function (graph) {
  const n = graph.length;

  const color = new Array(n).fill(-1);

  function dfs(node) {
    for (let nei of graph[node]) {
      if (color[nei] === color[node]) return false;
      else if (color[nei] === -1) {
        color[nei] = 1 - color[node];
        if (!dfs(nei)) return false;
      }
    }
    return true;
  }

  function bfs(node) {
    const q = [node];
    while (q.length) {
      let len = q.length;
      for (let i = 0; i < len; i++) {
        const node = q.shift();
        for (let nei of graph[node]) {
          if (color[nei] === color[node]) return false;
          else if (color[nei] === -1) {
            color[nei] = 1 - color[node];
            q.push(nei);
          }
        }
      }
    }
    return true;
  }

  for (let i = 0; i < n; i++) {
    if (color[i] === -1) {
      color[i] = 0;
      if (!bfs(i)) return false;
    }
  }
  return true;
};
// TC: O(v + e)
// SC: O(v)
