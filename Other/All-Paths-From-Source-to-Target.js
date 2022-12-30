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
