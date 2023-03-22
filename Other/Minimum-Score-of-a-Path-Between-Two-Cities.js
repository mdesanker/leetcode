/**
 * @param {number} n
 * @param {number[][]} roads
 * @return {number}
 */
// BFS
var minScore = function (n, roads) {
  const adj = {};
  for (let i = 1; i < n + 1; i++) adj[i] = [];
  for (let [s, d, p] of roads) {
    adj[s].push([d, p]);
    adj[d].push([s, p]);
  }

  const q = [1];
  const visited = new Set();

  let res = Infinity;

  while (q.length) {
    const n1 = q.shift();
    // check for visited here, so don't waste time checking all edges
    if (visited.has(n1)) continue;
    visited.add(n1);

    for (let [n2, w2] of adj[n1]) {
      res = Math.min(res, w2);
      q.push(n2);
    }
  }
  return res;
};

// Time: O(v + e)
// Space: O(v + e)

// Union Find
var minScore = function (n, roads) {
  const par = [];
  for (let i = 0; i < n + 1; i++) par.push(i);
  const rank = new Array(n + 1).fill(1);

  function find(n) {
    let p = par[n];
    while (p !== par[p]) {
      par[p] = par[par[p]];
      p = par[p];
    }
    return p;
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

  // build connections
  for (let [s, d, p] of roads) {
    union(s, d);
  }

  // get min path length for every node connected to 1
  let res = Infinity;
  for (let [s, d, p] of roads) {
    if (find(1) === find(s)) {
      res = Math.min(res, p);
    }
  }
  return res;
};

// Time: O(v + e) Amortized Union find operations are O(1), O(v) to initialize par and rank arrays, iterate through every edge twice to build connections then find min path
// Space: O(v) for par and rank arrays

// DFS
var minScore = function (n, roads) {
  const adj = {};
  for (let i = 1; i < n + 1; i++) adj[i] = [];
  for (let [s, d, p] of roads) {
    adj[s].push([d, p]);
    adj[d].push([s, p]);
  }

  const visited = new Set();
  let res = Infinity;

  function dfs(node) {
    if (visited.has(node)) return;
    visited.add(node);

    for (let [n2, p2] of adj[node]) {
      res = Math.min(res, p2);
      dfs(n2);
    }
  }

  dfs(1);
  return res;
};

// Time: O(v + e)
// Space: O(v + e)
