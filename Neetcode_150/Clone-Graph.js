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
