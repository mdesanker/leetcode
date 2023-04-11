/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} target
 * @param {number} k
 * @return {number[]}
 */
var distanceK = function (root, target, k) {
  // convert tree to undirected graph
  const adj = {};
  function buildGraph(node, parent) {
    if (!node) return null;
    const nei = [];
    if (node.left) {
      nei.push(node.left.val);
      buildGraph(node.left, node.val);
    }
    if (node.right) {
      nei.push(node.right.val);
      buildGraph(node.right, node.val);
    }
    // must check that parent !== null, not just `if (parent)` incase parent node is 0
    if (parent !== null) nei.push(parent);
    adj[node.val] = nei;
  }
  buildGraph(root, null);

  // bfs to find all nodes distance k
  const q = [target.val];
  const visited = new Set();

  let dist = -1;
  while (q.length) {
    const len = q.length;
    // dist check before loop for k === 0 case
    dist++;
    if (dist === k) return q;
    for (let i = 0; i < len; i++) {
      const node = q.shift();
      if (visited.has(node)) continue;
      visited.add(node);

      for (let nei of adj[node]) {
        if (!visited.has(nei)) {
          q.push(nei);
        }
      }
    }
  }
  return [];
};
// TC: O(v + e)
// SC: O(v + e)
