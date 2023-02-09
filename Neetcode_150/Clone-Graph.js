// https://leetcode.com/problems/clone-graph/solutions/42459/javascript-solution/?orderBy=most_votes&languageTags=javascript

/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function (node) {
  if (!node) return null;

  // store clones in map
  const clones = new Map();

  function dfs(node) {
    // if node doesn't exist in map
    if (!clones.has(node.val)) {
      // create clone and point original to it
      clones.set(node.val, new Node(node.val));
      // map original neighbors to clone neighbors
      clones.get(node.val).neighbors = node.neighbors.map((nei) => dfs(nei));
    }
    // return clone of node
    return clones.get(node.val);
  }

  return dfs(node);
};

// Time: O(v + e) where v is number of vertices (nodes) and e is number of edges (connections)
// Space: O(v)

/**
Using a map, we will map original nodes to cloned nodes
Then we will map the neighbors for the node, making copies as needed

Edge case:
If no node is provided, return null

Initialize the map that will hold the clones, clones

DFS helper function:
Parameter:
Node that we are copying

Recursive step:
If clones doesn't have a key corresponding to node.val
Map node.val in clones to a new Node with value set to node.val
Then get the clone of the node val and map the nodes neighbors to the clones of the neighbors

We return the clone of the node we called the function with

TC: O(e + v) we traverse every node (vertex) and every edge (neighbor connection)
SC: O(v) the map will hold an entry for every node (vertex)
 */
