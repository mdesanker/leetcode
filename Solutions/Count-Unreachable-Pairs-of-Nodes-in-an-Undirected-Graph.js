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

// Union Find
var countPairs = function (n, edges) {
  const par = [];
  for (let i = 0; i < n; i++) par.push(i);
  const rank = new Array(n).fill(1);

  function find(n) {
    if (n === par[n]) return n;
    return (par[n] = find(par[n]));
  }

  function union(n1, n2) {
    let p1 = find(n1),
      p2 = find(n2);
    if (p1 === p2) return false;
    if (rank[p1] < rank[p2]) {
      par[p1] = p2;
      rank[p2] += rank[p1];
    } else {
      par[p2] = p1;
      rank[p1] += rank[p2];
    }
    return true;
  }

  for (let [a, b] of edges) {
    union(a, b);
  }

  // map frequencies of parent for each node
  const map = new Map();
  for (let i = 0; i < n; i++) {
    const par = find(i);
    map.set(par, map.get(par) + 1 || 1);
  }

  let remain = n;
  let res = 0;
  for (let [node, freq] of map) {
    res += freq * (remain - freq);
    remain -= freq;
  }
  return res;
};
// Time: O(v + e) amortized time complexity of union find is O(alphaT) which can be consider to be O(1). Iterate through every edge O(e) to union, then iterate through every node to build map O(v)
// Space: O(v)
