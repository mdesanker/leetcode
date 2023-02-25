/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} source
 * @param {number} destination
 * @return {boolean}
 */
// BFS
var validPath = function (n, edges, source, destination) {
  const adj = {};
  for (let i = 0; i < n; i++) adj[i] = [];
  for (let [a, b] of edges) {
    adj[a].push(b);
    adj[b].push(a);
  }

  const q = [source];
  const visited = new Set();

  while (q.length) {
    let len = q.length;
    for (let i = 0; i < len; i++) {
      const n1 = q.shift();

      if (visited.has(n1)) continue;
      if (n1 === destination) return true;

      visited.add(n1);
      for (let nei of adj[n1]) {
        if (!visited.has(nei)) {
          q.push(nei);
        }
      }
    }
    console.log(q);
  }
  return false;
};

// Time: O(v + e)
// Space: O(v + e)

// DFS
var validPath = function (n, edges, source, destination) {
  const adj = {};
  for (let i = 0; i < n; i++) adj[i] = [];
  for (let [n1, n2] of edges) {
    adj[n1].push(n2);
    adj[n2].push(n1);
  }

  const visited = new Set();

  function dfs(node) {
    if (visited.has(node)) return false;
    visited.add(node);
    if (node === destination) return true;
    for (let nei of adj[node]) {
      if (!visited.has(nei)) {
        if (dfs(nei)) return true;
      }
    }
    return false;
  }

  return dfs(source);
};

// Time: O(v + e)
// Space: O(v + e)
