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

// BFS
var countPairs = function (n, edges) {
  const adj = {};
  for (let i = 0; i < n; i++) adj[i] = [];
  for (let [a, b] of edges) {
    adj[a].push(b);
    adj[b].push(a);
  }

  const visited = new Set();

  function bfs(node) {
    const q = [node];
    let count = 0;

    while (q.length) {
      let len = q.length;
      for (let i = 0; i < len; i++) {
        const node = q.shift();
        if (visited.has(node)) continue;
        visited.add(node);
        count++;

        for (let nei of adj[node]) {
          if (!visited.has(nei)) {
            q.push(nei);
          }
        }
      }
    }
    return count;
  }

  let remain = n;
  let res = 0;

  for (let i = 0; i < n; i++) {
    if (!visited.has(i)) {
      let size = bfs(i);
      res += size * (remain - size);
      remain -= size;
    }
  }
  return res;
};
// Time: O(v + 2e)
// Space: O(v + 2e)
