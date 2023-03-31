// https://leetcode.com/problems/number-of-good-paths/solutions/3052499/number-of-good-paths-javascript-solution-with-union-find/

/**
 * @param {number[]} vals
 * @param {number[][]} edges
 * @return {number}
 */
var numberOfGoodPaths = function (vals, edges) {
  const n = vals.length;

  const par = [];
  for (let i = 0; i < n; i++) par.push(i);
  const rank = new Array(n).fill(1);

  // build adj list
  const adj = {};
  for (let i = 0; i < vals.length; i++) adj[i] = [];
  for (let [par, child] of edges) {
    adj[par].push(child);
    adj[child].push(par);
  }

  const valToNodes = new Map();
  for (let i = 0; i < n; i++) {
    if (!valToNodes.has(vals[i])) {
      valToNodes.set(vals[i], []);
    }
    valToNodes.get(vals[i]).push(i);
  }

  function find(n) {
    let p = par[n];
    while (p !== par[p]) {
      p = par[p];
    }
    return p;
  }

  function union(n1, n2) {
    let p1 = find(n1),
      p2 = find(n2);
    if (p1 === p2) return;
    if (rank[p1] < rank[p2]) {
      par[p1] = p2;
      rank[p2] += rank[p1];
    } else {
      par[p2] = p1;
      rank[p1] += rank[p2];
    }
    return;
  }

  let goodPaths = 0;
  const sortedVals = Array.from(valToNodes.keys()).sort((a, b) => a - b);
  for (let val of sortedVals) {
    const nodes = valToNodes.get(val);

    for (let node of nodes) {
      for (let nei of adj[node]) {
        vals[nei] <= vals[node] && union(node, nei);
      }
    }
    const groups = new Map();
    for (let node of nodes) {
      const root = find(node);
      groups.set(root, (groups.get(root) || 0) + 1);
    }
    for (let size of groups.values()) {
      goodPaths += Math.floor((size * (size + 1)) / 2);
    }
  }
  return goodPaths;
};

// Time: O(nlogn) for sort operation
// Space: O(n)
