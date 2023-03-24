/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
// DFS
var minReorder = function (n, connections) {
  const adj = {};
  for (let i = 0; i < n; i++) adj[i] = [];
  for (let [a, b] of connections) {
    adj[a].push([b, 1]);
    adj[b].push([a, 0]); // [nei, isReversed]
  }

  const visited = new Set();
  let count = 0;

  function dfs(node) {
    if (visited.has(node)) return;
    visited.add(node);

    for (let [nei, isReversed] of adj[node]) {
      if (visited.has(nei)) continue;
      count += isReversed;
      dfs(nei);
    }
  }

  dfs(0);
  return count;
};

// Time: O(v) -> O(v + e) for dfs graph traversal. because graph is a tree, e = v - 1 -> O(v + e) = O(2v) = O(v)
// Space: O(v) same reasoning as time complexity

// BFS
var minReorder = function (n, connections) {
  const adj = {};
  for (let i = 0; i < n; i++) adj[i] = [];
  for (let [a, b] of connections) {
    adj[a].push([b, 1]);
    adj[b].push([a, 0]); // [nei, isReversed]
  }

  const q = [0];
  const visited = new Set();
  let count = 0;

  while (q.length) {
    let len = q.length;
    for (let i = 0; i < len; i++) {
      const n1 = q.shift();
      if (visited.has(n1)) continue;
      visited.add(n1);

      for (let [n2, isReversed] of adj[n1]) {
        if (visited.has(n2)) continue;
        count += isReversed;
        q.push(n2);
      }
    }
  }

  return count;
};

// Time: O(v) -> O(v + e) for dfs graph traversal. because graph is a tree, e = v - 1 -> O(v + e) = O(2v) = O(v)
// Space: O(v) same reasoning as time complexity
