/**
 * @param {number[][]} graph
 * @return {boolean}
 */
// DFS
var isBipartite = function (graph) {
  const n = graph.length;

  const adj = {};
  for (let i = 0; i < n; i++) adj[i] = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < graph[i].length; j++) {
      const node = graph[i][j];
      adj[i].push(node);
    }
  }

  const color = new Array(n).fill(-1);

  function dfs(node) {
    for (let nei of adj[node]) {
      if (color[nei] === color[node]) return false;
      if (color[nei] === -1) {
        color[nei] = 1 - color[node];
        if (!dfs(nei)) return false;
      }
    }
    return true;
  }

  for (let i = 0; i < n; i++) {
    if (color[i] === -1) {
      color[i] = 0;
      if (!dfs(i)) return false;
    }
  }
  return true;
};

// Time: O(v + e)
// Space: O(v + e)

// BFS
var isBipartite = function (graph) {
  const n = graph.length;

  const adj = {};
  for (let i = 0; i < n; i++) adj[i] = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < graph[i].length; j++) {
      const node = graph[i][j];
      adj[i].push(node);
    }
  }

  const color = new Array(n).fill(-1);

  // check will color all nodes in a component
  function check(node) {
    const q = [node];

    while (q.length) {
      let len = q.length;
      for (let i = 0; i < len; i++) {
        const node = q.shift();

        for (let nei of adj[node]) {
          // if nei already colored and matches current node return false
          if (color[nei] === color[node]) return false;
          // if nei not colored, set to opposite of current node and push onto queue
          else if (color[nei] === -1) {
            color[nei] = 1 - color[node];
            q.push(nei);
          }
        }
      }
    }
    // checked all nodes in component and no conflicts, return true
    return true;
  }

  // iterate through all nodes checking all uncolored nodes in case unconnected components
  for (let i = 0; i < n; i++) {
    if (color[i] === -1) {
      color[i] = 0;
      if (!check(i)) return false;
    }
  }
  return true;
};

// Time: O(v + e)
// Space: O(v + e)
