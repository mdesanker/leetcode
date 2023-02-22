/**
 * @param {number} n
 * @param {number[][]} dislikes
 * @return {boolean}
 */
// DFS
var possibleBipartition = function (n, dislikes) {
  // buidl adj list
  const adj = {};
  for (let i = 1; i < n + 1; i++) adj[i] = [];
  for (let [n1, n2] of dislikes) {
    adj[n1].push(n2);
    adj[n2].push(n1);
  }

  // every node initially starts uncolored (-1)
  const color = new Array(n + 1).fill(-1);

  // this function will color every node in a component
  function dfs(node) {
    for (let nei of adj[node]) {
      // if nei node is uncolored, color with opposite of current node, then traverse it
      if (color[nei] === -1) {
        color[nei] = 1 - color[node];
        if (!dfs(nei)) return false;
        // if nei node is colored, check that it is not conflicting
      } else if (color[nei] === color[node]) {
        return false;
      }
    }
    return true;
  }

  // we will have to check all nodes, in case there are unconnected components
  for (let i = 1; i < n + 1; i++) {
    // only need to run dfs on new (uncolored) components
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
var possibleBipartition = function (n, dislikes) {
  // build adj list
  const adj = {};
  for (let i = 1; i < n + 1; i++) adj[i] = [];
  for (let [p1, p2] of dislikes) {
    adj[p1].push(p2);
    adj[p2].push(p1);
  }

  // set color of every node to -1 (uncolored)
  const color = new Array(n + 1).fill(-1);

  // this bfs function will color an entire component
  function bfsCheck(start) {
    color[start] = 0;
    const q = [start];

    while (q.length) {
      let len = q.length;
      for (let i = 0; i < len; i++) {
        const p1 = q.shift();

        for (let nei of adj[p1]) {
          // if nei is not colored, color it and add to queue
          if (color[nei] === -1) {
            // this will set nei to opposite color (1 or 0)
            color[nei] = 1 - color[p1];
            q.push(nei);
            // if nei is already colored, make sure it doesn't conflict with parent
          } else if (color[nei] === color[p1]) {
            return false;
          }
        }
      }
    }
    // checked all nodes in this component and no conflicts
    return true;
  }

  // can be muiltiple components, so we will have to iterate through all nodes and run check
  // instead of just starting at first node
  for (let i = 1; i < n + 1; i++) {
    // only need to run check when we find a new component (an uncolored node)
    if (color[i] === -1) {
      if (!bfsCheck(i)) return false;
    }
  }
  return true;
};

// Time: O(v + e)
// Space: O(v + e)
