/**
 * @param {number[][]} roads
 * @param {number} seats
 * @return {number}
 */
var minimumFuelCost = function (roads, seats) {
  const n = roads.length;

  // build bidirectional adjacency list to represent the graph
  const adj = {};
  for (let i = 0; i < n + 1; i++) adj[i] = [];
  for (let [src, dst] of roads) {
    adj[src].push(dst);
    adj[dst].push(src);
  }

  // fuel counter
  let fuel = 0;

  // count the number of people in each branch, then divide by the max seats per car
  function dfs(curr, prev) {
    // the node itself has 1 representative
    let count = 1;

    // traverse the neighbors, avoiding the prev node
    for (let nei of adj[curr]) {
      if (nei !== prev) {
        // add the counts from neighbor nodes to this node
        count += dfs(nei, curr);
      }
    }

    if (curr !== 0) {
      // count the fuel it takes to move to parent node
      // root node does not have parent, so ignore it
      fuel += Math.ceil(count / seats);
    }

    // return count of representatives
    return count;
  }

  // dfs out from capital
  dfs(0, -1);

  return fuel;
};

// Time: O(n) linear time to traverse every node once, and linear time to build adjacency list
// Space: O(n) linear space for adj list, and O(n) space for recursive stack in worst case scenario
