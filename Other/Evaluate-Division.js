/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
// DFS
var calcEquation = function (equations, values, queries) {
  // build adj list
  // each equation is an edge between two nodes, and the corresponding value is the weight of that edge
  // edge in reverse direction has inverse weight
  const adj = {};
  for (let i = 0; i < equations.length; i++) {
    const [a, b] = equations[i];
    const val = values[i];
    if (!adj[a]) adj[a] = [];
    if (!adj[b]) adj[b] = [];
    adj[a].push([b, val]);
    adj[b].push([a, 1 / val]);
  }

  function dfs(node, target, visited, val = 1) {
    // if node or target do not exist in our graph, then automatically return null
    if (!adj[node] || !adj[target]) return null;
    // once we have reached target node, return val
    // this also handles a number divided by itself because default val = 1
    if (node === target) return val;

    visited.add(node);
    for (let [nei, neiVal] of adj[node]) {
      if (!visited.has(nei)) {
        // call dfs on neighbor updating val to current val * val of neighbor from adjlist
        const res = dfs(nei, target, visited, val * neiVal);
        // if res isn't undefined, return res
        if (res) return res;
      }
    }
    visited.delete(node);
    // exhausted all paths and no res, return null
    return null;
  }

  const res = [];

  // process each query and pus the result to res array
  for (let [a, b] of queries) {
    // use set to track visited nodes for this query
    const visited = new Set();
    const val = dfs(a, b, visited);
    // push val or -1 if undefined
    res.push(val || -1);
  }
  return res;
};

/**
n = number of input equations, m = number of queries

TC: O(n * m)
Iterate through equations to build graph O(n)
For each query, we traverse the graph. Worst case scenario the whole graph O(m * n)

SC: O(n)
Build a graph out of equations. 2n edges for every node O(n * 2n) = O(3n) = O(n)
Recursive stack if we traverse the entire graph O(n)
Visited set could hold every vertex O(n)
*/
