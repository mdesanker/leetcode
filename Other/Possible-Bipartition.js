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

  // can be muiltiple components, so we will have to iterate through all nodes and run check
  // instead of just starting at first node
  for (let i = 1; i < n + 1; i++) {
    // only need to run check when we find a new component (an uncolored node)
    if (color[i] === -1) {
      color[i] = 0;
      if (!check(i)) return false;
    }
  }
  return true;
};

// Time: O(v + e)
// Space: O(v + e)
