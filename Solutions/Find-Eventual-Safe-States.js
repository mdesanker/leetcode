/**
 * @param {number[][]} graph
 * @return {number[]}
 */
var eventualSafeNodes = function (graph) {
  /**
   * Question asks for all safe nodes: terminal nodes and nodes that are not in a path with a cycle
   * We can use dfs and add all nodes that are not part of a cycle
   * Path set tracks nodes in the current path
   * Visited set tracks nodes which have been shown not to have a cycle
   * All nodes not part of cycle are pushed to res array
   */
  const n = graph.length;

  const adj = {};
  for (let i = 0; i < n; i++) adj[i] = [];
  for (let i = 0; i < n; i++) adj[i].push(...graph[i]);

  const res = [];

  const path = new Set();
  const visited = new Set();

  function dfs(node) {
    // if node in current path, then cycle
    if (path.has(node)) return false;
    // if node is in visited, then it is not a cycle
    if (visited.has(node)) return true;

    // add current node to growing path
    path.add(node);

    // if neighbors have cycles, return false
    for (let nei of adj[node]) {
      if (!dfs(nei)) return false;
    }

    path.delete(node);
    // if checked all neighbors and no cycle, then this node is safe
    visited.add(node);
    return true;
  }

  // call dfs starting from every node
  for (let i = 0; i < n; i++) {
    if (dfs(i)) res.push(i);
  }

  return res;
};

// Time: O(v + e) traverse every vertex and associated edges to check for cycles
// Space: O(v + e) for the adj list which contains every vertex and edge
