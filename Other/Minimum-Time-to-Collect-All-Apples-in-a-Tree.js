/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {boolean[]} hasApple
 * @return {number}
 */
var minTime = function (n, edges, hasApple) {
  // build adjacency list with nodes and neighbors
  const adj = [];
  for (let i = 0; i < n; i++) adj[i] = [];
  for (let [par, child] of edges) {
    adj[par].push(child);
    adj[child].push(par);
  }

  // dfs function passing current node and parent (prev) node
  function dfs(curr, par) {
    let time = 0;
    for (let child of adj[curr]) {
      // skip node just came from
      if (child === par) continue;
      // get time to collect apples in child subtree
      let childTime = dfs(child, curr);
      // if childTime is greater than 0, there were apples
      if (childTime > 0 || hasApple[child]) {
        // add 2 to account for time to travel to child subtree
        time += 2 + childTime;
      }
    }
    return time;
  }

  // starting node is 0
  // no parent so pass -1 as default value
  return dfs(0, -1);
};

// Time: O(n)
// Space: O(n)
