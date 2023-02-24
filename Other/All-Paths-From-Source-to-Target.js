/**
 * @param {number[][]} graph
 * @return {number[][]}
 */
var allPathsSourceTarget = function (graph) {
  const target = graph.length - 1;
  const res = [];

  function dfs(node, path) {
    // if reach target, push path to res
    if (node === target) {
      res.push(path.slice());
      return;
    }

    // explore neighbor nodes
    for (let nextNode of graph[node]) {
      path.push(nextNode);
      dfs(nextNode, path);
      path.pop();
    }
  }
  // start dfs from source node (0)
  dfs(0, [0]);
  return res;
};

// Time: O(n * 2^n)
// Space: O(n)

// With adj list, without cloning path array
var allPathsSourceTarget = function (graph) {
  const n = graph.length;

  const adj = {};
  for (let i = 0; i < n; i++) adj[i] = graph[i];

  const res = [];

  function dfs(node, path) {
    if (node === n - 1) {
      res.push(path.slice());
      return;
    }

    for (let nei of adj[node]) {
      path.push(nei);
      dfs(nei, path);
      path.pop();
    }
  }

  dfs(0, [0]);
  return res;
};

/**
 TC: O(v * 2^v) 
 For DAG with V vertices, there could be at most 2^(v - 1) - 1 possible paths from start to target
 Need O(v) time to build each possible path
 SC: O(v) 
 Recursion depth can be no more than v
 Need v space to store path
 */

// With adj list, cloning path array every step
var allPathsSourceTarget = function (graph) {
  const n = graph.length;

  const adj = {};
  for (let i = 0; i < n; i++) adj[i] = graph[i];

  const res = [];

  function dfs(node, path) {
    if (node === n - 1) {
      res.push([...path, node]);
      return;
    }

    for (let nei of adj[node]) {
      dfs(nei, [...path, node]);
    }
  }

  dfs(0, []);
  return res;
};
