/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[]}
 */
var preorder = function (root) {
  const res = [];

  function traverse(node) {
    if (!node) return null;

    res.push(node.val);
    for (let child of node.children) {
      traverse(child);
    }
  }
  traverse(root);
  return res;
};

// Time: O(n)
// Space: O(n)
