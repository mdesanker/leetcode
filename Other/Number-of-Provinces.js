/**
 * @param {number[][]} isConnected
 * @return {number}
 */
// DFS Approach
var findCircleNum = function (isConnected) {
  const n = isConnected.length;

  // convert the adjacency matrix into adjacency list
  const adj = {};
  for (let i = 0; i < n; i++) adj[i] = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (isConnected[i][j] === 1 && i !== j) {
        // undirected graph so push both directions
        adj[i].push(j);
        adj[j].push(i);
      }
    }
  }

  // we will iterate through all nodes, calling dfs to mark provinces as visited
  let count = 0;
  const visited = new Array(n).fill(false);

  // dfs function will traverse the neighbors (children) of a node
  function dfs(node) {
    visited[node] = true;

    for (let child of adj[node]) {
      if (!visited[child]) {
        dfs(child);
      }
    }
  }

  for (let i = 0; i < n; i++) {
    // when ever we encounter a node that hasn't been visited, we have a new island
    // increase count and call dfs on neighbors to mark rest of the province as visited
    if (!visited[i]) {
      count++;
      for (let child of adj[i]) {
        dfs(child);
      }
    }
  }
  return count;
};

// Time: O(v) ~ O(v) + O(v + 2e): O(v) for dfs call on every node, O(v + 2e) for dfs on all the neighbors of every node
// Space: O(v + e)
//  O(v) for recursive stack in skewed graph, O(v + 2e) for adjacency list

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
