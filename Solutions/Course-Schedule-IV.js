/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @param {number[][]} queries
 * @return {boolean[]}
 */
// DFS
var checkIfPrerequisite = function (n, prereqs, queries) {
  const adj = {};
  for (let i = 0; i < n; i++) adj[i] = [];
  for (let [pre, crs] of prereqs) {
    adj[pre].push(crs);
  }

  const visited = Array(n).fill(false);

  function dfs(node, dst) {
    visited[node] = true;
    if (node === dst) return true;
    for (let nei of adj[node]) {
      if (visited[nei]) continue;
      if (dfs(nei, dst)) return true;
    }
    return false;
  }

  const res = [];
  for (let [pre, crs] of queries) {
    visited.fill(false); // reset visited array for every new node
    res.push(dfs(pre, crs));
  }
  return res;
};
// n = numCourses, m = queries.length
// Time: O(nm)
// Space: O(n)

// BFS
var checkIfPrerequisite = function (n, prereqs, queries) {
  const adj = {};
  for (let i = 0; i < n; i++) adj[i] = [];
  for (let [pre, crs] of prereqs) {
    adj[pre].push(crs);
  }

  function bfs(node, dst) {
    const visited = Array(n).fill(false);
    const q = [node];
    while (q.length) {
      let len = q.length;
      for (let i = 0; i < len; i++) {
        const node = q.shift();
        if (visited[node]) continue;
        visited[node] = true;
        if (node === dst) return true;
        for (let nei of adj[node]) {
          if (!visited[nei]) {
            q.push(nei);
          }
        }
      }
    }
    return false;
  }

  const res = [];
  for (let [pre, crs] of queries) {
    res.push(bfs(pre, crs));
  }
  return res;
};
// n = numCourses, m = queries.length
// Time: O(nm)
// Space: O(n)
