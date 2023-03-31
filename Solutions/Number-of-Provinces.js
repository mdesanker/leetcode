/**
 * @param {number[][]} isConnected
 * @return {number}
 */
// Union-Find by Rank Approach
var findCircleNum = function (isConnected) {
  const n = isConnected.length;

  const par = [];
  for (let i = 0; i < n; i++) par.push(i);
  const rank = new Array(n).fill(1);

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
    if (p1 === p2) return 0;
    if (rank[p1] < rank[p2]) {
      par[p1] = p2;
      rank[p2] += rank[p1];
    } else {
      par[p2] = p1;
      rank[p1] += rank[p2];
    }
    return 1;
  }

  let count = n;

  for (let r = 0; r < n; r++) {
    for (let c = r; c < n; c++) {
      if (r !== c && isConnected[r][c] === 1) {
        // every edge will be duplicated, but will not affect result because cycles will return 0 from union function
        count -= union(r, c);
      }
    }
  }
  return count;
};
// Time: O(n^3) traverse entire matrix once, union find operations are O(n)
// Space: O(n) parent and rank array contain n nodes

// DFS
var findCircleNum = function (isConnected) {
  const n = isConnected.length;
  const visited = new Set();
  let count = 0;

  function dfs(node) {
    visited.add(node);
    for (let j = 0; j < n; j++) {
      if (isConnected[node][j] === 1) {
        if (!visited.has(j)) {
          dfs(j);
        }
      }
    }
  }

  for (let i = 0; i < n; i++) {
    if (!visited.has(i)) {
      dfs(i);
      count++;
    }
  }
  return count;
};
// Time: O(n^2) traverse entire matrix
// Space: O(n) visited array contains n nodes

// BFS
var findCircleNum = function (isConnected) {
  const n = isConnected.length;
  const visited = new Set();
  let count = 0;

  function bfs(node) {
    const q = [node];
    while (q.length) {
      len = q.length;
      for (let i = 0; i < len; i++) {
        const node = q.shift();
        visited.add(node);
        for (let j = 0; j < n; j++) {
          if (isConnected[node][j]) {
            if (!visited.has(j)) {
              q.push(j);
            }
          }
        }
      }
    }
  }

  for (let i = 0; i < n; i++) {
    if (!visited.has(i)) {
      bfs(i);
      count++;
    }
  }
  return count;
};
// Time: O(n^2) traverse entire matrix
// Space: O(n) visited array contains n nodes
